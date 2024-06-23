/**
 * @file Lexer
 * @module esast-util-from-code/lexer
 */

import {
  Lexer as VFileLexer,
  codes,
  type Code,
  type Point,
  type Position,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import { stringifyPosition } from 'unist-util-stringify-position'
import type { VFile, Value } from 'vfile'
import { VFileMessage } from 'vfile-message'
import { constructs } from './constructs'
import type { LexerOptions, RaiseOptions } from './interfaces'
import Token from './token'

/**
 * Source file tokenizer.
 *
 * @see {@linkcode VFileLexer}
 *
 * @class
 * @extends {VFileLexer}
 */
class Lexer extends VFileLexer {
  /**
   * Raised messages.
   *
   * @public
   * @readonly
   * @instance
   * @member {VFileMessage[]} messages
   */
  public readonly messages: VFileMessage[]

  /**
   * Create a new file tokenizer.
   *
   * @see {@linkcode LexerOptions}
   * @see {@linkcode VFile}
   * @see {@linkcode Value}
   *
   * @param {Value | VFile | null | undefined} file - File to tokenize
   * @param {(LexerOptions | null?)} [options] - Tokenization options
   */
  constructor(
    file: Value | VFile | null | undefined,
    options?: LexerOptions | null
  ) {
    super(file, {
      ...options,
      constructs,
      debug: 'esast-util-from-code:lexer',
      token: Token.create
    })

    this.messages = []
    Object.defineProperties(this, { messages: { writable: false } })

    void this.finalizeContext(this.context)
    void this.tokenize()
  }

  /**
   * Finalize the tokenize context.
   *
   * @see {@linkcode TokenizeContext}
   *
   * @protected
   * @instance
   *
   * @param {TokenizeContext} context - Base context
   * @return {undefined} Nothing
   */
  protected finalizeContext(context: TokenizeContext): undefined {
    context.isLineEnding = this.isLineEnding.bind(this)
    context.raise = this.raise.bind(this)

    return void context
  }

  /**
   * Check if the given character `code` represents a line ending.
   *
   * @see {@linkcode Code}
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#line_terminators
   *
   * @protected
   * @instance
   *
   * @param {Code} code - Character code to check
   * @return {code is NonNullable<Code>} `true` if `code` is line ending
   */
  protected isLineEnding(code: Code): code is NonNullable<Code> {
    switch (code) {
      case codes.cr:
      case codes.lf:
      case codes.ls:
      case codes.ps:
        return true
      default:
        return false
    }
  }

  /**
   * Raise a message.
   *
   * @see {@linkcode Point}
   * @see {@linkcode Position}
   * @see {@linkcode RaiseOptions}
   * @see {@linkcode VFileMessage}
   *
   * @public
   * @instance
   *
   * @param {string} reason - Reason for message
   * @param {Point | Position} place - Place where error or warning occurred
   * @param {(RaiseOptions | null)?} [info] - Message info
   * @return {VFileMessage} The raised message
   */
  public raise(
    reason: string,
    place: Point | Position,
    info?: RaiseOptions | null
  ): VFileMessage {
    /**
     * Message to be raised.
     *
     * @const {VFileMessage} msg
     */
    const msg: VFileMessage = new VFileMessage(reason, { ...info, place })

    msg.actual = <string | undefined>info?.actual
    msg.expected = info?.expected
    msg.fatal = info?.fatal ?? false
    msg.message = `${msg.reason} (${stringifyPosition(place)})`
    msg.source = 'esast-util-from-code'
    msg.url = `https://github.com/flex-development/${msg.source}`

    this.messages.push(msg)
    return msg
  }
}

export default Lexer
