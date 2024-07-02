/**
 * @file Parsers - Parser
 * @module esast-util-from-code/parsers/parser
 */

import type { Options } from '#src/interfaces'
import Lexer from '#src/lexer'
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
    Object.defineProperties(this, { tokenizer: { writable: false } })
  }
}

export default Parser
