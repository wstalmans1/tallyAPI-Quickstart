import { useState } from "react";
import "./App.css";

export const InteractiveDAO = ({ organizationId }) => {
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalType, setProposalType] = useState("transfer");

  const handleCreateProposal = async () => {
    if (!proposalTitle.trim()) {
      alert("Please enter a proposal title");
      return;
    }

    setIsCreatingProposal(true);
    
    try {
      // This would be the actual API call to create a proposal
      // For now, we'll simulate it
      console.log("Creating proposal:", {
        organizationId,
        title: proposalTitle,
        description: proposalDescription,
        type: proposalType
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert("Proposal created successfully! (This is a demo)");
      setProposalTitle("");
      setProposalDescription("");
      setIsCreatingProposal(false);
      
    } catch (error) {
      console.error("Error creating proposal:", error);
      alert("Failed to create proposal");
      setIsCreatingProposal(false);
    }
  };

  return (
    <div className="governorList">
      <h2>Interactive DAO Features</h2>
      
      <div style={{ 
        border: "1px solid #e2e8f0", 
        borderRadius: "8px", 
        padding: "20px", 
        marginBottom: "20px",
        backgroundColor: "#f8fafc"
      }}>
        <h3>Create New Proposal</h3>
        <p>Use this form to create a new governance proposal for your DAO.</p>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Proposal Title:
          </label>
          <input
            type="text"
            value={proposalTitle}
            onChange={(e) => setProposalTitle(e.target.value)}
            placeholder="e.g., Transfer 1000 tokens to treasury"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Description:
          </label>
          <textarea
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            placeholder="Describe what this proposal will do..."
            rows="3"
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
              resize: "vertical"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Proposal Type:
          </label>
          <select
            value={proposalType}
            onChange={(e) => setProposalType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            <option value="transfer">Token Transfer</option>
            <option value="parameter">Parameter Change</option>
            <option value="upgrade">Contract Upgrade</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <button
          onClick={handleCreateProposal}
          disabled={isCreatingProposal || !proposalTitle.trim()}
          style={{
            backgroundColor: isCreatingProposal ? "#9ca3af" : "#3b82f6",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: isCreatingProposal ? "not-allowed" : "pointer",
            opacity: isCreatingProposal ? 0.7 : 1
          }}
        >
          {isCreatingProposal ? "Creating Proposal..." : "Create Proposal"}
        </button>
      </div>
      
      <div style={{ 
        border: "1px solid #e2e8f0", 
        borderRadius: "8px", 
        padding: "20px",
        backgroundColor: "#f8fafc"
      }}>
        <h3>Coming Soon Features</h3>
        <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
          <li><strong>Voting Interface:</strong> Cast votes on active proposals</li>
          <li><strong>Proposal Execution:</strong> Execute passed proposals after timelock</li>
          <li><strong>Delegation Management:</strong> Delegate your voting power to others</li>
          <li><strong>Real-time Updates:</strong> Live proposal status and voting results</li>
          <li><strong>Wallet Integration:</strong> Connect MetaMask or other wallets</li>
        </ul>
        
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#6b7280" }}>
          <strong>Note:</strong> This is currently a demo interface. To make it fully functional, 
          you would need to integrate with the Tally API mutations and connect a wallet for 
          transaction signing.
        </p>
      </div>
    </div>
  );
};
