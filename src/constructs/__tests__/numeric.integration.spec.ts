/**
 * @file Integration Tests - numeric
 * @module esast-util-from-code/constructs/tests/integration/numeric
 */

import { tt } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'

describe('integration:constructs/numeric', () => {
  it('should fail on non-numeric start', () => {
    expect(new Lexer('').head.next)
      .to.have.property('type')
      .not.eq(tt.bigint)
      .and.not.eq(tt.number)
  })

  describe('bigint', () => {
    it.each<[description: string, value: string]>([
      ['binary', '0b11101001010101010101'],
      ['exponential', '1e3'],
      ['float', '3.13'],
      ['hex', '0x123456789ABCDEF'],
      ['natural', chars.digit0],
      ['numeric separators', '1_000_000_000_000_000_000_000'],
      ['octal', '0o777777777777']
    ])('should tokenize bigint (%s)', (_, value) => {
      expect(new Lexer(value + chars.lowercaseN).head).toMatchSnapshot()
    })
  })

  describe('binary', () => {
    it.each<[description: string, value: string]>([
      ['lowercase', chars.digit0 + chars.lowercaseB + '01010101101'],
      ['numeric separators', chars.digit0 + chars.lowercaseB + '1010_0001'],
      ['uppercase', chars.digit0 + chars.uppercaseB + '11101001010']
    ])('should tokenize binary number (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('exponential', () => {
    it.each<[description: string, value: string]>([
      ['float', '1.3e26'],
      ['numeric separators', '100_130e-2_6'],
      ['no punctuators', '1E3'],
      ['signed integer', '0e+5'],
      ['signed integer, negative', '175e-2']
    ])('should tokenize exponential number (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('float', () => {
    it.each<[description: string, value: string]>([
      ['leading digit', '1.3'],
      ['leading digits', '26.5'],
      ['leading dot', '.1398'],
      ['missing tail', '3.'],
      ['numeric separators', '1_050.95']
    ])('should tokenize floating point number (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('hex', () => {
    it.each<[description: string, value: string]>([
      ['lowercase', chars.digit0 + chars.lowercaseX + '0123456789FeDcBa'],
      ['numeric separators', chars.digit0 + chars.lowercaseX + 'A0_B0_C0'],
      ['uppercase', chars.digit0 + chars.uppercaseX + 'aBcDeF0123456789']
    ])('should tokenize hexadecimal number (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('integer', () => {
    it.each<[description: string, value: string]>([
      ['chars.digit0', chars.digit0],
      ['chars.digit1', chars.digit1],
      ['chars.digit2', chars.digit2],
      ['chars.digit3', chars.digit3],
      ['chars.digit4', chars.digit4],
      ['chars.digit5', chars.digit5],
      ['chars.digit6', chars.digit6],
      ['chars.digit7', chars.digit7],
      ['chars.digit8', chars.digit8],
      ['chars.digit9', chars.digit9],
      [
        'digits',
        chars.digit9 + chars.digit8 + chars.digit7 + chars.digit6 +
        chars.digit5 + chars.digit4 + chars.digit3 + chars.digit2 +
        chars.digit1 + chars.digit0
      ],
      ['numeric separators', '1_000_000_000_000']
    ])('should tokenize integer (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })

  describe('octal', () => {
    it.each<[description: string, value: string]>([
      ['lowercase', chars.digit0 + chars.lowercaseO + '01234567'],
      ['numeric separators', chars.digit0 + chars.lowercaseO + '2_2_5_6'],
      ['uppercase', chars.digit0 + chars.uppercaseO + '76543210']
    ])('should tokenize octal number (%s)', (_, value) => {
      expect(new Lexer(value).head).toMatchSnapshot()
    })
  })
})
