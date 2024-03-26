/**
 * @file Interfaces - Point
 * @module esast-util-from-code/interfaces/Point
 */

import type { Offset } from '#src/types'
import type unist from 'unist'

/**
 * One place in a source [*file*][file].
 *
 * [file]: https://github.com/syntax-tree/unist#file
 *
 * @see {@linkcode unist.Point}
 *
 * @extends {Required<unist.Point>}
 */
interface Point extends Required<unist.Point> {
  /**
   * Index of character in source file (0-indexed integer).
   *
   * @see {@linkcode Offset}
   */
  offset: Offset
}

export type { Point as default }
