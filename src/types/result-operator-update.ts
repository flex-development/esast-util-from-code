/**
 * @file Type Aliases - UpdateOperatorResult
 * @module esast-util-from-code/types/UpdateOperatorResult
 */

import type { UpdateOperator } from '@flex-development/esast'
import type { Point } from '@flex-development/unist-util-parsec'

/**
 * Update operator parser result.
 */
type UpdateOperatorResult = {
  /**
   * Operator end point.
   *
   * @see {@linkcode Point}
   */
  end: Point

  /**
   * Update operator.
   *
   * @see {@linkcode UpdateOperator}
   */
  operator: UpdateOperator

  /**
   * Operator start point.
   *
   * @see {@linkcode Point}
   */
  start: Point
}

export type { UpdateOperatorResult as default }
