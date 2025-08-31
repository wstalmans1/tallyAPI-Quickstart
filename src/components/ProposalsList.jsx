import React from 'react'
import { useProposalsByGovernor } from '../tally/useTally'
import { ProposalCard } from './ProposalCard'
import './ProposalsList.css'

export const ProposalsList = ({ governorId, onProposalSelect }) => {
  const { 
    data: proposals, 
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useProposalsByGovernor(governorId, 10)
  
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
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }
  
  if (!proposals || proposals.length === 0) {
    return (
      <div className="proposals-empty">
        <h3>No Proposals Found</h3>
        <p>This governor doesn't have any proposals yet.</p>
        <p>Be the first to create a proposal!</p>
      </div>
    )
  }
  
  return (
    <div className="proposals-list">
      <div className="proposals-header">
        <h2>Proposals</h2>
        <div className="proposals-count">
          {proposals.length} proposal{proposals.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="proposals-grid">
        {proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onClick={() => onProposalSelect(proposal.id)}
          />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Proposals'}
          </button>
        </div>
      )}
    </div>
  )
}
