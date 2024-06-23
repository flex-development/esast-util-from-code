/**
 * @file Type Tests - RaiseOptions
 * @module esast-util-from-code/interfaces/tests/unit-d/RaiseOptions
 */

import type { Nilable, Optional } from '@flex-development/tutils'
import type { Options as MessageOptions } from 'vfile-message'
import type TestSubject from '../options-raise'

describe('unit-d:interfaces/RaiseOptions', () => {
  it('should extend Omit<MessageOptions, "place">', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Omit<MessageOptions, 'place'>>()
  })

  it('should match [actual?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('actual')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [expected?: string[] | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('expected')
      .toEqualTypeOf<Optional<string[]>>()
  })

  it('should match [fatal?: string | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fatal')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
