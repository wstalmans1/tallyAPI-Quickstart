import { create } from 'zustand'

interface OrgState {
  organizationId: string
  governorAddress: string
  governorId: string
  chainId: string
  setOrg: (org: Partial<OrgState>) => void
  reset: () => void
}

const defaultState = {
  organizationId: '2206072049812637268', // Default to Sepolia DAO
  governorAddress: '',
  governorId: '',
  chainId: 'eip155:11155111', // Sepolia
}

export const useOrg = create<OrgState>((set) => ({
  ...defaultState,
  setOrg: (org) => set((state) => ({ ...state, ...org })),
  reset: () => set(defaultState),
}))

// Helper function to initialize org state
export const initializeOrg = () => {
  // This can be called to set up initial organization state
  // For now, we'll use the default state
  useOrg.getState().setOrg(defaultState)
}