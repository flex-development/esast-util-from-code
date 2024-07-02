import type {} from '@flex-development/unist-util-parsec'
import type * as lexer from '@flex-development/vfile-lexer'

declare module '@flex-development/unist-util-parsec' {
  interface Token extends lexer.Token {}

  interface TokenTypeMap extends lexer.TokenTypeMap {}
}
