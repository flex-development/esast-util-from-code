/**
 * @file Type Tests - TokenValue
 * @module esast-util-from-code/types/tests/unit-d/TokenValue
 */

import type TestSubject from '../token-value'

describe('unit-d:types/TokenValue', () => {
  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })

  it('should extract string', () => {
    expectTypeOf<TestSubject>().extract<string>().not.toBeNever()
  })
})
