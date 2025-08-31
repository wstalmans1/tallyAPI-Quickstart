import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { tallyFetch } from './fetcher'

// GraphQL queries as strings
const GOVERNORS = /* GraphQL */ `
  query Governors($input: GovernorsInput!) {
    governors(input: $input) {
      nodes { 
        ... on Governor { 
          id 
          name 
          chainId 
          address 
          organization { 
            id 
            name 
          } 
          proposalStats { 
            total 
            active 
          } 
        } 
      }
      pageInfo { 
        firstCursor 
        lastCursor 
        count 
      }
    }
  }
`

const PROPOSALS = /* GraphQL */ `
  query Proposals($input: ProposalsInput!) {
    proposals(input: $input) {
      nodes { 
        ... on Proposal { 
          id 
          onchainId 
          status 
          metadata { 
            title 
          } 
          start { 
            timestamp 
          } 
          end { 
            timestamp 
          } 
          votes { 
            for 
            against 
            abstain 
            quorum 
          } 
          governor { 
            id 
          } 
        } 
      }
      pageInfo { 
        firstCursor 
        lastCursor 
      }
    }
  }
`

const PROPOSAL = /* GraphQL */ `
  query Proposal($id: ID!) {
    proposal(id: $id) {
      ... on Proposal {
        id 
        onchainId 
        status 
        metadata { 
          title 
          body 
        } 
        start { 
          timestamp 
        } 
        end { 
          timestamp 
        }
        votes { 
          for 
          against 
          abstain 
          quorum 
          total 
        }
        governor { 
          id 
          name 
          chainId 
        }
      }
    }
  }
`

export function useGovernorsByOrg(organizationId: string) {
  const variables = {
    input: { 
      filters: { organizationId }, 
      page: { limit: 10 } 
    }
  }
  
  return useQuery({
    queryKey: ['tally', 'governors', organizationId],
    queryFn: () => tallyFetch(GOVERNORS, variables),
    select: (d: any) => d.governors.nodes,
    staleTime: 30000, // 30 seconds
  })
}

export function useProposalsByGovernor(governorId: string, limit = 10) {
  return useInfiniteQuery({
    queryKey: ['tally', 'proposals', governorId, { limit }],
    queryFn: ({ pageParam }) => {
      const variables = {
        input: { 
          filters: { governorId }, 
          page: { 
            limit, 
            afterCursor: pageParam ?? null 
          }, 
          sort: { 
            sortBy: 'id', 
            isDescending: true 
          } as any 
        }
      }
      return tallyFetch(PROPOSALS, variables)
    },
    getNextPageParam: (last: any) => last.proposals.pageInfo.lastCursor ?? undefined,
    select: (data: any) => data.pages.flatMap((p: any) => p.proposals.nodes),
    staleTime: 15000, // 15 seconds
  })
}

export function useProposal(id: string) {
  return useQuery({
    queryKey: ['tally', 'proposal', id],
    queryFn: () => tallyFetch(PROPOSAL, { id }),
    select: (d: any) => d.proposal,
    staleTime: 15000, // 15 seconds
  })
}
