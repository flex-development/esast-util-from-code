/**
 * @file Type Tests - Reader
 * @module esast-util-from-code/tests/unit-d/Reader
 */

import type Location from '../location'
import type TestSubject from '../reader'

describe('unit-d:Reader', () => {
  it('should extend Location', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Location>()
  })
})
