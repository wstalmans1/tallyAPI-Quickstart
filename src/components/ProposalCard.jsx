import React from 'react'
import './ProposalCard.css'

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return '#10b981' // green
    case 'pending':
      return '#f59e0b' // yellow
    case 'succeeded':
      return '#3b82f6' // blue
    case 'queued':
      return '#8b5cf6' // purple
    case 'executed':
      return '#059669' // dark green
    case 'defeated':
      return '#ef4444' // red
    default:
      return '#6b7280' // gray
  }
}

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(parseInt(timestamp) * 1000)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const calculateVotingProgress = (votes) => {
  if (!votes || !Array.isArray(votes)) return { for: 0, against: 0, abstain: 0 }
  
  const forVote = votes.find(v => v.type === 'for')
  const againstVote = votes.find(v => v.type === 'against')
  const abstainVote = votes.find(v => v.type === 'abstain')
  
  const total = (forVote?.votesCount || 0) + (againstVote?.votesCount || 0) + (abstainVote?.votesCount || 0)
  
  if (total === 0) return { for: 0, against: 0, abstain: 0 }
  
  return {
    for: Math.round((forVote?.votesCount || 0) / total * 100),
    against: Math.round((againstVote?.votesCount || 0) / total * 100),
    abstain: Math.round((abstainVote?.votesCount || 0) / total * 100)
  }
}

export const ProposalCard = ({ proposal, onClick }) => {
  const statusColor = getStatusColor(proposal.status)
  const votingProgress = calculateVotingProgress(proposal.votes)
  const title = proposal.metadata?.title || 'Untitled Proposal'
  
  return (
    <div className="proposal-card" onClick={onClick}>
      <div className="proposal-header">
        <div className="proposal-id">
          #{proposal.onchainId || proposal.id.slice(-8)}
        </div>
        <div 
          className="proposal-status"
          style={{ backgroundColor: statusColor }}
        >
          {proposal.status || 'Unknown'}
        </div>
      </div>
      
      <div className="proposal-title">
        {title}
      </div>
      
      <div className="proposal-timeline">
        <div className="timeline-item">
          <span className="timeline-label">Start:</span>
          <span className="timeline-value">
            {formatTimestamp(proposal.start?.timestamp)}
          </span>
        </div>
        <div className="timeline-item">
          <span className="timeline-label">End:</span>
          <span className="timeline-value">
            {formatTimestamp(proposal.end?.timestamp)}
          </span>
        </div>
      </div>
      
      <div className="proposal-voting">
        <div className="voting-bars">
          <div className="voting-bar for">
            <div 
              className="voting-fill"
              style={{ width: `${votingProgress.for}%` }}
            ></div>
            <span className="voting-label">For: {votingProgress.for}%</span>
          </div>
          <div className="voting-bar against">
            <div 
              className="voting-fill"
              style={{ width: `${votingProgress.against}%` }}
            ></div>
            <span className="voting-label">Against: {votingProgress.against}%</span>
          </div>
          <div className="voting-bar abstain">
            <div 
              className="voting-fill"
              style={{ width: `${votingProgress.abstain}%` }}
            ></div>
            <span className="voting-label">Abstain: {votingProgress.abstain}%</span>
          </div>
        </div>
      </div>
      
      <div className="proposal-footer">
        <span className="click-hint">Click to view details</span>
      </div>
    </div>
  )
}
