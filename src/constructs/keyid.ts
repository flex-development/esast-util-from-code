/**
 * @file Constructs - keyid
 * @module esast-util-from-code/constructs/keyid
 */

import { tt } from '#src/enums'
import {
  codes,
  resolveSlice,
  type Code,
  type CodeCheck,
  type Construct,
  type Effects,
  type Guard,
  type Offset,
  type Resolver,
  type State,
  type TokenFields,
  type TokenizeContext
} from '@flex-development/vfile-lexer'

/**
 * Private identifier check.
 *
 * @var {boolean} hash
 */
let hash: boolean = false

/**
 * Check if the current character `code` can start this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode Offset}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Current character code
 * @param {Offset?} [k=1] - Difference between index of next `k`-th character
 * code and index of `code`
 * @return {boolean} `true` if `code` can start construct
 */
function test(this: TokenizeContext, code: Code, k: Offset = 1): boolean {
  switch (true) {
    case code === codes.backslash:
      return this.peek(k) === codes.lowercaseU
    case code === codes.dollar:
      return this.peek(k) !== codes.leftBrace
    case code === codes.hash:
      return hash = test.call(this, this.next, k + 1)
    case code === codes.underscore:
      return true
    default:
      return this.check(/\p{ID_Start}/u)(code)
  }
}

/**
 * Identifier and keyword construct.
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#identifiers
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#keywords
 *
 * @const {Construct} keyid
 */
const keyid: Construct = {
  /**
   * Construct name.
   */
  name: tt.keyid,

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

  /**
   * Check if the current character code can start this construct.
   *
   * @see {@linkcode Guard}
   */
  test,

  /**
   * Set up a state machine to handle character codes streaming in.
   *
   * @see {@linkcode Effects}
   * @see {@linkcode State}
   * @see {@linkcode TokenizeContext}
   *
   * @this {TokenizeContext}
   *
   * @param {Effects} effects - Context object to transition state machine
   * @param {State} ok - Successful tokenization state
   * @return {State} Initial state
   */
  tokenize(this: TokenizeContext, effects: Effects, ok: State): State {
    /**
     * Tokenize context.
     *
     * @const {TokenizeContext} self
     */
    const self: TokenizeContext = this

    /**
     * Check if a character code can continue an identifier or keyword.
     *
     * @const {CodeCheck} check
     */
    const check: CodeCheck = self.check(/[$\p{ID_Continue}]/u)

    return keyid

    /**
     * Finish identifier or keyword tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      switch (true) {
        case check(code):
        case code === codes.backslash && self.next === codes.lowercaseU:
          return effects.consume(code), finish
        default:
          return effects.exit(tt.keyid), ok(code)
      }
    }

    /**
     * Start identifier or keyword tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function keyid(code: Code): State {
      effects.enter(tt.keyid, <Partial<TokenFields>>{ private: hash })
      return effects.consume(code), finish
    }
  }
}

export default keyid
