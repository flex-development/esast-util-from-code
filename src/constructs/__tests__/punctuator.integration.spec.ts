/**
 * @file Integration Tests - punctuator
 * @module esast-util-from-code/constructs/tests/integration/punctuator
 */

import { tt } from '#src/enums'
import Lexer from '#src/lexer'
import { chars } from '@flex-development/vfile-lexer'

describe('integration:constructs/punctuator', () => {
  it.each<keyof typeof chars>([
    'ampersand',
    'asterisk',
    'at',
    'backslash',
    'backtick',
    'bar',
    'caret',
    'colon',
    'comma',
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
  ])('should tokenize chars.%s', key => {
    // Arrange
    const value: (typeof chars)[keyof typeof chars] = chars[key]

    // Act
    const tokenizer = new Lexer(value)

    // Expect
    expect(tokenizer.head).to.have.property('type', tt.sof)
    expect(tokenizer.head.next).to.have.property('type', tt.punctuator)
    expect(tokenizer.head.next).to.have.property('value', value)
    expect(tokenizer.head.next).to.have.property(tt.whitespace, '')
    expect(tokenizer.head.next?.next).to.have.property('type', tt.eof)
    expect(tokenizer.head.next!.next!.next).to.be.undefined
    expect(tokenizer.head).toMatchSnapshot()
  })
})
