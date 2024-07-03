/**
 * @file Type Aliases - ApplyOperatorValue
 * @module esast-util-from-code/types/ApplyOperatorValue
 */

import type Token from '#src/token'
import type { apply } from '@flex-development/unist-util-parsec'

/**
 * Construct a union of {@linkcode apply} callback values that can be used to
 * build an operator.
 */
type ApplyOperatorValue = Token | null | undefined extends
  infer H extends Token | null | undefined
  ? H | H[] | readonly H[] extends infer I
    ? I | I[] | readonly I[] extends infer J ? J | J[] | readonly J[]
    : never
  : never
  : never

export type { ApplyOperatorValue as default }
