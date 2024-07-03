/**
 * @file Type Aliases - Operator
 * @module esast-util-from-code/types/Operator
 */

import type {
  AssignmentOperator,
  BinaryOperator,
  ImportAssertionOperator,
  UnaryOperator,
  UnaryTypeOperator,
  UpdateOperator
} from '@flex-development/esast'

/**
 * Union of esast operators.
 *
 * @see {@linkcode AssignmentOperator}
 * @see {@linkcode BinaryOperator}
 * @see {@linkcode ImportAssertionOperator}
 * @see {@linkcode UnaryOperator}
 * @see {@linkcode UnaryTypeOperator}
 * @see {@linkcode UpdateOperator}
 */
type Operator =
  | AssignmentOperator
  | BinaryOperator
  | ImportAssertionOperator
  | UnaryOperator
  | UnaryTypeOperator
  | UpdateOperator

export type { Operator as default }
