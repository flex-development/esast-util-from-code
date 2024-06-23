/**
 * @file Unit Tests - Token
 * @module esast-util-from-code/tests/unit/Token
 */

import { tt } from '#src/enums'
import type { Point } from '@flex-development/vfile-lexer'
import TestSubject from '../token'

describe('unit:Token', () => {
  describe('constructor', () => {
    let eof: TestSubject
    let point: Point
    let subject: TestSubject

    beforeAll(() => {
      point = { column: 1, line: 1, offset: 0 }

      subject = new TestSubject(tt.sof, {
        end: point,
        next: eof = new TestSubject(tt.eof, { end: point, start: point }),
        start: point
      })
    })

    it('should set #end', () => {
      expect(subject).to.have.property('end', point)
    })

    it('should set #next', () => {
      expect(subject).to.have.property('next', eof)
    })

    it('should set #previous', () => {
      expect(subject).to.have.property('previous', undefined)
    })

    it('should set #start', () => {
      expect(subject).to.have.property('start', point)
    })

    it('should set #type', () => {
      expect(subject).to.have.property('type', tt.sof)
    })

    it('should set #value', () => {
      expect(subject).to.have.property('value', null)
    })

    it('should set #whitespace', () => {
      expect(subject).to.have.property('whitespace', '')
    })
  })
})
