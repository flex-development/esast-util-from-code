import type Token from '#src/token'
import type { ParserOutput } from '@flex-development/unist-util-parsec'

declare module '@vitest/expect' {
  interface ExpectStatic {
    /**
     * Expect a failed parser output object.
     *
     * @see {@linkcode ParserOutput}
     *
     * @param {ParserOutput} output - Parser output
     * @return {undefined} Nothing
     */
    failed(output: ParserOutput): undefined

    /**
     * Expect a succeeded parser output object.
     *
     * @see {@linkcode ParserOutput}
     * @see {@linkcode Token}
     *
     * @param {ParserOutput} output - Parser output
     * @param {Token} token - Head token
     * @return {undefined} Nothing
     */
    succeeded(output: ParserOutput, token: Token): undefined
  }
}
