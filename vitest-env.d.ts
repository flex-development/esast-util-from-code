declare global {
  const afterAll: typeof import('vitest')['afterAll']
  const afterEach: typeof import('vitest')['afterEach']
  const beforeAll: typeof import('vitest')['beforeAll']
  const beforeEach: typeof import('vitest')['beforeEach']
  const describe: typeof import('vitest')['describe']
  const expectTypeOf: typeof import('vitest')['expectTypeOf']
  const it: typeof import('vitest')['it']
  const onTestFailed: typeof import('vitest')['onTestFailed']
  const onTestFinished: typeof import('vitest')['onTestFinished']
  const vi: typeof import('vitest')['vitest']
  const vitest: typeof import('vitest')['vitest']

  var expect: typeof import('vitest')['expect']
}

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly DEV: '1' | import('@flex-development/tutils').EmptyString
  readonly GITHUB_TOKEN: string
  readonly LINT_STAGED?: import('@flex-development/tutils').Stringify<0 | 1>
  readonly MODE: import('@flex-development/tutils').NodeEnv.TEST
  readonly NODE_ENV: import('@flex-development/tutils').NodeEnv.TEST
  readonly PROD: '1' | import('@flex-development/tutils').EmptyString
  readonly PWD: string
  readonly SSR: '1' | import('@flex-development/tutils').EmptyString
  readonly TEST: 'true'
  readonly USER: string
  readonly VITEST: 'true'
  readonly VITEST_CLI_WRAPPER: 'true'
  readonly VITEST_MODE: 'DEV' | 'RUN'
  readonly VITEST_POOL_ID: import('@flex-development/tutils').Numeric
  readonly VITEST_WORKER_ID: import('@flex-development/tutils').Numeric
  readonly VITE_ROOT: string
  readonly VITE_USER_NODE_ENV: import('@flex-development/tutils').NodeEnv.TEST
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
