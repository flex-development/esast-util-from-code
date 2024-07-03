/**
 * @file Unit Tests - PunctuatorParser
 * @module esast-util-from-code/parsers/tests/punctuator/unit
 */

import type Token from '#src/token'
import test from '#tests/utils/test'
import { constant, omit } from '@flex-development/tutils'
import { u } from '@flex-development/unist-util-builder'
import { inspectNoColor } from '@flex-development/unist-util-inspect'
import { chars } from '@flex-development/vfile-lexer'
import type { Node } from 'unist'
import type { TestContext } from 'vitest'
import TestSubject from '../parser'

describe('unit:parsers/PunctuatorParser', () => {
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

      // Act + Expect
      expect.failed(test(subject.arrow, subject.head))
    })

    it('should parse "=>"', () => {
      // Arrange
      const subject: TestSubject = new TestSubject(chars.equal + chars.gt)

      // Act
      const output = test(subject.arrow, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).toMatchSnapshot()
    })
  })

  describe('#ellipsis', () => {
    it.each<string>([
      chars.dot + chars.lf + chars.dot.repeat(2),
      chars.dot.repeat(2) + chars.lf + chars.dot
    ])('should fail on invalid whitespace (sample %#)', file => {
      // Arrange
      const subject: TestSubject = new TestSubject(file)

      // Act + Expect
      expect.failed(test(subject.ellipsis, subject.head))
    })

    it('should parse "..."', () => {
      // Arrange
      const subject: TestSubject = new TestSubject(chars.dot.repeat(3))

      // Act
      const output = test(subject.ellipsis, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).toMatchSnapshot()
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

      // Act
      const output = test(subject[key], subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).toMatchSnapshot()
    })
  })
})
