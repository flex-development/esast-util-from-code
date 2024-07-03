/**
 * @file Test Utilities - test
 * @module tests/utils/test
 */

import { tt } from '#src/enums'
import type Token from '#src/token'
import {
  kmid,
  tok,
  type ParserOutput,
  type Runner,
  type TokenType
} from '@flex-development/unist-util-parsec'

/**
 * Parse an occurrence of `x`, bounded by start and end of file tokens.
 *
 * @see {@linkcode ParserOutput}
 * @see {@linkcode Runner}
 * @see {@linkcode TokenType}
 * @see {@linkcode Token}
 *
 * @template {any} R - Parse candidate result
 *
 * @param {Runner<TokenType, R>} x - Parser to apply
 * @param {Token | undefined} token - Current token
 * @return {ParserOutput<TokenType, R>} Parser output
 */
function test<R>(
  x: Runner<TokenType, R>,
  token: Token | undefined
): ParserOutput<TokenType, R> {
  return kmid(tok(tt.sof), x, tok(tt.eof)).parse(token)
}

export default test
