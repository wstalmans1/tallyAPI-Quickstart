import { useEffect } from 'react'
import { usePublicClient, useWatchContractEvent } from 'wagmi'
import { useInvalidateTallyQueries } from '../tally/hooks'

// OpenZeppelin Governor ABI events
const GOVERNOR_ABI = [
  {
    type: 'event',
    name: 'ProposalCreated',
    inputs: [
      { name: 'proposalId', type: 'uint256', indexed: false },
      { name: 'proposer', type: 'address', indexed: false },
      { name: 'targets', type: 'address[]', indexed: false },
      { name: 'values', type: 'uint256[]', indexed: false },
      { name: 'signatures', type: 'string[]', indexed: false },
      { name: 'calldatas', type: 'bytes[]', indexed: false },
      { name: 'startBlock', type: 'uint256', indexed: false },
      { name: 'endBlock', type: 'uint256', indexed: false },
      { name: 'description', type: 'string', indexed: false }
    ]
  },
  {
    type: 'event',
    name: 'VoteCast',
    inputs: [
      { name: 'voter', type: 'address', indexed: true },
      { name: 'proposalId', type: 'uint256', indexed: false },
      { name: 'support', type: 'uint8', indexed: false },
      { name: 'weight', type: 'uint256', indexed: false },
      { name: 'reason', type: 'string', indexed: false }
    ]
  },
  {
    type: 'event',
    name: 'ProposalExecuted',
    inputs: [
      { name: 'proposalId', type: 'uint256', indexed: false }
    ]
  },
  {
    type: 'event',
    name: 'ProposalQueued',
    inputs: [
      { name: 'proposalId', type: 'uint256', indexed: false },
      { name: 'eta', type: 'uint256', indexed: false }
    ]
  }
] as const

export const useGovernorEvents = (governorAddress: string) => {
  const { invalidateProposals, invalidateProposal, invalidateVotes } = useInvalidateTallyQueries()
  
  // Temporarily disabled to reduce console errors
  // TODO: Re-enable when proper RPC endpoints are configured
  if (false) {
    // Watch for proposal creation
  useWatchContractEvent({
    address: governorAddress && governorAddress.length >= 10 ? governorAddress as `0x${string}` : undefined,
    abi: GOVERNOR_ABI,
    eventName: 'ProposalCreated',
    onLogs: (logs) => {
      console.log('ProposalCreated event:', logs)
      // Invalidate proposals list to refetch with new proposal
      logs.forEach(log => {
        const chainId = log.chainId?.toString()
        if (chainId) {
          invalidateProposals(chainId, governorAddress)
        }
      })
    },
  })

  // Watch for votes
  useWatchContractEvent({
    address: governorAddress && governorAddress.length >= 10 ? governorAddress as `0x${string}` : undefined,
    abi: GOVERNOR_ABI,
    eventName: 'VoteCast',
    onLogs: (logs) => {
      console.log('VoteCast event:', logs)
      // Invalidate specific proposal and votes
      logs.forEach(log => {
        const chainId = log.chainId?.toString()
        const proposalId = log.args.proposalId?.toString()
        if (chainId && proposalId) {
          invalidateProposal(chainId, proposalId)
          invalidateVotes(chainId, proposalId)
        }
      })
    },
  })

  // Watch for proposal execution
  useWatchContractEvent({
    address: governorAddress && governorAddress.length >= 10 ? governorAddress as `0x${string}` : undefined,
    abi: GOVERNOR_ABI,
    eventName: 'ProposalExecuted',
    onLogs: (logs) => {
      console.log('ProposalExecuted event:', logs)
      // Invalidate proposals list and specific proposal
      logs.forEach(log => {
        const chainId = log.chainId?.toString()
        const proposalId = log.args.proposalId?.toString()
        if (chainId && proposalId) {
          invalidateProposals(chainId, governorAddress)
          invalidateProposal(chainId, proposalId)
        }
      })
    },
  })

  // Watch for proposal queuing
  useWatchContractEvent({
    address: governorAddress && governorAddress.length >= 10 ? governorAddress as `0x${string}` : undefined,
    abi: GOVERNOR_ABI,
    eventName: 'ProposalQueued',
    onLogs: (logs) => {
      console.log('ProposalQueued event:', logs)
      // Invalidate specific proposal to update status
      logs.forEach(log => {
        const chainId = log.chainId?.toString()
        const proposalId = log.args.proposalId?.toString()
        if (chainId && proposalId) {
          invalidateProposal(chainId, proposalId)
        }
      })
    },
  })
  }
}