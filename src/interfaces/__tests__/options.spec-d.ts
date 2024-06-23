/**
 * @file Type Tests - Options
 * @module esast-util-from-code/interfaces/tests/unit-d/Options
 */

import type TestSubject from '../options'
import type LexerOptions from '../options-lexer'

describe('unit-d:interfaces/Options', () => {
  it('should extend LexerOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<LexerOptions>()
  })
})
