/**
 * Get the appropriate block explorer URL for a given chain ID
 * @param {string} chainId - The chain ID (e.g., 'eip155:137', 'eip155:11155111')
 * @param {string} address - The contract or wallet address
 * @param {string} type - The type of link ('address', 'token', 'tx')
 * @returns {string} The block explorer URL
 */
export const getBlockExplorerUrl = (chainId, address, type = 'address') => {
  if (!chainId || !address) return '#'
  
  // Extract the numeric chain ID
  const numericChainId = chainId.replace('eip155:', '')
  
  const explorers = {
    '1': 'https://etherscan.io',
    '11155111': 'https://sepolia.etherscan.io',
    '137': 'https://polygonscan.com',
    '80001': 'https://mumbai.polygonscan.com',
    '42161': 'https://arbiscan.io',
    '421614': 'https://sepolia.arbiscan.io',
    '10': 'https://optimistic.etherscan.io',
    '11155420': 'https://sepolia-optimism.etherscan.io',
    '8453': 'https://basescan.org',
    '84532': 'https://sepolia.basescan.org',
    '56': 'https://bscscan.com',
    '97': 'https://testnet.bscscan.com',
    '43114': 'https://snowtrace.io',
    '43113': 'https://testnet.snowtrace.io',
    '250': 'https://ftmscan.com',
    '4002': 'https://testnet.ftmscan.com',
    '25': 'https://cronoscan.com',
    '338': 'https://testnet.cronoscan.com',
    '100': 'https://gnosisscan.io',
    '10200': 'https://gnosis-chiado.blockscout.com',
    '1284': 'https://moonscan.io',
    '1287': 'https://moonbase.moonscan.io',
    '1285': 'https://moonriver.moonscan.io',
    '30': 'https://explorer.rsk.co',
    '31': 'https://explorer.testnet.rsk.co',
    '1666600000': 'https://explorer.harmony.one',
    '1666700000': 'https://explorer.pops.one',
    '1313161554': 'https://explorer.aurora.dev',
    '1313161555': 'https://testnet.aurora.dev',
    '592': 'https://astar.subscan.io',
    '81': 'https://blockscout.com/astar/shiden',
    '336': 'https://blockscout.com/astar/shibuya',
    '1088': 'https://andromeda-explorer.metis.io',
    '599': 'https://testnet-explorer.metis.io',
    '288': 'https://bobascan.com',
    '570': 'https://testnet.bobascan.com',
    '108': 'https://explorer.thundercore.com',
    '18': 'https://explorer-testnet.thundercore.com',
    '106': 'https://explorer.velas.com',
    '82': 'https://explorer.testnet.velas.com',
    '40': 'https://explorer.telos.net',
    '41': 'https://explorer.testnet.telos.net',
    '50': 'https://explorer.xinfin.network',
    '51': 'https://explorer.apothem.network',
    '60': 'https://explorer.gochain.io',
    '77': 'https://explorer.s0.poa.energy',
    '99': 'https://explorer.poa.energy'
  }
  
  const baseUrl = explorers[numericChainId] || explorers['1'] // Default to Ethereum mainnet
  
  switch (type) {
    case 'address':
      return `${baseUrl}/address/${address}`
    case 'token':
      return `${baseUrl}/token/${address}`
    case 'tx':
      return `${baseUrl}/tx/${address}`
    default:
      return `${baseUrl}/address/${address}`
  }
}

/**
 * Get the chain name from chain ID
 * @param {string} chainId - The chain ID (e.g., 'eip155:137', 'eip155:11155111')
 * @returns {string} The chain name
 */
export const getChainName = (chainId) => {
  if (!chainId) return 'Unknown'
  
  const numericChainId = chainId.replace('eip155:', '')
  
  const chainNames = {
    '1': 'Ethereum',
    '11155111': 'Sepolia',
    '137': 'Polygon',
    '80001': 'Mumbai',
    '42161': 'Arbitrum',
    '421614': 'Arbitrum Sepolia',
    '10': 'Optimism',
    '11155420': 'Optimism Sepolia',
    '8453': 'Base',
    '84532': 'Base Sepolia',
    '56': 'BSC',
    '97': 'BSC Testnet',
    '43114': 'Avalanche',
    '43113': 'Avalanche Fuji',
    '250': 'Fantom',
    '4002': 'Fantom Testnet',
    '25': 'Cronos',
    '338': 'Cronos Testnet',
    '100': 'Gnosis',
    '10200': 'Gnosis Chiado',
    '1284': 'Moonbeam',
    '1287': 'Moonbase',
    '1285': 'Moonriver',
    '30': 'RSK',
    '31': 'RSK Testnet',
    '1666600000': 'Harmony',
    '1666700000': 'Harmony Testnet',
    '1313161554': 'Aurora',
    '1313161555': 'Aurora Testnet',
    '592': 'Astar',
    '81': 'Shiden',
    '336': 'Shibuya',
    '1088': 'Metis',
    '599': 'Metis Testnet',
    '288': 'Boba',
    '570': 'Boba Testnet',
    '108': 'ThunderCore',
    '18': 'ThunderCore Testnet',
    '106': 'Velas',
    '82': 'Velas Testnet',
    '40': 'Telos',
    '41': 'Telos Testnet',
    '50': 'XDC',
    '51': 'XDC Testnet',
    '60': 'GoChain',
    '77': 'POA Sokol',
    '99': 'POA Core'
  }
  
  return chainNames[numericChainId] || `Chain ${numericChainId}`
}
