import React, { useState } from 'react'
import { useProposal } from '../tally/useTally'
import { useGovernorWrites } from '../governance/useGovernorWrites'
import { descriptionHash } from '../governance/useGovernorWrites'
import './ProposalDetail.css'

export const ProposalDetail = ({ proposalId, onBack, governorAddress }) => {
  const { data: proposal, isLoading, error } = useProposal(proposalId)
  const [voteReason, setVoteReason] = useState('')
  const [showVoteModal, setShowVoteModal] = useState(false)
  
  const { 
    castVote, 
    castVoteWithReason, 
    queue, 
    execute, 
    isPending, 
    error: writeError 
  } = useGovernorWrites(governorAddress)
  
  if (isLoading) {
    return (
      <div className="proposal-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading proposal details...</p>
      </div>
    )
  }
  
  if (error || !proposal) {
    return (
      <div className="proposal-detail-error">
        <h2>Error Loading Proposal</h2>
        <p>{error?.message || 'Proposal not found'}</p>
        <button onClick={onBack}>Go Back</button>
      </div>
    )
  }
  
  const handleVote = async (support) => {
    if (voteReason.trim()) {
      await castVoteWithReason(BigInt(proposal.onchainId), support, voteReason)
    } else {
      await castVote(BigInt(proposal.onchainId), support)
    }
    setShowVoteModal(false)
    setVoteReason('')
  }
  
  const handleQueue = async () => {
    // This is a simplified example - you'd need the actual proposal data
    const targets = ['0x0000000000000000000000000000000000000000'] // placeholder
    const values = [BigInt(0)]
    const calldatas = ['0x']
    const hash = descriptionHash(proposal.metadata?.description || '')
    
    await queue(targets, values, calldatas, hash)
  }
  
  const handleExecute = async () => {
    // This is a simplified example - you'd need the actual proposal data
    const targets = ['0x0000000000000000000000000000000000000000'] // placeholder
    const values = [BigInt(0)]
    const calldatas = ['0x']
    const hash = descriptionHash(proposal.metadata?.description || '')
    
    await execute(targets, values, calldatas, hash)
  }
  
  const canVote = proposal.status === 'Active'
  const canQueue = proposal.status === 'Succeeded'
  const canExecute = proposal.status === 'Queued'
  
  const getStatusStep = () => {
    const steps = ['Created', 'Active', 'Succeeded', 'Queued', 'Executed']
    const currentIndex = steps.findIndex(step => 
      step.toLowerCase() === proposal.status?.toLowerCase()
    )
    return { steps, currentIndex }
  }
  
  const { steps, currentIndex } = getStatusStep()
  
  return (
    <div className="proposal-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>← Back to Proposals</button>
        <h1>Proposal #{proposal.onchainId || proposal.id.slice(-8)}</h1>
      </div>
      
      <div className="detail-content">
        <div className="proposal-main">
          <div className="proposal-title">
            <h2>{proposal.metadata?.title || 'Untitled Proposal'}</h2>
            <div className={`status-badge ${proposal.status?.toLowerCase()}`}>
              {proposal.status || 'Unknown'}
            </div>
          </div>
          
          <div className="proposal-description">
            <h3>Description</h3>
            <p>{proposal.metadata?.body || 'No description provided.'}</p>
          </div>
          
          <div className="proposal-timeline">
            <h3>Timeline</h3>
            <div className="timeline-steps">
              {steps.map((step, index) => (
                <div 
                  key={step}
                  className={`timeline-step ${index <= currentIndex ? 'completed' : ''} ${index === currentIndex ? 'current' : ''}`}
                >
                  <div className="step-indicator"></div>
                  <span className="step-label">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="proposal-sidebar">
          <div className="voting-section">
            <h3>Voting Results</h3>
            {proposal.votes && Array.isArray(proposal.votes) && (
              <div className="voting-results">
                {proposal.votes.map((vote, index) => (
                  <div key={index} className="vote-result">
                    <span className="vote-type">{vote.type}</span>
                    <span className="vote-count">{vote.votesCount || 0} votes</span>
                    <span className="vote-percent">{vote.percent || 0}%</span>
                  </div>
                ))}
              </div>
            )}
            
            {canVote && (
              <button 
                className="vote-btn"
                onClick={() => setShowVoteModal(true)}
              >
                Cast Your Vote
              </button>
            )}
          </div>
          
          <div className="actions-section">
            <h3>Actions</h3>
            {canQueue && (
              <button 
                className="action-btn queue-btn"
                onClick={handleQueue}
                disabled={isPending}
              >
                Queue Proposal
              </button>
            )}
            
            {canExecute && (
              <button 
                className="action-btn execute-btn"
                onClick={handleExecute}
                disabled={isPending}
              >
                Execute Proposal
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Vote Modal */}
      {showVoteModal && (
        <div className="vote-modal-overlay" onClick={() => setShowVoteModal(false)}>
          <div className="vote-modal" onClick={e => e.stopPropagation()}>
            <h3>Cast Your Vote</h3>
            <div className="vote-options">
              <button 
                className="vote-option for"
                onClick={() => handleVote(1)}
              >
                For
              </button>
              <button 
                className="vote-option against"
                onClick={() => handleVote(0)}
              >
                Against
              </button>
              <button 
                className="vote-option abstain"
                onClick={() => handleVote(2)}
              >
                Abstain
              </button>
            </div>
            
            <div className="vote-reason">
              <label htmlFor="vote-reason">Reason (optional):</label>
              <textarea
                id="vote-reason"
                value={voteReason}
                onChange={(e) => setVoteReason(e.target.value)}
                placeholder="Explain your vote..."
                rows={3}
              />
            </div>
            
            <button 
              className="close-modal-btn"
              onClick={() => setShowVoteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {writeError && (
        <div className="write-error">
          Error: {writeError.message}
        </div>
      )}
    </div>
  )
}
