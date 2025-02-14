import type { StateCreator } from "zustand"
import { api } from "@/lib/api/client"
import type { WalletData } from "@/lib/types"

export interface WalletSlice {
  // State
  walletData: WalletData | null

  // Actions
  fetchWalletData: () => Promise<void>
}

export const createWalletSlice: StateCreator<
  WalletSlice & { isLoading: boolean; error: string | null },
  [],
  [],
  WalletSlice
> = (set) => ({
  // Initial state
  walletData: null,

  // Actions
  fetchWalletData: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await api.wallet.getData()
      set({ walletData: data })
    } catch (_error) {
      set({ error: "Failed to fetch wallet data" })
    } finally {
      set({ isLoading: false })
    }
  },
})
