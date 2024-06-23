/**
 * @file Constructs - whitespace
 * @module esast-util-from-code/constructs/whitespace
 */

import { tt } from '#src/enums'
import {
  ev,
  resolveSlice,
  type Code,
  type Construct,
  type Effects,
  type Event,
  type Guard,
  type Resolver,
  type State,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import { unicodeWhitespace as test } from 'micromark-util-character'

/**
 * Whitespace construct.
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#white_space
 *
 * @const {Construct} whitespace
 */
const whitespace: Construct = {
  /**
   * Construct name.
   */
  name: tt.whitespace,

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Resolver}
   */
  resolve: resolveSlice,

  /**
   * Resolve leading whitespace.
   *
   * @see {@linkcode Event}
   *
   * @param {Event[]} events - List of events
   * @return {Event[]} Changed events
   */
  resolveAll(events: Event[]): Event[] {
    for (const [event, token] of events) {
      if (event === ev.enter && token.type === tt.whitespace) {
        if (token.next && typeof token.value === 'string') {
          token.next[tt.whitespace] = token.value
          if (token.previous) token.previous.next = token.next
          token.next.previous = token.previous
        }
      }
    }

    return events
  },

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
    return whitespace

    /**
     * Finish tokenizing whitespace.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      if (!test(code)) return effects.exit(tt.whitespace), ok(code)
      return effects.consume(code), finish
    }

    /**
     * Start whitespace tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function whitespace(code: Code): State {
      return effects.enter(tt.whitespace), effects.consume(code), finish
    }
  }
}

export default whitespace
