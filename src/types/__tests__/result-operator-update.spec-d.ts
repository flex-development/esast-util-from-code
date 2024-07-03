/**
 * @file Type Tests - UpdateOperatorResult
 * @module esast-util-from-code/types/tests/unit-d/UpdateOperatorResult
 */

import type { UpdateOperator } from '@flex-development/esast'
import type { Point } from '@flex-development/unist-util-parsec'
import type TestSubject from '../result-operator-update'

describe('unit-d:types/UpdateOperatorResult', () => {
  it('should match [end: Point]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('end').toEqualTypeOf<Point>()
  })

  it('should match [operator: UpdateOperator]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('operator')
      .toEqualTypeOf<UpdateOperator>()
  })

  it('should match [start: Point]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('start').toEqualTypeOf<Point>()
  })
})
