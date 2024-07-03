/**
 * @file E2E Tests - api
 * @module esast-util-from-code/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:esast-util-from-code', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys([
      'AbstractParser',
      'Grammar',
      'Lexer',
      'Parser',
      'PunctuatorParser',
      'Token',
      'errors',
      'isLineEnding',
      'keywords',
      'tt',
      'types'
    ])
  })
})
