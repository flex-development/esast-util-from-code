/**
 * @file Type Aliases - TokenInfo
 * @module esast-util-from-code/types/TokenInfo
 */

import type Token from '#src/token'
import type { TokenFields } from '@flex-development/vfile-lexer'
import type TokenValue from './token-value'

/**
 * Token data transfer object.
 *
 * @see {@linkcode TokenFields}
 */
type TokenInfo = Omit<TokenFields, 'next' | 'previous' | 'value'> & {
  /**
   * Next token in linked token list.
   *
   * @see {@linkcode Token}
   */
  next?: Token | undefined

  /**
   * Previous token in linked token list.
   *
   * @see {@linkcode Token}
   */
  previous?: Token | undefined

  /**
   * Token value.
   *
   * @see {@linkcode TokenValue}
   */
  value?: TokenValue | undefined
}

export type { TokenInfo as default }
