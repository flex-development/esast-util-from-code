/**
 * @file Constructs - numeric
 * @module esast-util-from-code/constructs/numeric
 */

import { tt } from '#src/enums'
import {
  chars,
  codes,
  ev,
  resolveSlice,
  type Code,
  type Construct,
  type Effects,
  type Event,
  type State,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import { ok as assert } from 'devlop'
import { asciiDigit } from 'micromark-util-character'

/**
 * Numeric literal construct.
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals
 *
 * @const {Construct} numeric
 */
const numeric: Construct = {
  /**
   * Construct name.
   */
  name: 'numeric',

  /**
   * Resolve the events parsed by `tokenize`.
   *
   * @see {@linkcode Construct.tokenize}
   * @see {@linkcode Event}
   * @see {@linkcode TokenizeContext}
   *
   * @param {Event[]} events - List of events
   * @param {TokenizeContext} context - Tokenize context
   * @return {Event[]} Changed events
   */
  resolve(events: Event[], context: TokenizeContext): Event[] {
    resolveSlice(events, context)

    for (const [event, token] of events) {
      if (event === ev.enter && token.type === tt.number) {
        assert(typeof token.value === 'string', 'expected token value')
        if (token.value.endsWith(chars.lowercaseN)) token.type = tt.bigint
      }
    }

    return events
  },

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
    return asciiDigit(code) || (code === codes.dot && asciiDigit(this.next))
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
     * Zero check.
     *
     * @const {boolean} zero
     */
    const zero: boolean = this.code === codes.digit0

    /**
     * Map indicating exponential number, where `digit` indicates a digit was
     * seen, and `punctuator` a plus or minus sign was seen.
     *
     * @var {{ digit: boolean; punctuator: boolean }} exponential
     */
    let exponential: { e: boolean; punctuator: boolean } = {
      e: false,
      punctuator: false
    }

    /**
     * Boolean indicating floating point number.
     *
     * @var {boolean} float
     */
    let float: boolean = this.code === codes.dot

    /**
     * Boolean indicating binary, hex, or octal number.
     *
     * @var {boolean} radix
     */
    let radix: boolean = false

    return numeric

    /**
     * Create a radix number state.
     *
     * @param {'b' | 'o' | 'x'} char - Radix number character
     * @return {State} Next state
     */
    function rad(char: 'b' | 'o' | 'x'): State {
      return radix

      /**
       * Finish radix number tokenization.
       *
       * @param {Code} code - Current character code
       * @return {State | undefined} Next state
       */
      function radix(code: Code): State | undefined {
        if (code !== codes.eof) {
          if (code === codes.lowercaseN) return finish(code)

          /**
           * Boolean indicating current code should be consumed.
           *
           * @var {boolean} consume
           */
          let consume: boolean = false

          switch (char) {
            case chars.lowercaseB:
              consume = code >= codes.digit0 && code <= codes.digit1
              break
            case chars.lowercaseO:
              consume = code >= codes.digit0 && code <= codes.digit7
              break
            default:
              consume = asciiDigit(code) ||
                (code >= codes.lowercaseA && code <= codes.lowercaseF) ||
                (code >= codes.uppercaseA && code <= codes.uppercaseF)
              break
          }

          if (!consume && code === codes.underscore) consume = true
          if (consume) return effects.consume(code), radix
        }

        return effects.exit(tt.number), ok(code)
      }
    }

    /**
     * Finish numeric literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State | undefined} Next state
     */
    function finish(code: Code): State | undefined {
      if (code === codes.lowercaseN) {
        return effects.consume(code), effects.exit(tt.number), ok
      }

      if (!radix) {
        if (zero) {
          // binary number
          if (code === codes.lowercaseB || code === codes.uppercaseB) {
            return radix = true, effects.consume(code), rad(chars.lowercaseB)
          }

          // hex number
          if (code === codes.lowercaseX || code === codes.uppercaseX) {
            return radix = true, effects.consume(code), rad(chars.lowercaseX)
          }

          // octal number
          if (code === codes.lowercaseO || code === codes.uppercaseO) {
            return radix = true, effects.consume(code), rad(chars.lowercaseO)
          }
        }

        // integer or float
        if (
          asciiDigit(code) ||
          code === codes.underscore ||
          (code === codes.dot && !exponential.e && !float)
        ) {
          if (code === codes.dot) float = true
          return effects.consume(code), finish
        }

        // exponential
        if (code === codes.lowercaseE || code === codes.uppercaseE) {
          if (!exponential.e) {
            return exponential.e = true, effects.consume(code), finish
          }
        }

        // continue exponential
        if (code === codes.minus || code === codes.plus) {
          if (exponential.e && !exponential.punctuator) {
            return exponential.punctuator = true, effects.consume(code), finish
          }
        }
      }

      return effects.exit(tt.number), ok(code)
    }

    /**
     * Start numeric literal tokenization.
     *
     * @param {Code} code - Current character code
     * @return {State} Next state
     */
    function numeric(code: Code): State {
      return effects.enter(tt.number), effects.consume(code), finish
    }
  }
}

export default numeric
