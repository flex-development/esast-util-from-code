/**
 * @file Integration Tests - string
 * @module esast-util-from-code/constructs/tests/integration/string
 */

import { tt } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'

describe('integration:constructs/string', () => {
  it('should fail on non-string start', () => {
    expect(new Lexer('').head.next).to.have.property('type').not.eq(tt.string)
  })

  describe('double quote', () => {
    it('should tokenize string (escaped opener)', () => {
      // Arrange
      const value: string = chars.quotation +
        chars.backslash +
        chars.quotation.repeat(2)

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, eof)', () => {
      expect(new Lexer(chars.quotation + tt.string).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, line ending)', () => {
      // Arrange
      const value: string = chars.quotation + tt.string + chars.lf

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, opener mismatch)', () => {
      // Arrange
      const value: string = chars.quotation +
        tt.string +
        chars.apostrophe.repeat(2)

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string', () => {
      // Arrange
      const value: string = chars.quotation + tt.string + chars.quotation

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('single quote', () => {
    it('should tokenize string (escaped opener)', () => {
      // Arrange
      const value: string = chars.apostrophe +
        chars.backslash +
        chars.apostrophe.repeat(2)

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, eof)', () => {
      expect(new Lexer(chars.apostrophe + tt.string).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, line ending)', () => {
      // Arrange
      const value: string = chars.apostrophe + tt.string + chars.lf

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string (unterminated, opener mismatch)', () => {
      // Arrange
      const value: string = chars.apostrophe +
        tt.string +
        chars.quotation.repeat(2)

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })

    it('should tokenize string', () => {
      // Arrange
      const value: string = chars.apostrophe + tt.string + chars.apostrophe

      // Act + Expect
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })
})
