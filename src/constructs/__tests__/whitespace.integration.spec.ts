/**
 * @file Integration Tests - whitespace
 * @module esast-util-from-code/constructs/tests/integration/whitespace
 */

import { tt } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'

describe('integration:constructs/whitespace', () => {
  it('should tokenize whitespace (character)', () => {
    // Act
    const tokenizer = new Lexer(chars.space)

    // Expect
    expect(tokenizer.tail).to.have.property(tt.whitespace, chars.space)
    expect(tokenizer.head.next).to.eq(tokenizer.tail)
  })

  it('should tokenize whitespace (sequence)', () => {
    // Arrange
    const value: string = chars.space.repeat(3) + chars.ls + chars.ps

    // Act
    const tokenizer = new Lexer(value)

    // Expect
    expect(tokenizer.tail).to.have.property(tt.whitespace, value)
    expect(tokenizer.head.next).to.eq(tokenizer.tail)
  })
})
