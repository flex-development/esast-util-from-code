/**
 * @file Parsers - PunctuatorParser
 * @module esast-util-from-code/parsers/punctuator
 */

import type { tt } from '#src/enums'
import type { PunctuatorToken } from '#src/types'
import {
  combine,
  condition,
  fail,
  seq,
  succ,
  val,
  type Runner as P,
  type RepNResult,
  type TokenType as TT
} from '@flex-development/unist-util-parsec'
import { chars } from '@flex-development/vfile-lexer'
import AbstractParser from './abstract.parser'

/**
 * Punctuator parser.
 *
 * @see {@linkcode AbstractParser}
 *
 * @class
 * @abstract
 * @extends {AbstractParser}
 */
abstract class PunctuatorParser extends AbstractParser {
  /**
   * Get the ampersand (`&`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.ampersand}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Ampersand parser
   */
  public get ampersand(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.ampersand)
  }

  /**
   * Get the arrow (`=>`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode RepNResult}
   *
   * @public
   * @instance
   *
   * @return {P<TT, RepNResult<2, PunctuatorToken>>} Arrow parser
   */
  public get arrow(): P<TT, RepNResult<2, PunctuatorToken>> {
    return seq(this.equal, this.nw(this.gt))
  }

  /**
   * Get the asterisk (`*`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.asterisk}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Asterisk parser
   */
  public get asterisk(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.asterisk)
  }

  /**
   * Get the at symbol (`@`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.at}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} At symbol parser
   */
  public get at(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.at)
  }

  /**
   * Get the backslash (`\`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.backslash}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Backslash parser
   */
  public get backslash(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.backslash)
  }

  /**
   * Get the backtick parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.backtick}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Backtick parser
   */
  public get backtick(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.backtick)
  }

  /**
   * Get the bar (`|`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.bar}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Bar parser
   */
  public get bar(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.bar)
  }

  /**
   * Get the caret (`^`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.caret}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Caret parser
   */
  public get caret(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.caret)
  }

  /**
   * Get the colon (`:`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.colon}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Colon parser
   */
  public get colon(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.colon)
  }

  /**
   * Get the comma (`,`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.comma}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Comma parser
   */
  public get comma(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.comma)
  }

  /**
   * Get the dollar sign (`$`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.dollar}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Dollar sign parser
   */
  public get dollar(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.dollar)
  }

  /**
   * Get the dot (`.`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.dot}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Dot parser
   */
  public get dot(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.dot)
  }

  /**
   * Get the ellipsis (`...`) parser.
   *
   * @see {@linkcode RepNResult}
   * @see {@linkcode PunctuatorToken}
   *
   * @public
   * @instance
   *
   * @return {P<TT, RepNResult<3, PunctuatorToken>>} Ellipsis parser
   */
  public get ellipsis(): P<TT, RepNResult<3, PunctuatorToken>> {
    return seq(this.dot, this.nw(this.dot), this.nw(this.dot))
  }

  /**
   * Get the equal sign (`=`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.equal}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Equal sign parser
   */
  public get equal(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.equal)
  }

  /**
   * Get the exclamation mark (`!`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.exclamation}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Exclamation mark parser
   */
  public get exclamation(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.exclamation)
  }

  /**
   * Get the right angle (`>`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.gt}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right angle parser
   */
  public get gt(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.gt)
  }

  /**
   * Get the hash symbol (`#`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.hash}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Hash symbol parser
   */
  public get hash(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.hash)
  }

  /**
   * Get the left brace (`{`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftBrace}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left brace parser
   */
  public get leftBrace(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.leftBrace)
  }

  /**
   * Get the left bracket (`[`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftBracket}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left bracket parser
   */
  public get leftBracket(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.leftBracket)
  }

  /**
   * Get the left parenthesis (`(`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.leftParen}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left parenthesis parser
   */
  public get leftParen(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.leftParen)
  }

  /**
   * Get the left angle (`<`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.lt}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Left angle parser
   */
  public get lt(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.lt)
  }

  /**
   * Get the minus sign (`-`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.minus}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Minus sign parser
   */
  public get minus(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.minus)
  }

  /**
   * Get the percent sign (`%`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.percent}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Percent sign parser
   */
  public get percent(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.percent)
  }

  /**
   * Get the plus sign (`+`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.plus}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Plus sign parser
   */
  public get plus(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.plus)
  }

  /**
   * Get the question mark (`?`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.question}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Question mark parser
   */
  public get question(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.question)
  }

  /**
   * Get the right brace (`}`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightBrace}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right brace parser
   */
  public get rightBrace(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.rightBrace)
  }

  /**
   * Get the right bracket (`]`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightBracket}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right bracket parser
   */
  public get rightBracket(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.rightBracket)
  }

  /**
   * Get the right parenthesis (`)`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.rightParen}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Right parenthesis parser
   */
  public get rightParen(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.rightParen)
  }

  /**
   * Get the semicolon (`;`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.semicolon}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Semicolon parser
   */
  public get semicolon(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.semicolon)
  }

  /**
   * Get the forward slash (`/`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.slash}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Forward slash parser
   */
  public get slash(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.slash)
  }

  /**
   * Get the tilde (`~`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode chars.tilde}
   *
   * @public
   * @instance
   *
   * @return {P<TT, PunctuatorToken>} Tilde parser
   */
  public get tilde(): P<TT, PunctuatorToken> {
    return val<tt.punctuator>(chars.tilde)
  }

  /**
   * Forbid leading whitespace.
   *
   * @public
   * @instance
   *
   * @template {any} R - Parse candidate result
   *
   * @param {P<TT, R>} x - Parser to apply
   * @return {typeof x} No whitespace parser
   */
  public nw<R>(x: P<TT, R>): typeof x {
    return combine(x, (result, [head]) => {
      return condition(head?.whitespace, fail(), succ(result))
    })
  }
}

export default PunctuatorParser
