import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'https://api.tally.xyz/query': {
        headers: { 'Api-Key': process.env.VITE_TALLY_API_KEY as string }
      }
    }
  ],
  documents: ['src/tally/**/*.graphql'],
  generates: {
    'src/tally/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: { avoidOptionals: true }
    }
  },
  hooks: { afterAllFileWrite: ['pnpm run lint --fix || true'] }
}

export default config
