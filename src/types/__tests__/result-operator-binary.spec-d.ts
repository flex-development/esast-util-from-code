/**
 * @file Type Tests - BinaryOperatorResult
 * @module esast-util-from-code/types/tests/unit-d/BinaryOperatorResult
 */

import type {
  AnyBinaryExpression,
  BinaryOperator
} from '@flex-development/esast'
import type { Type } from '@flex-development/unist-util-types'
import type TestSubject from '../result-operator-binary'

describe('unit-d:types/BinaryOperatorResult', () => {
  it('should match [0: BinaryOperator]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(0)
      .toEqualTypeOf<BinaryOperator>()
  })

  it('should match [1: Type<AnyBinaryExpression>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty(1)
      .toEqualTypeOf<Type<AnyBinaryExpression>>()
  })
})
