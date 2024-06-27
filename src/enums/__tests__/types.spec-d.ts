/**
 * @file Type Tests - types
 * @module esast-util-from-code/enums/tests/unit-d/types
 */

import type { EsastNode } from '@flex-development/esast'
import type { Type } from '@flex-development/unist-util-types'
import type TestSubject from '../types'

describe('unit-d:enums/types', () => {
  type T = Type<EsastNode>

  it('should contain all esast node types', () => {
    expectTypeOf<keyof typeof TestSubject>().toEqualTypeOf<T>()
    expectTypeOf<(typeof TestSubject)[T]>().toEqualTypeOf<TestSubject>()
  })
})
