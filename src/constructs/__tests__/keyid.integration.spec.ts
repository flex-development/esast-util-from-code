/**
 * @file Integration Tests - keyid
 * @module esast-util-from-code/constructs/tests/integration/keyid
 */

import { tt, types } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'

describe('integration:constructs/keyid', () => {
  it('should fail on non-keyid start', () => {
    expect(new Lexer('').head.next).to.have.property('type').not.eq(tt.keyid)
  })

  it('should fail on template placeholder opener', () => {
    expect(new Lexer(chars.dollar + chars.leftBrace).head).toMatchSnapshot()
  })

  it.each<[description: string, value: string]>([
    ['chars.dollar', chars.dollar],
    ['chars.dollar, start', chars.dollar + 'html'],
    ['chars.underscore', chars.underscore],
    ['chars.underscore, start', chars.underscore + 'id'],
    ['private identifier', chars.hash + 'indices'],
    ['public identifier', tt.keyid],
    ['keyword', types.this],
    ['unicode escape sequence, escaped', '\\u4F60\\u597D'],
    ['unicode escape sequence', '\u4F60\u597D']
  ])('should tokenize identifier and keywords (%s)', (_, value) => {
    expect(new Lexer(value).head).toMatchSnapshot()
  })
})
