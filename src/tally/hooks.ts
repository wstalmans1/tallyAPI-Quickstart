import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tallyClient } from './client'
import { 
  GET_GOVERNORS_BY_ORG, 
  GET_PROPOSALS_BY_ORG, 
  GET_PROPOSAL_DETAIL,
  GET_DELEGATES 
} from './queries'

// Query keys following the recommended pattern
export const tallyKeys = {
  all: ['tally'] as const,
  governors: (chainId: string, governorId?: string) => 
    [...tallyKeys.all, 'governor', chainId, governorId] as const,
  proposals: (chainId: string, governorId: string, filters?: any) => 
    [...tallyKeys.all, 'proposals', chainId, governorId, filters] as const,
  proposal: (chainId: string, proposalId: string) => 
    [...tallyKeys.all, 'proposal', chainId, proposalId] as const,
  delegates: (chainId: string, governorId: string, filters?: any) => 
    [...tallyKeys.all, 'delegates', chainId, governorId, filters] as const,
  votes: (chainId: string, proposalId: string, page?: number) => 
    [...tallyKeys.all, 'votes', chainId, proposalId, page] as const,
}

// Hooks for data fetching
export const useGovernorsByOrg = (organizationId: string) => {
  return useQuery({
    queryKey: tallyKeys.governors('', organizationId),
    queryFn: async () => {
      console.log('Fetching governors for organization ID:', organizationId)
      
      const input = {
        filters: {
          organizationId: organizationId,
        },
        page: { limit: 20 },
        sort: { sortBy: "id", isDescending: true },
      }
      
      console.log('Query input:', input)
      
      const result = await tallyClient.request(GET_GOVERNORS_BY_ORG, { input })
      console.log('Governors API response:', result)
      console.log('Full response structure:', JSON.stringify(result, null, 2))
      return result
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: any) => {
      console.log('Processing governors data:', data)
      const governors = data.governors?.nodes || []
      console.log('Extracted governors:', governors)
      // Transform the data to include the governor address for easier access
      return governors.map((governor: any) => ({
        ...governor,
        address: governor.contracts?.governor?.address, // Extract governor contract address
        governorAddress: governor.contracts?.governor?.address // Alias for compatibility
      }))
    }
  })
}

export const useProposalsByOrg = (organizationId: string) => {
  return useQuery({
    queryKey: tallyKeys.proposals('', organizationId),
    queryFn: async () => {
      console.log('Fetching proposals for organization ID:', organizationId)
      
      const input = {
        filters: {
          organizationId: organizationId,
        },
        page: { limit: 20 },
        sort: { sortBy: "id", isDescending: true },
      }
      
      console.log('Proposals query input:', input)
      
      const result = await tallyClient.request(GET_PROPOSALS_BY_ORG, { input })
      console.log('Proposals API response:', result)
      return result
    },
    enabled: !!organizationId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (data: any) => {
      console.log('Processing proposals data:', data)
      const proposals = data.proposals?.nodes || []
      console.log('Extracted proposals:', proposals)
      return proposals
    }
  })
}

export const useProposalDetail = (proposalId: string, chainId: string) => {
  return useQuery({
    queryKey: tallyKeys.proposal(chainId, proposalId),
    queryFn: async () => {
      console.log('Fetching proposal detail for ID:', proposalId)
      
      const input = {
        id: proposalId
      }
      
      console.log('Proposal detail query input:', input)
      
      const result = await tallyClient.request(GET_PROPOSAL_DETAIL, { input })
      console.log('Proposal detail API response:', result)
      return result
    },
    enabled: !!proposalId && !!chainId,
    staleTime: 1 * 60 * 1000, // 1 minute
    select: (data: any) => {
      console.log('Processing proposal detail data:', data)
      const proposal = data.proposal
      console.log('Extracted proposal:', proposal)
      return proposal
    }
  })
}

export const useDelegates = (
  governorId: string, 
  chainId: string,
  options: { first?: number; skip?: number } = {}
) => {
  return useQuery({
    queryKey: tallyKeys.delegates(chainId, governorId, options),
    queryFn: () => tallyClient.request(GET_DELEGATES, {
      governorId,
      first: options.first || 20,
      skip: options.skip || 0,
    }),
    enabled: !!governorId && !!chainId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data: any) => data.delegates || []
  })
}

// Mutation for invalidating queries after on-chain events
export const useInvalidateTallyQueries = () => {
  const queryClient = useQueryClient()
  
  return {
    invalidateProposals: (chainId: string, governorId: string) => {
      queryClient.invalidateQueries({
        queryKey: tallyKeys.proposals(chainId, governorId)
      })
    },
    invalidateProposal: (chainId: string, proposalId: string) => {
      queryClient.invalidateQueries({
        queryKey: tallyKeys.proposal(chainId, proposalId)
      })
    },
    invalidateVotes: (chainId: string, proposalId: string) => {
      queryClient.invalidateQueries({
        queryKey: tallyKeys.votes(chainId, proposalId)
      })
    },
    invalidateAll: () => {
      queryClient.invalidateQueries({
        queryKey: tallyKeys.all
      })
    }
  }
}
