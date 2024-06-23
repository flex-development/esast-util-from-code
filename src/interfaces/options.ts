/**
 * @file Interfaces - Options
 * @module esast-util-from-code/interfaces/Options
 */

import type LexerOptions from './options-lexer'

/**
 * Configuration options.
 *
 * @see {@linkcode LexerOptions}
 *
 * @extends {LexerOptions}
 */
interface Options extends LexerOptions {}

export type { Options as default }
