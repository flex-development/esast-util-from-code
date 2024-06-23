/**
 * @file Type Tests - LexerOptions
 * @module esast-util-from-code/interfaces/tests/unit-d/LexerOptions
 */

import type { Nilable } from '@flex-development/tutils'
import type { Point } from '@flex-development/vfile-lexer'
import type TestSubject from '../options-lexer'

describe('unit-d:interfaces/LexerOptions', () => {
  it('should match [from?: Point | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('from')
      .toEqualTypeOf<Nilable<Point>>()
  })
})
