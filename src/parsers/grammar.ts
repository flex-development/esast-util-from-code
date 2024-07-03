/**
 * @file Parsers - Grammar
 * @module esast-util-from-code/parsers/Grammar
 */

import type {
  ApplyOperatorValue,
  BinaryOperatorResult,
  Operator,
  PunctuatorToken,
  UpdateOperatorResult
} from '#src/types'
import type {
  ArithmeticOperator,
  AssignmentOperator,
  BitwiseBinaryOperator,
  BitwiseShiftOperator,
  EqualityOperator,
  ImportAssertionOperator,
  LogicalOperator,
  RelationalOperator,
  UnaryOperator,
  UnaryTypeOperator,
  UpdateOperator
} from '@flex-development/esast'
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
   * Get the arithmetic operator parser.
   *
   * @see {@linkcode ArithmeticOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, ArithmeticOperator>} Arithmetic operator parser
   */
  public abstract get arithmeticOperator(): P<TT, ArithmeticOperator>

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
   * Get the assignment operator parser.
   *
   * @see {@linkcode AssignmentOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, AssignmentOperator>} Assignment operator parser
   */
  public abstract get assignmentOperator(): P<TT, AssignmentOperator>

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
   * Get the binary operator parser.
   *
   * @see {@linkcode BinaryOperatorResult}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, BinaryOperatorResult>} Binary operator parser
   */
  public abstract get binaryOperator(): P<TT, BinaryOperatorResult>

  /**
   * Get the bitwise binary operator parser.
   *
   * @see {@linkcode BitwiseBinaryOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, BitwiseBinaryOperator>} Bitwise binary operator parser
   */
  public abstract get bitwiseBinaryOperator(): P<TT, BitwiseBinaryOperator>

  /**
   * Get the bitwise shift operator parser.
   *
   * @see {@linkcode BitwiseShiftOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, BitwiseShiftOperator>} Bitwise shift operator parser
   */
  public abstract get bitwiseShiftOperator(): P<TT, BitwiseShiftOperator>

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
   * Get the equality operator parser.
   *
   * @see {@linkcode EqualityOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, EqualityOperator>} Equality operator parser
   */
  public abstract get equalityOperator(): P<TT, EqualityOperator>

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
   * Get the import assertion operator parser.
   *
   * @see {@linkcode ImportAssertionOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, ImportAssertionOperator>} Import assertion operator parser
   */
  public abstract get importAssertionOperator(): P<TT, ImportAssertionOperator>

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
   * Get the logical operator parser.
   *
   * @see {@linkcode LogicalOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, LogicalOperator>} Logical operator parser
   */
  public abstract get logicalOperator(): P<TT, LogicalOperator>

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
   * Get the optional chaining operator (`?.`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode RepNResult}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, RepNResult<2, PunctuatorToken>>} Optional chaining operator
   * parser
   */
  public abstract get optionalChainingOperator(
    //
  ): P<TT, RepNResult<2, PunctuatorToken>>

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
   * Get the relational operator parser.
   *
   * @see {@linkcode RelationalOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, RelationalOperator>} Relational operator parser
   */
  public abstract get relationalOperator(): P<TT, RelationalOperator>

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
   * Get the unary operator parser.
   *
   * @see {@linkcode UnaryOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, UnaryOperator>} Unary operator parser
   */
  public abstract get unaryOperator(): P<TT, UnaryOperator>

  /**
   * Get the unary type operator parser.
   *
   * @see {@linkcode UnaryTypeOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, UnaryTypeOperator>} Unary type operator parser
   */
  public abstract get unaryTypeOperator(): P<TT, UnaryTypeOperator>

  /**
   * Get the update operator parser.
   *
   * @see {@linkcode UpdateOperatorResult}
   * @see {@linkcode UpdateOperator}
   *
   * @public
   * @abstract
   * @instance
   *
   * @return {P<TT, UpdateOperatorResult>} Update operator parser
   */
  public abstract get updateOperator(): P<TT, UpdateOperatorResult>

  /**
   * Create an operator.
   *
   * @see {@linkcode ApplyOperatorValue}
   * @see {@linkcode Operator}
   *
   * @protected
   * @abstract
   * @instance
   *
   * @template {Operator} T - Operator
   *
   * @param {ApplyOperatorValue} value - Apply callback value
   * @return {T} Operator
   */
  protected abstract applyOperator<T extends Operator>(
    value: ApplyOperatorValue
  ): T

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
