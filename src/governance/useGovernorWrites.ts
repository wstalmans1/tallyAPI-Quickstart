import { useWriteContract } from 'wagmi'
import { parseAbi, type Hex } from 'viem'

const governorAbi = parseAbi([
  'function propose(address[] targets,uint256[] values,bytes[] calldatas,string description) returns (uint256)',
  'function castVote(uint256 proposalId,uint8 support) returns (uint256)',
  'function castVoteWithReason(uint256 proposalId,uint8 support,string reason) returns (uint256)',
  'function queue(address[] targets,uint256[] values,bytes[] calldatas,bytes32 descriptionHash)',
  'function execute(address[] targets,uint256[] values,bytes[] calldatas,bytes32 descriptionHash) payable'
])

export function useGovernorWrites(governorAddress: `0x${string}`) {
  const { writeContract, data, isPending, error } = useWriteContract()

  return {
    propose: (targets: `0x${string}`[], values: bigint[], calldatas: Hex[], description: string) =>
      writeContract({ 
        address: governorAddress, 
        abi: governorAbi, 
        functionName: 'propose', 
        args: [targets, values, calldatas, description] 
      }),
    
    castVote: (proposalId: bigint, support: 0|1|2) =>
      writeContract({ 
        address: governorAddress, 
        abi: governorAbi, 
        functionName: 'castVote', 
        args: [proposalId, support] 
      }),
    
    castVoteWithReason: (proposalId: bigint, support: 0|1|2, reason: string) =>
      writeContract({ 
        address: governorAddress, 
        abi: governorAbi, 
        functionName: 'castVoteWithReason', 
        args: [proposalId, support, reason] 
      }),
    
    queue: (targets: `0x${string}`[], values: bigint[], calldatas: Hex[], descriptionHash: Hex) =>
      writeContract({ 
        address: governorAddress, 
        abi: governorAbi, 
        functionName: 'queue', 
        args: [targets, values, calldatas, descriptionHash] 
      }),
    
    execute: (targets: `0x${string}`[], values: bigint[], calldatas: Hex[], descriptionHash: Hex) =>
      writeContract({ 
        address: governorAddress, 
        abi: governorAbi, 
        functionName: 'execute', 
        args: [targets, values, calldatas, descriptionHash] 
      }),
    
    data, 
    isPending, 
    error
  }
}

// Helper function to compute descriptionHash for queue/execute
export const descriptionHash = (description: string): Hex => {
  const { keccak256, toBytes } = require('viem')
  return keccak256(toBytes(description))
}
