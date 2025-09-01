import React from 'react'
import { useProposalsByOrg } from '../tally/hooks'
import { useOrg } from '../state/org'

export const ProposalsList = ({ onProposalSelect }) => {
  const { organizationId } = useOrg()
  const { data: proposals, isLoading, error } = useProposalsByOrg(organizationId)

  if (isLoading) {
    return (
      <div className="proposals-loading">
        <div className="loading-spinner"></div>
        <p>Loading proposals...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="proposals-error">
        <h3>Error Loading Proposals</h3>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="proposals-empty">
        <h3>No Proposals Found</h3>
        <p>This governor doesn't have any proposals yet.</p>
      </div>
    )
  }

  return (
    <div className="proposals-list">
      <h3>Proposals ({proposals.length})</h3>
      <div className="proposals-grid">
        {proposals.map((proposal) => (
          <div 
            key={proposal.id} 
            className="proposal-card"
            onClick={() => onProposalSelect(proposal.id)}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              margin: '10px 0',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e9ecef'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f8f9fa'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <div className="proposal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h4 style={{ margin: 0, color: '#007bff' }}>{proposal.metadata?.title || 'Untitled Proposal'}</h4>
              <span 
                className={`status-badge status-${proposal.status?.toLowerCase()}`}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: proposal.status === 'ACTIVE' ? '#28a745' : 
                                 proposal.status === 'SUCCEEDED' ? '#007bff' :
                                 proposal.status === 'DEFEATED' ? '#dc3545' :
                                 proposal.status === 'EXECUTED' ? '#6c757d' : '#ffc107',
                  color: 'white'
                }}
              >
                {proposal.status}
              </span>
            </div>
            
            <p style={{ margin: '10px 0', color: '#666', fontSize: '14px' }}>
              Proposal ID: {proposal.onchainId || proposal.id}
            </p>
            
            <div className="proposal-stats" style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#666' }}>
              {proposal.voteStats?.map((vote, index) => (
                <span key={index}>
                  {vote.type}: {vote.votesCount} ({vote.percent?.toFixed(1)}%)
                </span>
              ))}
            </div>
            
            <div className="proposal-meta" style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>
              <span>Governor: {proposal.governor?.name || 'Unknown'}</span>
              {proposal.metadata?.eta && (
                <span style={{ marginLeft: '20px' }}>
                  ETA: {new Date(proposal.metadata.eta * 1000).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}