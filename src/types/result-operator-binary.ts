/**
 * @file Type Aliases - BinaryOperatorResult
 * @module esast-util-from-code/types/BinaryOperatorResult
 */

import type {
  ArithmeticExpression,
  ArithmeticOperator,
  BitwiseExpression,
  BitwiseOperator,
  EqualityExpression,
  EqualityOperator,
  LogicalExpression,
  LogicalOperator,
  RelationalExpression,
  RelationalOperator
} from '@flex-development/esast'
import type { Type } from '@flex-development/unist-util-types'

/**
 * Binary operator parser result.
 *
 * @see {@linkcode ArithmeticExpression}
 * @see {@linkcode ArithmeticOperator}
 * @see {@linkcode BitwiseExpression}
 * @see {@linkcode BitwiseOperator}
 * @see {@linkcode LogicalExpression}
 * @see {@linkcode LogicalOperator}
 * @see {@linkcode RelationalExpression}
 * @see {@linkcode RelationalOperator}
 * @see {@linkcode Type}
 */
type BinaryOperatorResult =
  | [
    operator: ArithmeticOperator,
    type: Type<ArithmeticExpression>
  ]
  | [
    operator: BitwiseOperator,
    type: Type<BitwiseExpression>
  ]
  | [
    operator: EqualityOperator,
    type: Type<EqualityExpression>
  ]
  | [
    operator: LogicalOperator,
    type: Type<LogicalExpression>
  ]
  | [
    operator: RelationalOperator,
    type: Type<RelationalExpression>
  ]

export type { BinaryOperatorResult as default }
