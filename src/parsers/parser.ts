/**
 * @file Parsers - Parser
 * @module esast-util-from-code/parsers/parser
 */

import type { Options } from '#src/interfaces'
import Lexer from '#src/lexer'
import type Token from '#src/token'
import type { Value, VFile } from 'vfile'
import type Grammar from './grammar'
import PunctuatorParser from './punctuator.parser'

/**
 * ECMAScript parser.
 *
 * @see {@linkcode Grammar}
 * @see {@linkcode PunctuatorParser}
 *
 * @class
 * @extends {PunctuatorParser}
 * @implements {Grammar}
 */
class Parser extends PunctuatorParser implements Grammar {
  /**
   * Head token.
   *
   * @see {@linkcode Token}
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<Token>} head
   */
  public readonly head: Readonly<Token>

  /**
   * Tail token.
   *
   * @see {@linkcode Token}
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<Token>} tail
   */
  public readonly tail: Readonly<Token>

  /**
   * Source file tokenizer.
   *
   * @see {@linkcode Lexer}
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<Lexer>} tokenizer
   */
  public readonly tokenizer: Readonly<Lexer>

  /**
   * Create a new ECMAScript parser.
   *
   * @see {@linkcode Options}
   * @see {@linkcode VFile}
   * @see {@linkcode Value}
   *
   * @param {(Value | VFile | null)?} file - File to parse
   * @param {(Options | null)?} [options] - Parser options
   */
  constructor(file?: Value | VFile | null, options?: Options | null) {
    super(options)

    this.tokenizer = Object.freeze(new Lexer(file, this.options))
    this.head = Object.freeze(this.tokenizer.head)
    this.tail = Object.freeze(this.tokenizer.tail)

    Object.defineProperties(this, {
      head: { configurable: false, writable: false },
      tail: { configurable: false, writable: false },
      tokenizer: { configurable: false, enumerable: false, writable: false }
    })
  }
}

export default Parser
