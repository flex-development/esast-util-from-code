/**
 * @file Integration Tests - comment
 * @module esast-util-from-code/constructs/tests/integration/comment
 */

import { tt } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'
import { dedent } from 'ts-dedent'

describe('integration:constructs/comment', () => {
  it('should fail on non-comment start', () => {
    expect(new Lexer('').head.next).to.have.property('type').not.eq(tt.comment)
  })

  describe('block', () => {
    let value: string

    beforeAll(() => {
      value = '/* i++ */'
    })

    it('should tokenize block comment (unterminated)', () => {
      expect(new Lexer(value.slice(0, -2)).head).toMatchSnapshot()
    })

    it('should tokenize block comment', () => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('docblock', () => {
    let value: string

    beforeAll(() => {
      value = dedent`
        /**
         * @file Constructs - comment
         * @module esast-util-from-code/constructs/comment
         */
      `.trim()
    })

    it('should tokenize docblock comment (unterminated)', () => {
      expect(new Lexer(value.slice(0, -2)).head).toMatchSnapshot()
    })

    it('should tokenize docblock comment', () => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('hashbang', () => {
    it('should tokenize hashbang comment', () => {
      expect(new Lexer(`#!/usr/bin/env node${chars.cr}`).head).toMatchSnapshot()
    })
  })

  describe('line', () => {
    it('should tokenize line comment', () => {
      expect(new Lexer('// const j = k + 3').head).toMatchSnapshot()
    })
  })
})
