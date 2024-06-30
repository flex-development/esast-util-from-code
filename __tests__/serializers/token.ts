/**
 * @file Snapshot Serializers - token
 * @module tests/serializers/token
 * @see https://vitest.dev/guide/snapshot
 */

import Token from '#src/token'
import inspect from '#tests/utils/inspect'
import { ok } from 'devlop'
import type { SnapshotSerializer } from 'vitest'

/**
 * Check if `value` is a {@linkcode Token}.
 *
 * @param {unknown} value - Thing to check
 * @return {value is Token} `true` if `value` is token instance
 */
function test(value: unknown): value is Token {
  return (
    typeof value === 'object' &&
    !!value &&
    value.constructor.name === Token.name
  )
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
    return inspect(value)
  },

  /**
   * Check if the given value is a {@linkcode Token}.
   */
  test
}

export default serializer
