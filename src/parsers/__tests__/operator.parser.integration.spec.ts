/**
 * @file Integration Tests - OperatorParser
 * @module esast-util-from-code/parsers/tests/punctuator/integration
 */

import { keywords, types } from '#src/enums'
import type { BinaryOperatorResult } from '#src/types'
import test from '#tests/utils/test'
import type {
  ArithmeticOperator,
  AssignmentOperator,
  BitwiseBinaryOperator,
  BitwiseShiftOperator,
  EqualityOperator,
  ImportAssertionOperator,
  LogicalOperator,
  RelationalOperator,
  UnaryOperator,
  UnaryTypeOperator,
  UpdateOperator
} from '@flex-development/esast'
import { chars } from '@flex-development/vfile-lexer'
import TestSubject from '../parser'

describe('integration:parsers/OperatorParser', () => {
  describe('#arithmeticOperator', () => {
    it.each<ArithmeticOperator>([
      chars.asterisk,
      chars.asterisk.repeat(2) as ArithmeticOperator,
      chars.minus,
      chars.percent,
      chars.plus,
      chars.slash
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.arithmeticOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#assignmentOperator', () => {
    it.each<AssignmentOperator>([
      '%=',
      '&&=',
      '&=',
      '**=',
      '*=',
      '+=',
      '-=',
      '/=',
      '<<=',
      '=',
      '>>=',
      '>>>=',
      '??=',
      '^=',
      '|=',
      '||='
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.assignmentOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#binaryOperator', () => {
    it.each<[string, BinaryOperatorResult]>([
      ['arithmetic', [chars.plus, types.arithmeticExpression]],
      ['bitwise', [chars.ampersand, types.bitwiseExpression]],
      ['equality', [`${chars.equal}${chars.equal}`, types.equalityExpression]],
      ['logical', [`${chars.bar}${chars.bar}`, types.logicalExpression]],
      ['relational', [chars.gt, types.relationalExpression]]
    ])('should parse %s operator', (_, result) => {
      // Arrange
      const subject: TestSubject = new TestSubject(result[0])

      // Act
      const output = test(subject.binaryOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eql(result)
    })
  })

  describe('#bitwiseBinaryOperator', () => {
    it.each<BitwiseBinaryOperator>([
      chars.ampersand,
      chars.bar,
      chars.caret
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.bitwiseBinaryOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#bitwiseShiftOperator', () => {
    it.each<string>([
      chars.gt + chars.lf + chars.gt,
      chars.lt + chars.space + chars.lt
    ])('should fail on invalid whitespace (sample %#)', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act + Expect
      expect.failed(test(subject.bitwiseShiftOperator, subject.head))
    })

    it.each<BitwiseShiftOperator>([
      chars.gt.repeat(2) as BitwiseShiftOperator,
      chars.gt.repeat(3) as BitwiseShiftOperator,
      chars.lt.repeat(2) as BitwiseShiftOperator
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.bitwiseShiftOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#equalityOperator', () => {
    it.each<string>([
      chars.exclamation + chars.lf + chars.equal,
      chars.equal + chars.space + chars.equal
    ])('should fail on invalid whitespace (sample %#)', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act + Expect
      expect.failed(test(subject.equalityOperator, subject.head))
    })

    it.each<EqualityOperator>([
      '!=',
      '!==',
      chars.equal.repeat(2) as EqualityOperator,
      chars.equal.repeat(3) as EqualityOperator
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.equalityOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#importAssertionOperator', () => {
    it.each<ImportAssertionOperator>([
      keywords.assert,
      keywords.with
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.importAssertionOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#logicalOperator', () => {
    it.each<string>([
      chars.ampersand + chars.cr + chars.ampersand,
      chars.bar + chars.lf + chars.bar,
      chars.question + chars.space + chars.question
    ])('should fail on invalid whitespace (sample %#)', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act + Expect
      expect.failed(test(subject.logicalOperator, subject.head))
    })

    it.each<LogicalOperator>([
      chars.ampersand.repeat(2) as LogicalOperator,
      chars.bar.repeat(2) as LogicalOperator,
      chars.question.repeat(2) as LogicalOperator
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.logicalOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#optionalChainingOperator', () => {
    it('should fail on invalid whitespace', () => {
      // Arrange
      const operator: string = chars.question + chars.space + chars.dot
      const subject: TestSubject = new TestSubject(operator)

      // Act + Expect
      expect.failed(test(subject.optionalChainingOperator, subject.head))
    })

    it('should parse "?."', () => {
      // Arrange
      const operator: string = chars.question + chars.dot
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.optionalChainingOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.be.an('array').of.length(2)
      expect(output.candidate?.result[0].value).to.eq(chars.question)
      expect(output.candidate?.result[1].value).to.eq(chars.dot)
    })
  })

  describe('#relationalOperator', () => {
    it.each<RelationalOperator>([
      '<=',
      '>=',
      chars.gt,
      chars.lt,
      keywords.in,
      keywords.instanceof
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.relationalOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#unaryOperator', () => {
    it.each<UnaryOperator>([
      chars.exclamation,
      chars.minus,
      chars.plus,
      chars.tilde,
      keywords.delete,
      keywords.typeof,
      keywords.void
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.unaryOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#unaryTypeOperator', () => {
    it.each<UnaryTypeOperator>([
      keywords.keyof,
      keywords.readonly,
      keywords.typeof,
      keywords.unique
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.unaryTypeOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eq(operator)
    })
  })

  describe('#updateOperator', () => {
    it.each<string>([
      chars.minus + chars.lf + chars.minus,
      chars.plus + chars.space + chars.plus
    ])('should fail on invalid whitespace (sample %#)', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act + Expect
      expect.failed(test(subject.updateOperator, subject.head))
    })

    it.each<UpdateOperator>([
      chars.minus.repeat(2) as UpdateOperator,
      chars.plus.repeat(2) as UpdateOperator
    ])('should parse "%s"', operator => {
      // Arrange
      const subject: TestSubject = new TestSubject(operator)

      // Act
      const output = test(subject.updateOperator, subject.head)

      // Expect
      expect.succeeded(output, subject.head)
      expect(output.candidate?.result).to.eql({
        end: subject.tail.start,
        operator,
        start: subject.head.start
      })
    })
  })
})
