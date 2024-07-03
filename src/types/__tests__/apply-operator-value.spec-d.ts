/**
 * @file Type Tests - ApplyOperatorValue
 * @module esast-util-from-code/types/tests/unit-d/ApplyOperatorValue
 */

import type Token from '#src/token'
import type TestSubject from '../apply-operator-value'

describe('unit-d:types/ApplyOperatorValue', () => {
  type I = Token | null | undefined
  type I1 = I | readonly I[]
  type I2 = I1 | readonly I1[]
  type I3 = I2 | readonly I2[]

  it('should allow 1 dimensional array', () => {
    expectTypeOf<I1>().toMatchTypeOf<TestSubject>()
  })

  it('should allow 2 dimensional array', () => {
    expectTypeOf<I2>().toMatchTypeOf<TestSubject>()
    expectTypeOf<readonly I[][]>().toMatchTypeOf<TestSubject>()
  })

  it('should allow 3 dimensional array', () => {
    expectTypeOf<I3>().toMatchTypeOf<TestSubject>()
    expectTypeOf<readonly I[][][]>().toMatchTypeOf<TestSubject>()
  })

  it('should allow Token', () => {
    expectTypeOf<Token>().toMatchTypeOf<TestSubject>()
  })

  it('should allow null', () => {
    expectTypeOf<null>().toMatchTypeOf<TestSubject>()
  })

  it('should allow undefined', () => {
    expectTypeOf<undefined>().toMatchTypeOf<TestSubject>()
  })
})
