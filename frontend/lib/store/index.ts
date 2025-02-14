import { create } from "zustand"
import { createAgentSlice, type AgentSlice } from "./slices/agent"
import { createWalletSlice, type WalletSlice } from "./slices/wallet"

interface AppState extends AgentSlice, WalletSlice {
  isLoading: boolean
  error: string | null
}

export const useAppStore = create<AppState>()((...args) => ({
  // UI State
  isLoading: false,
  error: null,

  // Slices
  ...createAgentSlice(...args),
  ...createWalletSlice(...args),
}))
