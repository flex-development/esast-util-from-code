/**
 * @file Unit Tests - isLineEnding
 * @module esast-util-from-code/utils/tests/unit/isLineEnding
 */

import { codes } from '@flex-development/vfile-lexer'
import testSubject from '../is-line-ending'

describe('unit:utils/isLineEnding', () => {
  it('should return false if `code` is not line ending', () => {
    expect(testSubject(codes.eof)).to.be.false
  })

  it.each<keyof typeof codes>([
    'cr',
    'lf',
    'ls',
    'ps'
  ])('should return true if `code` is line ending (codes.%s)', key => {
    expect(testSubject(codes[key])).to.be.true
  })
})
