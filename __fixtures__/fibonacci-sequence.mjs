/**
 * @file Fixtures - FibonacciSequence
 * @module fixtures/FibonacciSequence
 * @see https://codewars.com/kata/55695bc4f75bbaea5100016b
 */

/**
 * Fibonacci sequence iterator.
 *
 * :::info
 * A fibonacci sequence starts with two `1`s. Every element afterwards is the
 * sum of the two previous elements:
 * ```txt
 * 1, 1, 2, 3, 5, 8, 13, ..., 89, 144, 233, 377, ...
 * ```
 * :::
 *
 * @implements {Iterator<number, number>}
 */
class FibonacciSequence {
  /**
   * First managed sequence value.
   *
   * @public
   * @instance
   * @member {number} fib1
   */
  fib1

  /**
   * Second managed sequence value.
   *
   * @public
   * @instance
   * @member {number} fib2
   */
  fib2

  /**
   * Max sequence value.
   *
   * @private
   * @instance
   * @member {number} max
   */
  #max

  /**
   * Create a new fibonacci sequence iterator.
   *
   * @param {number} [max=Number.MAX_SAFE_INTEGER] - Max sequence value
   */
  constructor(max = Number.MAX_SAFE_INTEGER) {
    this.#max = max < 0 ? 0 : max
    this.fib1 = this.fib2 = 1
  }

  /**
   * Iterable protocol.
   *
   * @public
   * @instance
   *
   * @return {IterableIterator<number>} Current sequence iterator
   */
  [Symbol.iterator]() {
    return this
  }

  /**
   * Get the next value in the fibonacci sequence.
   *
   * @public
   * @instance
   *
   * @return {IteratorResult<number, number>} Next sequence value
   */
  next() {
    /**
     * Temporary sequence value.
     *
     * @const {number} value
     */
    const value = this.fib1

    // reset current sequence values
    this.fib1 = this.fib2
    this.fib2 = value + this.fib1

    return { done: value >= this.#max, value }
  }
}

export default FibonacciSequence
