import React, { useState } from 'react'
import { useProposalDetail } from '../tally/hooks'
import { useOrg } from '../state/org'
import { useGovernorWrites } from '../governance/useGovernorWrites'
import { getBlockExplorerUrl } from '../utils/blockExplorer'

export const ProposalDetail = ({ proposalId, onBack, governorAddress }) => {
  const { chainId } = useOrg()
  const { data: proposal, isLoading, error } = useProposalDetail(proposalId, chainId)
  const { castVoteWithReason, isPending, isConfirming } = useGovernorWrites(governorAddress)
  
  const [voteReason, setVoteReason] = useState('')
  const [selectedSupport, setSelectedSupport] = useState(null)

  const handleVote = (support) => {
    if (!proposalId) return
    
    castVoteWithReason(
      BigInt(proposalId),
      support,
      voteReason || 'No reason provided'
    )
  }

  if (isLoading) {
    return (
      <div className="proposal-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading proposal details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="proposal-detail-error">
        <h3>Error Loading Proposal</h3>
        <p>{error.message}</p>
        <button onClick={onBack}>Back to Proposals</button>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="proposal-detail-not-found">
        <h3>Proposal Not Found</h3>
        <p>The requested proposal could not be found.</p>
        <button onClick={onBack}>Back to Proposals</button>
      </div>
    )
  }

  const proposalData = proposal

  return (
    <div className="proposal-detail" style={{ padding: '20px' }}>
      <div className="proposal-header" style={{ marginBottom: '20px' }}>
        <button 
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          ← Back to Proposals
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, color: '#007bff' }}>{proposalData.metadata?.title || 'Untitled Proposal'}</h1>
          <span 
            className={`status-badge status-${proposalData.status?.toLowerCase()}`}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: proposalData.status === 'ACTIVE' ? '#28a745' : 
                             proposalData.status === 'SUCCEEDED' ? '#007bff' :
                             proposalData.status === 'DEFEATED' ? '#dc3545' :
                             proposalData.status === 'EXECUTED' ? '#6c757d' : '#ffc107',
              color: 'white'
            }}
          >
            {proposalData.status}
          </span>
        </div>
      </div>

      <div className="proposal-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div className="proposal-main">
          <div className="proposal-description" style={{ marginBottom: '30px' }}>
            <h3>Description</h3>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6'
            }}>
              {proposalData.metadata?.description || 'No description provided'}
            </div>
          </div>

          <div className="proposal-info" style={{ marginBottom: '30px' }}>
            <h3>Proposal Information</h3>
            <div style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px', 
              backgroundColor: '#f8f9fa'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <strong>Governor:</strong>
                  <div style={{ fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>
                    {proposalData.governor?.contracts?.governor?.address ? (
                      <a 
                        href={getBlockExplorerUrl(proposalData.governor.chainId, proposalData.governor.contracts.governor.address, 'address')}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {proposalData.governor.contracts.governor.address}
                      </a>
                    ) : 'Unknown'}
                  </div>
                </div>
                <div>
                  <strong>Chain:</strong>
                  <div>{proposalData.governor?.chainId || 'Unknown'}</div>
                </div>
                <div>
                  <strong>Organization:</strong>
                  <div>{proposalData.organization?.name || 'Unknown'}</div>
                </div>
                <div>
                  <strong>Status:</strong>
                  <div style={{ 
                    color: proposalData.status === 'ACTIVE' ? '#28a745' : 
                           proposalData.status === 'SUCCEEDED' ? '#007bff' :
                           proposalData.status === 'DEFEATED' ? '#dc3545' : '#ffc107',
                    fontWeight: 'bold'
                  }}>
                    {proposalData.status}
                  </div>
                </div>
                {proposalData.governor?.token && (
                  <div>
                    <strong>Token:</strong>
                    <div style={{ fontSize: '14px' }}>
                      {proposalData.governor.token.symbol} ({proposalData.governor.token.name})
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
                      {proposalData.governor.token.id.includes('/erc721:') ? (
                        <a 
                          href={getBlockExplorerUrl(proposalData.governor.chainId, proposalData.governor.token.id.split('/erc721:')[1], 'token')}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#007bff', textDecoration: 'none' }}
                          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                          {proposalData.governor.token.id}
                        </a>
                      ) : (
                        proposalData.governor.token.id
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        <div className="proposal-sidebar">
          <div className="proposal-stats" style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0 }}>Voting Results</h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {proposalData.voteStats?.map((vote, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{vote.type}:</span>
                  <strong style={{ 
                    color: vote.type === 'FOR' ? '#28a745' : 
                           vote.type === 'AGAINST' ? '#dc3545' : '#ffc107'
                  }}>
                    {vote.votesCount} ({vote.percent?.toFixed(1)}%)
                  </strong>
                </div>
              )) || (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>For:</span>
                    <strong style={{ color: '#28a745' }}>0</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Against:</span>
                    <strong style={{ color: '#dc3545' }}>0</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Abstain:</span>
                    <strong style={{ color: '#ffc107' }}>0</strong>
                  </div>
                </>
              )}
            </div>
          </div>

          {proposalData.status === 'ACTIVE' && (
            <div className="voting-section" style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px',
              backgroundColor: 'white'
            }}>
              <h3 style={{ marginTop: 0 }}>Cast Your Vote</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Vote
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setSelectedSupport(1)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: selectedSupport === 1 ? '2px solid #28a745' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: selectedSupport === 1 ? '#28a745' : 'white',
                      color: selectedSupport === 1 ? 'white' : '#28a745',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    FOR
                  </button>
                  <button
                    onClick={() => setSelectedSupport(0)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: selectedSupport === 0 ? '2px solid #dc3545' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: selectedSupport === 0 ? '#dc3545' : 'white',
                      color: selectedSupport === 0 ? 'white' : '#dc3545',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    AGAINST
                  </button>
                  <button
                    onClick={() => setSelectedSupport(2)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: selectedSupport === 2 ? '2px solid #ffc107' : '1px solid #ddd',
                      borderRadius: '6px',
                      backgroundColor: selectedSupport === 2 ? '#ffc107' : 'white',
                      color: selectedSupport === 2 ? 'white' : '#ffc107',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    ABSTAIN
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Reason (optional)
                </label>
                <textarea
                  value={voteReason}
                  onChange={(e) => setVoteReason(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Explain your vote..."
                />
              </div>

              <button
                onClick={() => handleVote(selectedSupport)}
                disabled={selectedSupport === null || isPending || isConfirming}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: selectedSupport === null || isPending || isConfirming ? '#6c757d' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: selectedSupport === null || isPending || isConfirming ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isPending ? 'Submitting...' : isConfirming ? 'Confirming...' : 'Cast Vote'}
              </button>
            </div>
          )}

          <div className="proposal-meta" style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3 style={{ marginTop: 0 }}>Proposal Details</h3>
            <div style={{ display: 'grid', gap: '10px', fontSize: '14px' }}>
              <div>
                <strong>Proposal ID:</strong>
                <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {proposalData.onchainId || proposalData.id}
                </div>
              </div>
              <div>
                <strong>Governor:</strong>
                <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {proposalData.governor?.contracts?.governor?.address ? (
                    <a 
                      href={getBlockExplorerUrl(proposalData.governor.chainId, proposalData.governor.contracts.governor.address, 'address')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      {proposalData.governor.contracts.governor.address}
                    </a>
                  ) : 'Unknown'}
                </div>
              </div>
              <div>
                <strong>Organization:</strong>
                <div>{proposalData.organization?.name || 'Unknown'}</div>
              </div>
              {proposalData.governor?.token && (
                <div>
                  <strong>Token:</strong>
                  <div>{proposalData.governor.token.symbol} ({proposalData.governor.token.name})</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
                    {proposalData.governor.token.id.includes('/erc721:') ? (
                      <a 
                        href={getBlockExplorerUrl(proposalData.governor.chainId, proposalData.governor.token.id.split('/erc721:')[1], 'token')}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {proposalData.governor.token.id}
                      </a>
                    ) : (
                      proposalData.governor.token.id
                    )}
                  </div>
                </div>
              )}

              {proposalData.createdAt && (
                <div>
                  <strong>Created:</strong>
                  <div>{new Date(proposalData.createdAt).toLocaleString()}</div>
                </div>
              )}
              {proposalData.metadata?.eta && (
                <div>
                  <strong>Execution ETA:</strong>
                  <div>{new Date(proposalData.metadata.eta * 1000).toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}