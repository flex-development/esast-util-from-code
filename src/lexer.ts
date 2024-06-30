/**
 * @file Lexer
 * @module esast-util-from-code/lexer
 */

import {
  stringifyPosition
} from '@flex-development/unist-util-stringify-position'
import {
  Lexer as VFileLexer,
  type Point,
  type Position,
  type TokenizeContext
} from '@flex-development/vfile-lexer'
import type { VFile, Value } from 'vfile'
import { VFileMessage } from 'vfile-message'
import { constructs } from './constructs'
import type { LexerOptions, RaiseOptions } from './interfaces'
import Token from './token'
import { isLineEnding } from './utils'

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
    context.isLineEnding = isLineEnding
    context.raise = this.raise.bind(this)

    return void context
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
    msg.message = `${reason} (${stringifyPosition(place, { offsets: false })})`
    msg.source = 'esast-util-from-code'
    msg.url = `https://github.com/flex-development/${msg.source}`

    this.messages.push(msg)
    return msg
  }
}

export default Lexer
