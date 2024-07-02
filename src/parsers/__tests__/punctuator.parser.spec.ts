/**
 * @file Unit Tests - PunctuatorParser
 * @module esast-util-from-code/parsers/tests/punctuator/unit
 */

import { tt } from '#src/enums'
import type Token from '#src/token'
import type { PunctuatorToken } from '#src/types'
import { constant, omit } from '@flex-development/tutils'
import { u } from '@flex-development/unist-util-builder'
import { inspectNoColor } from '@flex-development/unist-util-inspect'
import {
  eof,
  kmid,
  ParseError,
  tok,
  type Runner as P,
  type ParserOutput,
  type RepNResult,
  type TokenType as TT
} from '@flex-development/unist-util-parsec'
import { chars } from '@flex-development/vfile-lexer'
import type { Node } from 'unist'
import type { TestContext } from 'vitest'
import TestSubject from '../parser'

describe('unit:parsers/PunctuatorParser', () => {
  type PunctuatorResult = PunctuatorToken | RepNResult<number, PunctuatorToken>

  let parse: (x: P<TT, PunctuatorResult>, token: Token) => void
  let test: (x: P<TT, PunctuatorResult>) => P<TT, PunctuatorResult>

  beforeAll(() => {
    test = x => kmid(tok(tt.sof), x, tok(tt.eof))

    parse = (
      x: P<TT, PunctuatorResult>,
      token: Token
    ): void => {
      /**
       * Parser output.
       *
       * @const {ParserOutput<TT, PunctuatorResult>} output
       */
      const output: ParserOutput<TT, PunctuatorResult> = test(x).parse(token)

      expect(() => eof(output)).not.to.throw
      expect(output.successful).to.be.true
      expect(output.candidate).to.have.property('head', token)
      expect(output.candidate).to.have.property('next', undefined)
      expect(output.candidate).to.have.property('result')
      expect(output.candidate?.result).toMatchSnapshot()
    }
  })

  beforeEach((context: TestContext) => {
    context.expect.addSnapshotSerializer({
      // @ts-expect-error no support for known values (2322).
      print(value: Token | Token[]): string {
        return Array.isArray(value)
          ? inspectNoColor(u('tokens', value.map(node)))
          : inspectNoColor(node(value))

        /**
         * Convert `token` to a node.
         *
         * @param {Token} token - Token to convert
         * @return {Node} `token` as node
         */
        function node(token: Token): Node {
          return u(token.type, {
            ...omit(token, ['end', 'next', 'previous', 'start']),
            position: { end: token.end, start: token.start }
          })
        }
      },
      test: constant(true)
    })
  })

  describe('#arrow', () => {
    it('should fail on invalid whitespace', () => {
      // Arrange
      const file: string = chars.equal + chars.space + chars.gt
      const subject: TestSubject = new TestSubject(file)

      // Act
      const output = test(subject.arrow).parse(subject.tokenizer.head)

      // Expect
      expect(output.successful).to.be.false
      expect(output.error).to.be.instanceof(ParseError)
    })

    it('should parse "=>"', () => {
      // Arrange
      const subject: TestSubject = new TestSubject(chars.equal + chars.gt)

      // Act + Expect
      parse(subject.arrow, subject.tokenizer.head)
    })
  })

  describe('#ellipsis', () => {
    it('should fail on invalid whitespace (sample #1)', () => {
      // Arrange
      const file: string = chars.dot + chars.lf + chars.dot.repeat(2)
      const subject: TestSubject = new TestSubject(file)

      // Act
      const output = test(subject.arrow).parse(subject.tokenizer.head)

      // Expect
      expect(output.successful).to.be.false
      expect(output.error).to.be.instanceof(ParseError)
    })

    it('should fail on invalid whitespace (sample #2)', () => {
      // Arrange
      const file: string = chars.dot.repeat(2) + chars.lf + chars.dot
      const subject: TestSubject = new TestSubject(file)

      // Act
      const output = test(subject.arrow).parse(subject.tokenizer.head)

      // Expect
      expect(output.successful).to.be.false
      expect(output.error).to.be.instanceof(ParseError)
    })

    it('should parse "..."', () => {
      // Arrange
      const subject: TestSubject = new TestSubject(chars.dot.repeat(3))

      // Act + Expect
      parse(subject.ellipsis, subject.tokenizer.head)
    })
  })

  describe('chars', () => {
    it.each([
      'ampersand',
      'asterisk',
      'at',
      'backslash',
      'backtick',
      'bar',
      'caret',
      'colon',
      'comma',
      'dollar',
      'dot',
      'equal',
      'exclamation',
      'gt',
      'hash',
      'leftBrace',
      'leftBracket',
      'leftParen',
      'lt',
      'minus',
      'percent',
      'plus',
      'question',
      'rightBrace',
      'rightBracket',
      'rightParen',
      'semicolon',
      'slash',
      'tilde'
    ] as const)('should parse chars.%s', key => {
      // Arrange
      const subject: TestSubject = new TestSubject(chars[key])

      // Act + Expect
      parse(subject[key], subject.tokenizer.head)
    })
  })
})
