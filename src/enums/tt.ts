/**
 * @file Enums - tt
 * @module esast-util-from-code/enums/tt
 */

import type { TokenType } from '@flex-development/vfile-lexer'

/**
 * Token kinds.
 *
 * @see {@linkcode TokenType}
 *
 * @enum {TokenType}
 */
enum tt {
  bigint = 'bigint',
  comment = 'comment',
  eof = 'eof',
  keyid = 'keyid',
  number = 'number',
  punctuator = 'punctuator',
  sof = 'sof',
  string = 'string',
  whitespace = 'whitespace'
}

export default tt
