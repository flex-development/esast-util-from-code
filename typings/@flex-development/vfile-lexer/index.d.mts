import type { tt } from '#src/enums'
import type { RaiseOptions } from '#src/interfaces'
import type {
  Code,
  Point,
  Position
} from '@flex-development/vfile-lexer'
import type { VFileMessage } from 'vfile-message'

declare module '@flex-development/vfile-lexer' {
  interface Token {
    /**
     * Token value.
     */
    value?: string | null

    /**
     * Leading whitespace.
     */
    whitespace?: string | undefined
  }

  interface TokenTypeMap {
    bigint: tt.bigint
    comment: tt.comment
    keyid: tt.keyid
    number: tt.number
    punctuator: tt.punctuator
    string: tt.string
    whitespace: tt.whitespace
  }

  interface TokenizeContext {
    /**
     * Check if the given character `code` represents a line ending.
     *
     * @see {@linkcode Code}
     * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#line_terminators
     *
     * @param {Code} code - Character code to check
     * @return {code is NonNullable<Code>} `true` if `code` is line ending
     */
    isLineEnding(code: Code): code is NonNullable<Code>

    /**
     * Raise a message.
     *
     * @see {@linkcode Point}
     * @see {@linkcode Position}
     * @see {@linkcode RaiseOptions}
     * @see {@linkcode VFileMessage}
     *
     * @param {string} reason - Reason for message
     * @param {Point | Position} place - Place where error or warning occurred
     * @param {(RaiseOptions | null)?} [info] - Message info
     * @return {VFileMessage} The raised message
     */
    raise(
      reason: string,
      place: Point | Position,
      info?: RaiseOptions | null
    ): VFileMessage
  }
}
