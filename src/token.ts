/**
 * @file Token
 * @module esast-util-from-code/token
 */

import type {
  Token as IToken,
  Point,
  TokenFields,
  TokenType
} from '@flex-development/vfile-lexer'
import { ok } from 'devlop'
import { tt } from './enums'
import type { TokenInfo, TokenValue } from './types'

/**
 * A span of one (`1`) or more character codes.
 *
 * @see {@linkcode IToken}
 * @see {@linkcode TokenType}
 *
 * @template {TokenType} [T=TokenType] - Token type
 *
 * @class
 * @implements {IToken<T>}
 */
class Token<T extends TokenType = TokenType> implements IToken<T> {
  /**
   * Point where token ends.
   *
   * @see {@linkcode Point}
   *
   * @public
   * @instance
   * @member {Point} end
   */
  public end: Point

  /**
   * Next token.
   *
   * @public
   * @instance
   * @member {Token | undefined} next
   */
  public next?: Token | undefined

  /**
   * Previous token.
   *
   * @public
   * @instance
   * @member {Token | undefined} previous
   */
  public previous?: Token | undefined

  /**
   * Point where token starts.
   *
   * @see {@linkcode Point}
   *
   * @public
   * @instance
   * @member {Point} start
   */
  public start: Point

  /**
   * Token type.
   *
   * @public
   * @readonly
   * @instance
   * @member {T} type
   */
  public readonly type: T

  /**
   * Token value.
   *
   * @see {@linkcode TokenValue}
   *
   * @public
   * @instance
   * @member {TokenValue} value
   */
  public value: TokenValue

  /**
   * Leading whitespace.
   *
   * @public
   * @instance
   * @member {string | undefined} whitespace
   */
  public whitespace?: string | undefined

  /**
   * Create a new token.
   *
   * @see {@linkcode TokenInfo}
   *
   * @param {T} type - Token type
   * @param {TokenInfo} info - Token data
   */
  constructor(type: T, info: TokenInfo) {
    ok(typeof type === 'string', 'expected `kind` to be a string')
    ok(type.length > 0, 'expected `kind` to be a non-empty string')

    const {
      end,
      next,
      previous,
      start,
      value = null,
      whitespace = '',
      ...fields
    } = info

    this.type = type
    this.end = end
    this.next = next
    this.previous = previous
    this.start = start
    this.value = value
    this.whitespace = whitespace

    void (Object.assign(this, fields), Object.defineProperties(this, {
      next: { configurable: false, enumerable: false },
      previous: { configurable: false, enumerable: false },
      type: { configurable: false },
      whitespace: { enumerable: this.type !== tt.whitespace }
    }))
  }

  /**
   * Create a token.
   *
   * @see {@linkcode TokenFields}
   * @see {@linkcode TokenType}
   * @see {@linkcode Token}
   *
   * @public
   * @static
   *
   * @template {TokenType} [T=TokenType] - Token type
   *
   * @param {T} type - Token type
   * @param {TokenFields} info - Token fields
   * @return {Token} New token
   */
  public static create<T extends TokenType = TokenType>(
    type: T,
    info: TokenFields
  ): Token {
    return new Token<T>(type, info)
  }
}

export default Token
