/**
 * @file Constructs - punctuator
 * @module esast-util-from-code/constructs/punctuator
 */

import { tt } from '#src/enums'
import {
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
import { unicodePunctuation as test } from 'micromark-util-character'

/**
 * Punctuator construct.
 *
 * @const {Construct} punctuator
 */
const punctuator: Construct = {
  /**
   * Construct name.
   */
  name: tt.punctuator,

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

    return punctuator

    /**
     * Tokenize a punctuator.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function punctuator(code: Code): State {
      assert(test.call(self, code), 'expected code to pass test')
      effects.enter(tt.punctuator)
      effects.consume(code)
      effects.exit(tt.punctuator)
      return ok
    }
  }
}

export default punctuator
