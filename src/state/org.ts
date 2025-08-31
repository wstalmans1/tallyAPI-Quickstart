import { create } from 'zustand'

type OrgState = {
  organizationId: string | null
  governorId: string | null
  governorAddress: `0x${string}` | null
  tokenAddress: `0x${string}` | null
  timelockAddress: `0x${string}` | null
  setOrg: (o: Partial<OrgState>) => void
}

export const useOrg = create<OrgState>((set) => ({
  organizationId: null, 
  governorId: null, 
  governorAddress: null,
  tokenAddress: null,
  timelockAddress: null,
  setOrg: (o) => set(o)
}))

// Initialize with your DAO addresses
export const initializeOrg = () => {
  useOrg.getState().setOrg({
    organizationId: '2206072049812637268',
    governorAddress: '0xDffcE883cD9a5Ba297B19eD9694b496D56B2119B' as `0x${string}`,
    tokenAddress: '0x22b8eF3A10b0eAfF6dc9D1abC4C9EF81b6013E8C' as `0x${string}`,
    timelockAddress: '0x1F0c9EfbbF0aFE7543C60Bb502122f70881a73a2' as `0x${string}`
  })
}
