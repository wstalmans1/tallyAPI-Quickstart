import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useOrg, initializeOrg } from '../state/org'
import { useGovernorsByOrg } from '../tally/hooks'
import { useGovernorEvents } from '../realtime/useGovernorEvents'
import { useGovernorWrites } from '../governance/useGovernorWrites'
import { ProposalsList } from './ProposalsList'
import { CreateProposalModal } from './CreateProposalModal'
import { ProposalDetail } from './ProposalDetail'
import { getBlockExplorerUrl, getChainName } from '../utils/blockExplorer'
import './TallyInterface.css'

export const TallyInterface = () => {
  const { organizationId, governorAddress, governorId } = useOrg()
  const { address, isConnected } = useAccount()
  const [selectedProposalId, setSelectedProposalId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  
  // Initialize organization state
  useEffect(() => {
    initializeOrg()
  }, [])
  
  // Set up real-time events
  useGovernorEvents(governorAddress)
  
  // Fetch governors for this organization
  const { data: governors, isLoading: governorsLoading, error: governorsError } = useGovernorsByOrg(organizationId)
  
  // Set governor ID when governors are loaded
  useEffect(() => {
    if (governors && governors.length > 0) {
      useOrg.getState().setOrg({ governorId: governors[0].id })
    }
  }, [governors])
  
  if (governorsLoading) {
    return (
      <div className="tally-loading">
        <div className="loading-spinner"></div>
        <p>Loading organization data...</p>
      </div>
    )
  }
  
  if (governorsError) {
    return (
      <div className="tally-error">
        <h2>Error Loading Organization</h2>
        <p>{governorsError.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }
  
  if (!governors || governors.length === 0) {
    return (
      <div className="tally-no-governors">
        <h2>No Governors Found</h2>
        <p>This organization doesn't have any governors configured.</p>
        <p>Organization ID: {organizationId}</p>
      </div>
    )
  }
  
  const governor = governors[0]
  
  return (
    <div className="tally-interface">
      {/* Organization Header */}
      <div className="org-header">
        <div className="org-info">
          <h1>{governor.organization?.name || 'DAO Organization'}</h1>
          <div className="org-meta">
            <span className="chain-badge">
              {getChainName(governor.chainId)}
            </span>
            <span className="governor-address">
              Governor: {governor.address ? (
                <a 
                  href={getBlockExplorerUrl(governor.chainId, governor.address, 'address')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    fontFamily: 'monospace',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {`${governor.address.slice(0, 6)}...${governor.address.slice(-4)}`}
                </a>
              ) : 'N/A'}
            </span>
          </div>
        </div>
        
        <div className="org-stats">
          <div className="stat">
            <span className="stat-value">{governor.proposalStats?.total || 0}</span>
            <span className="stat-label">Total Proposals</span>
          </div>
          <div className="stat">
            <span className="stat-value">{governor.proposalStats?.active || 0}</span>
            <span className="stat-label">Active Proposals</span>
          </div>
        </div>
        
        <div className="wallet-section">
          <ConnectButton />
          {isConnected && (
            <button 
              className="create-proposal-btn"
              onClick={() => setShowCreateModal(true)}
            >
              Create Proposal
            </button>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="tally-content">
        {selectedProposalId ? (
          <ProposalDetail 
            proposalId={selectedProposalId}
            onBack={() => setSelectedProposalId(null)}
            governorAddress={governorAddress}
          />
        ) : (
          <ProposalsList 
            governorId={governorId}
            onProposalSelect={setSelectedProposalId}
          />
        )}
      </div>
      
      {/* Create Proposal Modal */}
      {showCreateModal && (
        <CreateProposalModal
          onClose={() => setShowCreateModal(false)}
          governorAddress={governorAddress}
        />
      )}
    </div>
  )
}