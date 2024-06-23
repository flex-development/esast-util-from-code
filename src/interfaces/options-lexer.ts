/**
 * @file Interfaces - LexerOptions
 * @module esast-util-from-code/interfaces/LexerOptions
 */

import type { Point } from '@flex-development/vfile-lexer'

/**
 * Lexer configuration options.
 */
interface LexerOptions {
  /**
   * Point before first character in source file.
   *
   * Tokens and node positions will be relative to this point.
   *
   * @see {@linkcode Point}
   */
  from?: Point | null | undefined
}

export type { LexerOptions as default }
