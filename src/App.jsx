import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import "./App.css";
import { Governors } from "./CodegenQuery/Governors";
import { Proposals } from "./RawQuery/Proposals";
import { PolygonProposals} from "./ReactQuery/PolygonProposals"
import { InteractiveDAO } from "./InteractiveDAO";

function App() {
  const queryClient = new QueryClient();
  const [selectedOrgId, setSelectedOrgId] = useState("2206072050123015276");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        
        <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Organization Selector</h3>
          <p>Current Organization ID: <strong>{selectedOrgId}</strong></p>
          <p>This is a test environment. To see real DAO data, you need to:</p>
          <ul>
            <li>Switch to production API, or</li>
            <li>Find an organization with actual governors/proposals, or</li>
            <li>Create your own test DAO</li>
          </ul>
          
          <div style={{ marginTop: "20px" }}>
            <h4>Quick Organization Explorer</h4>
            <p>Try these organization IDs to see if they have data:</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { id: "2206072050123015276", name: "Your Polygon DAO", hasData: true, chain: "Polygon" },
                { id: "2206072049812637268", name: "Sepolia Testnet DAO", hasData: true, chain: "Sepolia" },
                { id: "2206072049795859998", name: "Test Org 1", hasData: false, chain: "Unknown" },
                { id: "2206072049804248607", name: "Test Org 2", hasData: false, chain: "Unknown" },
                { id: "2206072049804248608", name: "Test Org 3", hasData: false, chain: "Unknown" },
                { id: "2206072049804248609", name: "Test Org 4", hasData: false, chain: "Unknown" }
              ].map(org => (
                <button 
                  key={org.id}
                  onClick={() => setSelectedOrgId(org.id)}
                  style={{ 
                    padding: "8px 16px", 
                    border: selectedOrgId === org.id ? "2px solid #007bff" : "1px solid #ccc",
                    borderRadius: "4px",
                    background: selectedOrgId === org.id ? "#007bff" : "white",
                    color: selectedOrgId === org.id ? "white" : "black",
                    cursor: "pointer",
                    position: "relative"
                  }}
                  title={org.name}
                                  >
                    {org.hasData ? "⭐ " : ""}{org.id.slice(-4)}
                    <br />
                    <small style={{ fontSize: "10px" }}>{org.chain}</small>
                  </button>
              ))}
            </div>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
              ⭐ = Has real DAO data (governors, proposals, etc.)
            </p>
          </div>
        </div>

        {/* Debug info */}
        <div style={{ 
          margin: "10px 20px", 
          padding: "10px", 
          backgroundColor: "#f0f0f0", 
          borderRadius: "4px", 
          fontSize: "12px",
          fontFamily: "monospace"
        }}>
          <strong>Debug:</strong> selectedOrgId = "{selectedOrgId}"
        </div>
        
        <Governors organizationId={selectedOrgId} />
        <Proposals organizationId={selectedOrgId} />
        <PolygonProposals organizationId={selectedOrgId} />
        <InteractiveDAO organizationId={selectedOrgId} />
      </div>
    </QueryClientProvider>
  );
}

const Header = () => {
  return (
    <div>
      <h1>Tally API Quickstart</h1>
    </div>
  );
};



export default App;
