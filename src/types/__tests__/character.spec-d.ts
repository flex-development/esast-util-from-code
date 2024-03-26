/**
 * @file Type Tests - Character
 * @module esast-util-from-code/types/tests/unit-d/Character
 */

import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../character'

describe('unit-d:types/Character', () => {
  it('should equal Nullable<string>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Nullable<string>>()
  })
})
