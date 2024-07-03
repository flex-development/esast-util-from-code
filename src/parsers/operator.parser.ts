/**
 * @file Parsers - OperatorParser
 * @module esast-util-from-code/parsers/operator
 */

import { keywords, types, type tt } from '#src/enums'
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
import { reduce, sift } from '@flex-development/tutils'
import {
  alt,
  apply,
  combine,
  condition,
  opt,
  seq,
  succ,
  val,
  type Runner as P,
  type RepNResult,
  type TokenType as TT
} from '@flex-development/unist-util-parsec'
import { chars } from '@flex-development/vfile-lexer'
import { ok } from 'devlop'
import PunctuatorParser from './punctuator.parser'

/**
 * Operator parser.
 *
 * @see {@linkcode PunctuatorParser}
 *
 * @class
 * @abstract
 * @extends {PunctuatorParser}
 */
abstract class OperatorParser extends PunctuatorParser {
  /**
   * Get the arithmetic operator parser.
   *
   * @see {@linkcode ArithmeticOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, ArithmeticOperator>} Arithmetic operator parser
   */
  public get arithmeticOperator(): P<TT, ArithmeticOperator> {
    return apply(alt(
      this.plus,
      this.minus,
      seq(this.asterisk, opt(this.nw(this.asterisk))),
      this.slash,
      this.percent
    ), value => this.applyOperator<ArithmeticOperator>(value))
  }

  /**
   * Get the assignment operator parser.
   *
   * @see {@linkcode AssignmentOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, AssignmentOperator>} Assignment operator parser
   */
  public get assignmentOperator(): P<TT, AssignmentOperator> {
    return apply(combine(opt(alt(
      seq(this.asterisk, opt(this.nw(this.asterisk))),
      seq(this.ampersand, opt(this.nw(this.ampersand))),
      seq(this.bar, opt(this.nw(this.bar))),
      seq(this.question, this.nw(this.question)),
      seq(
        this.lt,
        this.nw(this.lt),
        opt(this.nw(this.lt))
      ),
      seq(
        this.gt,
        this.nw(this.gt),
        opt(this.nw(this.gt))
      ),
      this.caret,
      this.slash,
      this.minus,
      this.percent,
      this.plus
    )), result => {
      return condition(
        result,
        seq(succ(result!), this.nw(this.equal)),
        this.equal
      )
    }), value => this.applyOperator<AssignmentOperator>(value))
  }

  /**
   * Get the binary operator parser.
   *
   * @see {@linkcode BinaryOperatorResult}
   *
   * @public
   * @instance
   *
   * @return {P<TT, BinaryOperatorResult>} Binary operator parser
   */
  public get binaryOperator(): P<TT, BinaryOperatorResult> {
    return alt(
      apply(this.logicalOperator, op => [op, types.logicalExpression]),
      apply(this.bitwiseBinaryOperator, op => [op, types.bitwiseExpression]),
      apply(this.equalityOperator, op => [op, types.equalityExpression]),
      apply(this.relationalOperator, op => [op, types.relationalExpression]),
      apply(this.bitwiseShiftOperator, op => [op, types.bitwiseExpression]),
      apply(this.arithmeticOperator, op => [op, types.arithmeticExpression])
    )
  }

  /**
   * Get the bitwise binary operator parser.
   *
   * @see {@linkcode BitwiseBinaryOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, BitwiseBinaryOperator>} Bitwise binary operator parser
   */
  public get bitwiseBinaryOperator(): P<TT, BitwiseBinaryOperator> {
    return apply(alt(
      this.bar,
      this.caret,
      this.ampersand
    ), value => this.applyOperator<BitwiseBinaryOperator>(value))
  }

  /**
   * Get the bitwise shift operator parser.
   *
   * @see {@linkcode BitwiseShiftOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, BitwiseShiftOperator>} Bitwise shift operator parser
   */
  public get bitwiseShiftOperator(): P<TT, BitwiseShiftOperator> {
    return apply(combine(alt(this.lt, this.gt), result => {
      return seq(succ(result), condition(
        result.value === chars.lt,
        this.nw(this.lt),
        seq(this.nw(this.gt), opt(this.nw(this.gt)))
      ))
    }), value => this.applyOperator<BitwiseShiftOperator>(value))
  }

