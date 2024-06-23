/**
 * @file Constructs - comment
 * @module esast-util-from-code/constructs/comment
 */

import { errors, tt } from '#src/enums'
import type { CommentKind } from '@flex-development/esast'
import {
  chars,
  codes,
  resolveSlice,
  type Code,
  type Construct,
  type Effects,
  type Resolver,
  type State,
  type TokenFields,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import { ok as assert } from 'devlop'

/**
 * Comment kind.
 *
 * @var {CommentKind | null} kind
 */
let kind: CommentKind | null = null

/**
 * Comment construct.
 *
 * Tokenizes block, docblock, hashbang, and line comments.
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#comments
 *
 * @const {Construct} comment
 */
const comment: Construct = {
  /**
   * Construct name.
   */
  name: tt.comment,

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

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
  test(this: TokenizeContext, code: Code): boolean {
    /**
     * Next code.
     *
     * @const {Code} next
     */
    const next: Code = this.next

    switch (true) {
      case code === codes.hash && next === codes.exclamation:
        return kind = 'hashbang', true
      case code === codes.slash && next === code:
        return kind = 'line', true
      case code === codes.slash && next === codes.asterisk:
        kind = this.peek(2) === codes.asterisk ? 'docblock' : 'block'
        return true
      default:
        return false
    }
  },

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

    return comment

    /**
     * Finish tokenizing a block or docblock comment.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function block(code: Code): State | undefined {
      if (code === codes.eof) {
        self.raise(errors.comment, self.now(), {
          expected: [chars.asterisk + chars.slash],
          ruleId: tt.comment
        })

        effects.exit(tt.comment)
        return ok(code)
      }

      if (code === codes.slash && self.previous === codes.asterisk) {
        effects.consume(code)
        effects.exit(tt.comment)
        return ok
      }

      effects.consume(code)
      return block
    }

    /**
     * Finish tokenizing a hashbang or line comment.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function line(code: Code): State | undefined {
      switch (true) {
        case self.isLineEnding(code):
        case code === codes.eof:
          return effects.exit(tt.comment), ok(code)
        default:
          return effects.consume(code), line
      }
    }

    /**
     * Start comment tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function comment(code: Code): State {
      assert(kind, 'expected comment kind')
      effects.enter(tt.comment, <Partial<TokenFields>>{ kind })
      return effects.consume(code), kind.endsWith('block') ? block : line
    }
  }
}

export default comment
