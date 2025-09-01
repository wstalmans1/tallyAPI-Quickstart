import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import "./App.css";
import { TallyInterface } from "./components/TallyInterface";
import { config } from "./wagmi/config";

const Header = () => {
  return (
    <div>
      <h1>🚀 Tally API Quickstart</h1>
    </div>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <div className="App" style={{ 
            backgroundColor: "white", 
            color: "black", 
            minHeight: "100vh",
            padding: "20px"
          }}>
            <Header />
            <TallyInterface />
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
