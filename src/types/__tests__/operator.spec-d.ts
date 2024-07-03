/**
 * @file Type Tests - Operator
 * @module esast-util-from-code/types/tests/unit-d/Operator
 */

import type {
  AssignmentOperator,
  BinaryOperator,
  ImportAssertionOperator,
  UnaryOperator,
  UnaryTypeOperator,
  UpdateOperator
} from '@flex-development/esast'
import type TestSubject from '../operator'

describe('unit-d:types/Operator', () => {
  it('should extract AssignmentOperator', () => {
    expectTypeOf<TestSubject>().extract<AssignmentOperator>().not.toBeNever()
  })

  it('should extract BinaryOperator', () => {
    expectTypeOf<TestSubject>().extract<BinaryOperator>().not.toBeNever()
  })

  it('should extract ImportAssertionOperator', () => {
    expectTypeOf<TestSubject>()
      .extract<ImportAssertionOperator>()
      .not.toBeNever()
  })

  it('should extract UnaryOperator', () => {
    expectTypeOf<TestSubject>().extract<UnaryOperator>().not.toBeNever()
  })

  it('should extract UnaryTypeOperator', () => {
    expectTypeOf<TestSubject>().extract<UnaryTypeOperator>().not.toBeNever()
  })

  it('should extract UpdateOperator', () => {
    expectTypeOf<TestSubject>().extract<UpdateOperator>().not.toBeNever()
  })
})
