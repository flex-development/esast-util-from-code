/**
 * @file Interfaces - RaiseOptions
 * @module esast-util-from-code/interfaces/RaiseOptions
 */

import type { Options as MessageOptions } from 'vfile-message'

/**
 * Exception options.
 *
 * @see {@linkcode MessageOptions}
 *
 * @extends {Omit<MessageOptions,'place'>}
 */
interface RaiseOptions extends Omit<MessageOptions, 'place'> {
  /**
   * Source value being reported, which is deemed incorrect.
   */
  actual?: string | null | undefined

  /**
   * List of acceptable values.
   */
  expected?: string[] | undefined

  /**
   * State of problem.
   *
   * - `false` &mdash; warning, change may be needed
   * - `true` &mdash; error, file not usable
   * - `null` / `undefined` &mdash; change likely not needed
   *
   * @default false
   */
  fatal?: boolean | null | undefined
}

export type { RaiseOptions as default }
