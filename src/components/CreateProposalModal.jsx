import React, { useState } from 'react'
import { useGovernorWrites } from '../governance/useGovernorWrites'
import { parseAbi, encodeFunctionData } from 'viem'
import './CreateProposalModal.css'

export const CreateProposalModal = ({ onClose, governorAddress }) => {
  const [proposalData, setProposalData] = useState({
    description: '',
    actions: [{ target: '', value: '0', functionName: '', args: '' }]
  })
  
  const { propose, isPending, error } = useGovernorWrites(governorAddress)
  
  const addAction = () => {
    setProposalData(prev => ({
      ...prev,
      actions: [...prev.actions, { target: '', value: '0', functionName: '', args: '' }]
    }))
  }
  
  const removeAction = (index) => {
    setProposalData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }))
  }
  
  const updateAction = (index, field, value) => {
    setProposalData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => 
        i === index ? { ...action, [field]: value } : action
      )
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!proposalData.description.trim()) {
      alert('Please enter a proposal description')
      return
    }
    
    // Validate actions
    const validActions = proposalData.actions.filter(action => 
      action.target && action.target.startsWith('0x') && action.target.length === 42
    )
    
    if (validActions.length === 0) {
      alert('Please add at least one valid action with a target address')
      return
    }
    
    try {
      // Prepare proposal data
              const targets = validActions.map(action => action.target)
      const values = validActions.map(action => BigInt(action.value || '0'))
      const calldatas = validActions.map(action => {
        if (action.functionName && action.args) {
          try {
            // This is a simplified example - in practice you'd need proper ABI handling
            const abi = parseAbi([`function ${action.functionName}`])
            return encodeFunctionData({
              abi,
              functionName: action.functionName,
              args: action.args.split(',').map(arg => arg.trim())
            })
          } catch (error) {
            console.error('Error encoding function data:', error)
            return '0x' // fallback to empty calldata
          }
        }
        return '0x' // empty calldata for simple value transfers
      })
      
      // Submit proposal
      await propose(targets, values, calldatas, proposalData.description)
      
      // Close modal on success
      onClose()
      
    } catch (error) {
      console.error('Error creating proposal:', error)
      alert('Failed to create proposal: ' + error.message)
    }
  }
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Proposal</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="proposal-form">
          <div className="form-group">
            <label htmlFor="description">Proposal Description</label>
            <textarea
              id="description"
              value={proposalData.description}
              onChange={(e) => setProposalData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this proposal will do..."
              rows={4}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Actions</label>
            <div className="actions-list">
              {proposalData.actions.map((action, index) => (
                <div key={index} className="action-item">
                  <div className="action-header">
                    <span>Action {index + 1}</span>
                    {proposalData.actions.length > 1 && (
                      <button
                        type="button"
                        className="remove-action-btn"
                        onClick={() => removeAction(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="action-inputs">
                    <input
                      type="text"
                      placeholder="Target contract address (0x...)"
                      value={action.target}
                      onChange={(e) => updateAction(index, 'target', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Value in ETH (0 for function calls)"
                      value={action.value}
                      onChange={(e) => updateAction(index, 'value', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Function name (optional)"
                      value={action.functionName}
                      onChange={(e) => updateAction(index, 'functionName', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Function arguments (comma-separated)"
                      value={action.args}
                      onChange={(e) => updateAction(index, 'args', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className="add-action-btn"
              onClick={addAction}
            >
              + Add Action
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              Error: {error.message}
            </div>
          )}
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isPending || !proposalData.description.trim()}
            >
              {isPending ? 'Creating Proposal...' : 'Create Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
