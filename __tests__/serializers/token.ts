/**
 * @file Snapshot Serializers - token
 * @module tests/serializers/token
 * @see https://vitest.dev/guide/snapshot
 */

import type { Position, Token } from '@flex-development/vfile-lexer'
import { ok } from 'devlop'
import { stringifyPosition } from 'unist-util-stringify-position'
import type { SnapshotSerializer } from 'vitest'

/**
 * Check if `value` is a {@linkcode Token}.
 *
 * @param {unknown} value - Value to check
 * @return {value is Token} `true` if `value` is a token
 */
function test(value: unknown): value is Token {
  if (typeof value !== 'object' || !value) return false
  return 'end' in value && 'start' in value && 'type' in value
}

/**
 * Token snapshot serializer.
 *
 * @const {SnapshotSerializer} serializer
 */
const serializer: SnapshotSerializer = {
  /**
   * Print a snapshot value.
   *
   * @param {unknown} value - Value to print
   * @return {string} Snapshot value
   */
  print(value: unknown): string {
    ok(test(value), 'expected token')

    /**
     * Index of current token.
     *
     * @var {number} index
     */
    let index: number = -1

    /**
     * Snapshot value.
     *
     * @var {string} snapshot
     */
    let snapshot: string = ''

    /**
     * Current token.
     *
     * @var {Token | undefined} token
     */
    let token: Token | undefined = value

    // get snapshot value
    while (token) {
      /**
       * Token range.
       *
       * @const {Position} range
       */
      const range: Position = { end: token.end, start: token.start }

      // add token type, index, and position to snapshot
      snapshot += `\t├─${++index} ${token.type} (${stringifyPosition(range)})\n`

      // add additional token fields to snapshot
      for (const [key, value] of Object.entries(token)) {
        if (
          key !== 'end' &&
          key !== 'next' &&
          key !== 'previous' &&
          key !== 'start' &&
          key !== 'type'
        ) {
          snapshot += `\t│\t\t ${key}: ${JSON.stringify(value)}\n`
        }
      }

      token = token.next
    }

    return `tokens[${index + 1}]\n\t${snapshot.trim()}`
  },

  /**
   * Check if the given value is a {@linkcode Token}.
   */
  test
}

export default serializer
