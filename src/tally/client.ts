import { GraphQLClient } from 'graphql-request'

export const tallyClient = new GraphQLClient(
  'https://api.tally.xyz/query',
  { 
    headers: { 
      'Api-Key': import.meta.env.VITE_TALLY_API_KEY || '' 
    } 
  }
)

// Export for use in codegen hooks
export { tallyClient as fetcher }
