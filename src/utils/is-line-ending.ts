/**
 * @file Utilities - isLineEnding
 * @module esast-util-from-code/utils/isLineEnding
 */

import { codes, type Code } from '@flex-development/vfile-lexer'

/**
 * Check if the given character `code` represents a line ending.
 *
 * @see {@linkcode Code}
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#line_terminators
 *
 * @param {Code} code - Character code to check
 * @return {code is NonNullable<Code>} `true` if `code` is line ending
 */
function isLineEnding(code: Code): code is NonNullable<Code> {
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

export default isLineEnding
