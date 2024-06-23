/**
 * @file Entry Point - Constructs
 * @module esast-util-from-code/constructs
 */

import type { Construct } from '@flex-development/vfile-lexer'
import comment from './comment'
import keyid from './keyid'
import numeric from './numeric'
import punctuator from './punctuator'
import string from './string'
import whitespace from './whitespace'

/**
 * List of constructs.
 *
 * @const {ReadonlyArray<Construct>} constructs
 */
export const constructs: readonly Construct[] = Object.freeze([
  whitespace,
  comment,
  keyid,
  numeric,
  string,
  punctuator
])
