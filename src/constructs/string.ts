/**
 * @file Constructs - string
 * @module esast-util-from-code/constructs/string
 */

import { errors, tt } from '#src/enums'
import {
  codes,
  resolveSlice,
  type Code,
  type Construct,
  type Effects,
  type Guard,
  type Resolver,
  type State,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import { ok as assert } from 'devlop'

/**
 * Opening punctuator.
 *
 * @var {typeof codes.apostrophe | typeof codes.quotation} opener
 */
let opener: typeof codes.apostrophe | typeof codes.quotation

/**
 * Check if the previous character `code` can come before this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Previous character code
 * @return {boolean} `true` if `code` allowed before construct
 */
function previous(this: TokenizeContext, code: Code): boolean {
  return code !== codes.backslash
}

/**
 * Check if the current character `code` can start this construct.
 *
 * @see {@linkcode Code}
 * @see {@linkcode TokenizeContext}
 *
 * @this {TokenizeContext}
 *
 * @param {Code} code - Current character code
 * @return {boolean} `true` if `code` can start construct
 */
function test(this: TokenizeContext, code: Code): boolean {
  if (code === codes.apostrophe) return opener = code, true
  if (code === codes.quotation) return opener = code, true
  return false
}

/**
 * String literal construct.
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#string_literals
 *
 * @const {Construct} string
 */
const string: Construct = {
  /**
   * Construct name.
   */
  name: tt.string,

  /**
   * Check if the previous character code can come before this construct.
   *
   * @see {@linkcode Guard}
   */
  previous,

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

    return string

    /**
     * Finish string literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      if (code === opener && previous.call(self, self.previous)) {
        effects.consume(code)
        effects.exit(tt.string)
        return ok
      }

      /**
       * Unterminated string check.
       *
       * @var {boolean} terminated
       */
      let unterminated: boolean = false

      // unterminated string check
      switch (true) {
        case code === codes.eof:
        case self.isLineEnding(code):
          unterminated = true
          break
        case opener === codes.apostrophe && code === codes.quotation:
        case opener === codes.quotation && code === codes.apostrophe:
          if (previous.call(self, self.previous)) unterminated = true
          break
        default:
          break
      }

      // raise on unterminated string
      if (unterminated) {
        self.raise(errors.string, self.now(), {
          actual: code === codes.eof ? code : self.serialize(code),
          expected: [self.serialize(opener)],
          ruleId: tt.string
        })

        effects.exit(tt.string)
        return ok(code)
      }

      effects.consume(code)
      return finish
    }

    /**
     * Start string literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function string(code: Code): State {
      assert(code === opener, 'expected `opener`')
      return effects.enter(tt.string), effects.consume(code), finish
    }
  }
}

export default string