  /**
   * Get the equality operator parser.
   *
   * @see {@linkcode EqualityOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, EqualityOperator>} Equality operator parser
   */
  public get equalityOperator(): P<TT, EqualityOperator> {
    return apply(seq(
      alt(this.exclamation, this.equal),
      this.nw(this.equal),
      opt(this.nw(this.equal))
    ), value => this.applyOperator<EqualityOperator>(value))
  }

  /**
   * Get the import assertion operator parser.
   *
   * @see {@linkcode importAssertionOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, ImportAssertionOperator>} Import assertion operator parser
   */
  public get importAssertionOperator(): P<TT, ImportAssertionOperator> {
    return apply(alt(
      val<tt.keyid>(keywords.assert),
      val<tt.keyid>(keywords.with)
    ), value => this.applyOperator<ImportAssertionOperator>(value))
  }

  /**
   * Get the logical operator parser.
   *
   * @see {@linkcode LogicalOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, LogicalOperator>} Logical operator parser
   */
  public get logicalOperator(): P<TT, LogicalOperator> {
    return apply(alt(
      seq(this.question, this.nw(this.question)),
      seq(this.bar, this.nw(this.bar)),
      seq(this.ampersand, this.nw(this.ampersand))
    ), value => this.applyOperator<LogicalOperator>(value))
  }

  /**
   * Get the optional chaining operator (`?.`) parser.
   *
   * @see {@linkcode PunctuatorToken}
   * @see {@linkcode RepNResult}
   *
   * @public
   * @instance
   *
   * @return {P<TT, RepNResult<2, PunctuatorToken>>} Optional chaining operator
   * parser
   */
  public get optionalChainingOperator(): P<TT, RepNResult<2, PunctuatorToken>> {
    return seq(this.question, this.nw(this.dot))
  }

  /**
   * Get the relational operator parser.
   *
   * @see {@linkcode RelationalOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, RelationalOperator>} Relational operator parser
   */
  public get relationalOperator(): P<TT, RelationalOperator> {
    return apply(alt(
      seq(alt(this.lt, this.gt), opt(this.nw(this.equal))),
      val<tt.keyid>(keywords.in),
      val<tt.keyid>(keywords.instanceof)
    ), value => this.applyOperator<RelationalOperator>(value))
  }

  /**
   * Get the unary operator parser.
   *
   * @see {@linkcode UnaryOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, UnaryOperator>} Unary operator parser
   */
  public get unaryOperator(): P<TT, UnaryOperator> {
    return apply(alt(
      val<tt.keyid>(keywords.delete),
      val<tt.keyid>(keywords.typeof),
      val<tt.keyid>(keywords.void),
      this.exclamation,
      this.minus,
      this.plus,
      this.tilde
    ), value => this.applyOperator<UnaryOperator>(value))
  }

  /**
   * Get the unary type operator parser.
   *
   * @see {@linkcode UnaryTypeOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, UnaryTypeOperator>} Unary type operator parser
   */
  public get unaryTypeOperator(): P<TT, UnaryTypeOperator> {
    return apply(alt(
      val<tt.keyid>(keywords.keyof),
      val<tt.keyid>(keywords.readonly),
      val<tt.keyid>(keywords.typeof),
      val<tt.keyid>(keywords.unique)
    ), value => this.applyOperator<UnaryTypeOperator>(value))
  }

  /**
   * Get the update operator parser.
   *
   * @see {@linkcode UpdateOperatorResult}
   * @see {@linkcode UpdateOperator}
   *
   * @public
   * @instance
   *
   * @return {P<TT, UpdateOperatorResult>} Update operator parser
   */
  public get updateOperator(): P<TT, UpdateOperatorResult> {
    return apply(combine(alt(this.minus, this.plus), result => {
      return seq(succ(result), this.nw(condition(
        result.value === chars.minus,
        this.minus,
        this.plus
      )))
    }), value => ({
      end: value[1].end,
      operator: this.applyOperator(value),
      start: value[0].start
    }))
  }

  /**
   * Create an operator.
   *
   * @see {@linkcode ApplyOperatorValue}
   * @see {@linkcode Operator}
   *
   * @protected
   * @instance
   *
   * @template {Operator} T - Operator
   *
   * @param {ApplyOperatorValue} value - Apply callback value
   * @return {T} Operator
   */
  protected applyOperator<T extends Operator>(value: ApplyOperatorValue): T {
    return <T>reduce(sift([value].flat(3)), (acc, token) => {
      ok(token.value !== null, 'expected token value')
      return acc + token.value
    }, <string>'')
  }
}

export default OperatorParser
