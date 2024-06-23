/**
 * @file Integration Tests - Lexer
 * @module esast-util-from-code/tests/integration/Lexer
 */

import type { Options } from '#src/interfaces'
import { chars } from '@flex-development/vfile-lexer'
import { readSync as read } from 'to-vfile'
import type { VFile } from 'vfile'
import TestSubject from '../lexer'

describe('integration:Lexer', () => {
  it('should tokenize empty file', () => {
    expect(new TestSubject(chars.eof).head).toMatchSnapshot()
  })

  describe('non-empty file', () => {
    it.each<[VFile, (Options | null | undefined)?]>([
      [read('__fixtures__/hello.txt')],
      [read('__fixtures__/fibonacci-sequence.ts')],
      [read('__fixtures__/underscore-1.5.2.js')]
    ])('sample %#', (file, options) => {
      expect(new TestSubject(file, options).head).toMatchSnapshot()
    })
  })
})
