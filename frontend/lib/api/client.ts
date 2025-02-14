import { API_BASE_URL } from "./config"
import {
  AgentStatusSchema,
  ThoughtSchema,
  WalletDataSchema,
  type AgentStatus,
  type Thought,
  type WalletData,
} from "@/lib/types"

// Agent-related API endpoints
const agents = {
  async getStatus(): Promise<AgentStatus[]> {
    const response = await fetch(`${API_BASE_URL}/agents/status`)
    if (!response.ok) {
      throw new Error("Failed to fetch agent status")
    }
    const data = await response.json()
    return AgentStatusSchema.array().parse(data)
  },

  async getThoughts(): Promise<Thought[]> {
    const response = await fetch(`${API_BASE_URL}/thoughts`)
    if (!response.ok) {
      throw new Error("Failed to fetch thoughts")
    }
    const data = await response.json()
    return ThoughtSchema.array().parse(data)
  },
}

// Wallet-related API endpoints
const wallet = {
  async getData(): Promise<WalletData> {
    const response = await fetch(`${API_BASE_URL}/wallet`)
    if (!response.ok) {
      throw new Error("Failed to fetch wallet data")
    }
    const data = await response.json()
    return WalletDataSchema.parse(data)
  },
}

export const api = {
  agents,
  wallet,
}
