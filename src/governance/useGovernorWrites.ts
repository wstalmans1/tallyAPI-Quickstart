import { useEffect } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useInvalidateTallyQueries } from '../tally/hooks'

// OpenZeppelin Governor ABI for write functions
const GOVERNOR_ABI = [
  {
    type: 'function',
    name: 'propose',
    inputs: [
      { name: 'targets', type: 'address[]' },
      { name: 'values', type: 'uint256[]' },
      { name: 'calldatas', type: 'bytes[]' },
      { name: 'description', type: 'string' }
    ],
    outputs: [{ name: 'proposalId', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'castVote',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'uint8' }
    ],
    outputs: [{ name: 'weight', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'castVoteWithReason',
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'uint8' },
      { name: 'reason', type: 'string' }
    ],
    outputs: [{ name: 'weight', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      { name: 'targets', type: 'address[]' },
      { name: 'values', type: 'uint256[]' },
      { name: 'calldatas', type: 'bytes[]' },
      { name: 'descriptionHash', type: 'bytes32' }
    ],
    outputs: [{ name: 'proposalId', type: 'uint256' }],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'queue',
    inputs: [
      { name: 'targets', type: 'address[]' },
      { name: 'values', type: 'uint256[]' },
      { name: 'calldatas', type: 'bytes[]' },
      { name: 'descriptionHash', type: 'bytes32' }
    ],
    outputs: [{ name: 'proposalId', type: 'uint256' }],
    stateMutability: 'nonpayable'
  }
] as const

export const useGovernorWrites = (governorAddress: string) => {
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { invalidateProposals, invalidateProposal } = useInvalidateTallyQueries()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Invalidate queries after successful transaction
  useEffect(() => {
    if (isConfirmed && hash) {
      // Get chain ID from the transaction receipt
      // For now, we'll invalidate all queries as a fallback
      invalidateProposals('', governorAddress)
    }
  }, [isConfirmed, hash, governorAddress, invalidateProposals])

  const propose = (targets: string[], values: bigint[], calldatas: string[], description: string) => {
    writeContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'propose',
      args: [targets, values, calldatas, description],
    })
  }

  const castVote = (proposalId: bigint, support: number) => {
    writeContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'castVote',
      args: [proposalId, support],
    })
  }

  const castVoteWithReason = (proposalId: bigint, support: number, reason: string) => {
    writeContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'castVoteWithReason',
      args: [proposalId, support, reason],
    })
  }

  const execute = (targets: string[], values: bigint[], calldatas: string[], descriptionHash: string) => {
    writeContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'execute',
      args: [targets, values, calldatas, descriptionHash],
    })
  }

  const queue = (targets: string[], values: bigint[], calldatas: string[], descriptionHash: string) => {
    writeContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'queue',
      args: [targets, values, calldatas, descriptionHash],
    })
  }

  return {
    propose,
    castVote,
    castVoteWithReason,
    execute,
    queue,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  }
}