/**
 * @file Parsers - AbstractParser
 * @module esast-util-from-code/parsers/AbstractParser
 */

import type { Options } from '#src/interfaces'
import Grammar from './grammar'

/**
 * Abstract source file parser.
 *
 * @see {@linkcode Grammar}
 *
 * @class
 * @abstract
 * @extends {Grammar}
 */
abstract class AbstractParser extends Grammar {
  /**
   * Parser options.
   *
   * @see {@linkcode Options}
   *
   * @protected
   * @instance
   * @member {Options} options
   */
  protected options: Options

  /**
   * Create a new file parser.
   *
   * @see {@linkcode Options}
   *
   * @param {(Options| null)?} [options] - Parser options
   */
  constructor(options?: Options | null) {
    super()
    this.options = options ?? {}
  }
}

export default AbstractParser
