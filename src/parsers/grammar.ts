/**
 * @file Parsers - Grammar
 * @module esast-util-from-code/parsers/Grammar
 */

import type { PunctuatorToken } from '#src/types'
import type {
  Runner as P,
  RepNResult,
  TokenType as TT
} from '@flex-development/unist-util-parsec'
import { chars } from '@flex-development/vfile-lexer'

/**
 * Abstract parser grammar map.
 *
 * @class
 * @abstract
 */
abstract class Grammar {
  /**
   * Get the ampersand (`&`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.ampersand}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Ampersand parser
   */
  public abstract get ampersand(): P<TT, PunctuatorToken>

  /**
   * Get the arrow (`=>`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode RepNResult}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, RepNResult<2, PunctuatorToken>>} Arrow parser
   */
  public abstract get arrow(): P<TT, RepNResult<2, PunctuatorToken>>

  /**
   * Get the asterisk (`*`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.asterisk}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Asterisk parser
   */
  public abstract get asterisk(): P<TT, PunctuatorToken>

  /**
   * Get the at symbol (`@`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.at}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} At symbol parser
   */
  public abstract get at(): P<TT, PunctuatorToken>

  /**
   * Get the backslash (`\`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.backslash}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Backslash parser
   */
  public abstract get backslash(): P<TT, PunctuatorToken>

  /**
   * Get the backtick parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.backtick}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Backtick parser
   */
  public abstract get backtick(): P<TT, PunctuatorToken>

  /**
   * Get the bar (`|`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.bar}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Bar parser
   */
  public abstract get bar(): P<TT, PunctuatorToken>

  /**
   * Get the caret (`^`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.caret}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Caret parser
   */
  public abstract get caret(): P<TT, PunctuatorToken>

  /**
   * Get the colon (`:`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.colon}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Colon parser
   */
  public abstract get colon(): P<TT, PunctuatorToken>

  /**
   * Get the comma (`,`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.comma}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Comma parser
   */
  public abstract get comma(): P<TT, PunctuatorToken>

  /**
   * Get the dollar sign (`$`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.dollar}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Dollar sign parser
   */
  public abstract get dollar(): P<TT, PunctuatorToken>

  /**
   * Get the dot (`.`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.dot}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Dot parser
   */
  public abstract get dot(): P<TT, PunctuatorToken>

  /**
   * Get the ellipsis (`...`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode RepNResult}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, RepNResult<3, PunctuatorToken>>} Ellipsis parser
   */
  public abstract get ellipsis(): P<TT, RepNResult<3, PunctuatorToken>>

  /**
   * Get the equal sign (`=`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.equal}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Equal sign parser
   */
  public abstract get equal(): P<TT, PunctuatorToken>

  /**
   * Get the exclamation mark (`!`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.exclamation}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Exclamation mark parser
   */
  public abstract get exclamation(): P<TT, PunctuatorToken>

  /**
   * Get the greater than symbol (`>`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.gt}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Greater than symbol parser
   */
  public abstract get gt(): P<TT, PunctuatorToken>

  /**
   * Get the hash symbol (`#`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.hash}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Hash symbol parser
   */
  public abstract get hash(): P<TT, PunctuatorToken>

  /**
   * Get the left brace (`{`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftBrace}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left brace parser
   */
  public abstract get leftBrace(): P<TT, PunctuatorToken>

  /**
   * Get the left bracket (`[`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftBracket}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left bracket parser
   */
  public abstract get leftBracket(): P<TT, PunctuatorToken>

  /**
   * Get the left parenthesis (`(`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftParen}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left parenthesis parser
   */
  public abstract get leftParen(): P<TT, PunctuatorToken>

  /**
   * Get the less than symbol (`<`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.lt}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Less than symbol parser
   */
  public abstract get lt(): P<TT, PunctuatorToken>

  /**
   * Get the minus sign (`-`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.minus}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Minus sign parser
   */
  public abstract get minus(): P<TT, PunctuatorToken>

  /**
   * Get the percent sign (`%`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.percent}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Percent sign parser
   */
  public abstract get percent(): P<TT, PunctuatorToken>

  /**
   * Get the plus sign (`+`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.plus}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Plus sign parser
   */
  public abstract get plus(): P<TT, PunctuatorToken>

  /**
   * Get the question mark (`?`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.question}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Question mark parser
   */
  public abstract get question(): P<TT, PunctuatorToken>

  /**
   * Get the right brace (`}`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightBrace}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right brace parser
   */
  public abstract get rightBrace(): P<TT, PunctuatorToken>

  /**
   * Get the right bracket (`]`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightBracket}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right bracket parser
   */
  public abstract get rightBracket(): P<TT, PunctuatorToken>

  /**
   * Get the right parenthesis (`)`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightParen}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right parenthesis parser
   */
  public abstract get rightParen(): P<TT, PunctuatorToken>

  /**
   * Get the semicolon (`;`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.semicolon}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Semicolon parser
   */
  public abstract get semicolon(): P<TT, PunctuatorToken>

  /**
   * Get the forward slash (`/`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.slash}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Forward slash parser
   */
  public abstract get slash(): P<TT, PunctuatorToken>

  /**
   * Get the tilde (`~`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.tilde}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Tilde parser
   */
  public abstract get tilde(): P<TT, PunctuatorToken>

  /**
   * Forbid leading whitespace.
   *
   * @public
   * @abstract
   * @instance
   *
   * @template {any} R - Parse candidate result
   *
   * @param {P<TT, R>} x - Parser to apply
   * @return {typeof x} No whitespace parser
   */
  public abstract nw<R>(x: P<TT, R>): typeof x
}

export default Grammar
