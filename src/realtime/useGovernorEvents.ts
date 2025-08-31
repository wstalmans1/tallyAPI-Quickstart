import { useEffect } from 'react'
import { createPublicClient, webSocket, parseAbiItem } from 'viem'
import { useQueryClient } from '@tanstack/react-query'
import { defineChain } from 'viem/utils'

const chainId = Number(import.meta.env.VITE_CHAIN_ID) || 11155111
const ws = import.meta.env.VITE_RPC_WS as string

export function useGovernorEvents(governorAddress: `0x${string}`) {
  const qc = useQueryClient()
  
  useEffect(() => {
    if (!governorAddress || !ws) return
    
    const client = createPublicClient({ 
      chain: defineChain({ 
        id: chainId, 
        name: 'AppChain', 
        nativeCurrency: { 
          name: 'ETH', 
          symbol: 'ETH', 
          decimals: 18 
        }, 
        rpcUrls: { 
          default: { 
            http: [], 
            webSocket: [ws] 
          } 
        } 
      }), 
      transport: webSocket(ws) 
    })
    
    const unsub1 = client.watchContractEvent({
      address: governorAddress,
      abi: [parseAbiItem('event ProposalCreated(uint256 id,address proposer,address[] targets,uint256[] values,string[] signatures,bytes[] calldatas,uint256 startBlock,uint256 endBlock,string description)')],
      onLogs: () => qc.invalidateQueries({ 
        queryKey: ['tally', 'proposals', governorAddress], 
        exact: false 
      })
    })
    
    const unsub2 = client.watchContractEvent({
      address: governorAddress,
      abi: [parseAbiItem('event VoteCast(address voter,uint256 proposalId,uint8 support,uint256 weight,string reason)')],
      onLogs: (logs) => {
        const pid = logs[0]?.args?.proposalId?.toString?.()
        if (pid) qc.invalidateQueries({ 
          queryKey: ['tally', 'proposal'], 
          predicate: (q: any) => q.queryKey.includes(pid) as boolean 
        })
      }
    })
    
    const unsub3 = client.watchContractEvent({
      address: governorAddress,
      abi: [parseAbiItem('event ProposalQueued(uint256 id,uint256 eta)')],
      onLogs: () => qc.invalidateQueries({ 
        queryKey: ['tally', 'proposal'], 
        exact: false 
      })
    })
    
    const unsub4 = client.watchContractEvent({
      address: governorAddress,
      abi: [parseAbiItem('event ProposalExecuted(uint256 id)')],
      onLogs: () => {
        qc.invalidateQueries({ 
          queryKey: ['tally', 'proposal'], 
          exact: false 
        })
        qc.invalidateQueries({ 
          queryKey: ['tally', 'proposals', governorAddress], 
          exact: false 
        })
      }
    })
    
    return () => { 
      unsub1?.(); 
      unsub2?.(); 
      unsub3?.(); 
      unsub4?.() 
    }
  }, [governorAddress, qc])
}
