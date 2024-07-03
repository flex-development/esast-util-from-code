/**
 * @file Type Aliases - PunctuatorToken
 * @module esast-util-from-code/types/PunctuatorToken
 */

import type { tt } from '#src/enums'
import type Token from '#src/token'

/**
 * Token representing a punctuator.
 *
 * @see {@linkcode Token}
 * @see {@linkcode tt.punctuator}
 */
type PunctuatorToken = Token<tt.punctuator>

export type { PunctuatorToken as default }
