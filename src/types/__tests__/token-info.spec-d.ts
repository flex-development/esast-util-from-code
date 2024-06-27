/**
 * @file Type Tests - TokenInfo
 * @module esast-util-from-code/types/tests/unit-d/TokenInfo
 */

import type Token from '#src/token'
import type { Optional } from '@flex-development/tutils'
import type { TokenFields } from '@flex-development/vfile-lexer'
import type TestSubject from '../token-info'
import type TokenValue from '../token-value'

describe('unit-d:types/TokenInfo', () => {
  it('should extend Omit<TokenFields, "value">', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Omit<TokenFields, 'value'>>()
  })

  it('should match [next?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('next')
      .toEqualTypeOf<Optional<Token>>()
  })

  it('should match [previous?: Token | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<Optional<Token>>()
  })

  it('should match [value?: TokenValue | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Optional<TokenValue>>()
  })
})
