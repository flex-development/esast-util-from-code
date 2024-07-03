/**
 * @file Test Setup - expect
 * @module tests/setup/expect
 */

import type Token from '#src/token'
import {
  ParseError,
  result,
  type ParserOutput,
  type TokenType as TT
} from '@flex-development/unist-util-parsec'

/**
 * Expect a failed parser output object.
 *
 * @param {ParserOutput<TT, unknown>} output - Parser output
 * @return {undefined} Nothing
 */
function failed(output: ParserOutput<TT, unknown>): undefined {
  void expect(output.successful).to.be.false
  expect(output.error).to.be.instanceof(ParseError)
  return void output
}

/**
 * Expect a succeeded parser output object.
 *
 * @param {ParserOutput<TT, unknown>} output - Parser output
 * @param {Token} token - Head token
 * @return {undefined} Nothing
 */
function succeeded(output: ParserOutput<TT, unknown>, token: Token): undefined {
  void expect(() => result(output)).not.to.throw
  expect(output.candidate).to.have.property('head', token)
  expect(output.candidate).to.have.property('next', undefined)
  expect(output.candidate).to.have.property('result')
  return void output
}

global.expect.failed = failed
global.expect.succeeded = succeeded
