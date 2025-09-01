import React, { useState } from 'react'
import { useGovernorWrites } from '../governance/useGovernorWrites'
import { useOrg } from '../state/org'

export const CreateProposalModal = ({ onClose }) => {
  const { governorAddress } = useOrg()
  const { propose, isPending, isConfirming, isConfirmed, error } = useGovernorWrites(governorAddress)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targets: [''],
    values: ['0'],
    calldatas: ['']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Convert values to bigint
    const values = formData.values.map(v => BigInt(v))
    
    // For now, we'll create a simple proposal
    // In a real implementation, you'd need to encode the calldatas properly
    const calldatas = formData.calldatas.map(calldata => 
      calldata.startsWith('0x') ? calldata : '0x'
    )
    
    propose(
      formData.targets.filter(t => t.trim()),
      values,
      calldatas,
      formData.description
    )
  }

  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      targets: [...prev.targets, ''],
      values: [...prev.values, '0'],
      calldatas: [...prev.calldatas, '']
    }))
  }

  const removeAction = (index) => {
    setFormData(prev => ({
      ...prev,
      targets: prev.targets.filter((_, i) => i !== index),
      values: prev.values.filter((_, i) => i !== index),
      calldatas: prev.calldatas.filter((_, i) => i !== index)
    }))
  }

  const updateAction = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  if (isConfirmed) {
    return (
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="modal-content" style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#28a745' }}>✅ Proposal Created Successfully!</h3>
          <p>Your proposal has been submitted to the blockchain.</p>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Create New Proposal</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter proposal title"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
              placeholder="Describe your proposal in detail"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Actions</label>
              <button
                type="button"
                onClick={addAction}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                + Add Action
              </button>
            </div>

            {formData.targets.map((target, index) => (
              <div key={index} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                padding: '15px', 
                marginBottom: '10px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Action {index + 1}</span>
                  {formData.targets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAction(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Target Address
                    </label>
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => updateAction(index, 'targets', e.target.value)}
                      placeholder="0x..."
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Value (ETH)
                    </label>
                    <input
                      type="text"
                      value={formData.values[index]}
                      onChange={(e) => updateAction(index, 'values', e.target.value)}
                      placeholder="0"
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                    Calldata (hex)
                  </label>
                  <input
                    type="text"
                    value={formData.calldatas[index]}
                    onChange={(e) => updateAction(index, 'calldatas', e.target.value)}
                    placeholder="0x..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '20px' 
            }}>
              Error: {error.message}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || isConfirming}
              style={{
                padding: '10px 20px',
                backgroundColor: isPending || isConfirming ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isPending || isConfirming ? 'not-allowed' : 'pointer'
              }}
            >
              {isPending ? 'Creating...' : isConfirming ? 'Confirming...' : 'Create Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}