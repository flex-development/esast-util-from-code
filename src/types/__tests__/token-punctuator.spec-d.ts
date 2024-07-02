/**
 * @file Type Tests - PunctuatorToken
 * @module esast-util-from-code/types/tests/unit-d/PunctuatorToken
 */

import type { tt } from '#src/enums'
import type Token from '#src/token'
import type TestSubject from '../token-punctuator'

describe('unit-d:types/PunctuatorToken', () => {
  it('should equal Token<tt.punctuator>', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<Token<tt.punctuator>>()
  })
})
