/**
 * @file Type Definitions - CharacterMatch
 * @module esast-util-from-code/types/CharacterMatch
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * A match in a source [*file*][file], with `null` denoting no match.
 *
 * [file]: https://github.com/syntax-tree/unist#file
 */
type CharacterMatch = Nullable<RegExpExecArray>

export type { CharacterMatch as default }
