import type { StateCreator } from "zustand"
import type { AgentStatus, Thought } from "@/lib/types"

// Mock data for development
const MOCK_AGENTS: AgentStatus[] = [
  {
    agent: "Sentinel",
    status: "active",
    lastActive: new Date().toISOString(),
    description:
      "Monitoring market conditions and yield opportunities across protocols.",
  },
  {
    agent: "Curator",
    status: "processing",
    lastActive: new Date().toISOString(),
    description:
      "Analyzing and selecting the best yield strategies based on risk parameters.",
  },
  {
    agent: "Executor",
    status: "active",
    lastActive: new Date().toISOString(),
    description:
      "Executing optimized yield strategies with gas-efficient operations.",
  },
]

const MOCK_THOUGHTS: Thought[] = [
  {
    id: "1",
    agent: "Sentinel",
    message: "Detected higher APY opportunity on Morpho (10.78%)",
    timestamp: new Date().toISOString(),
    data: {
      tools: ["APY Scanner", "Risk Analyzer"],
    },
  },
  {
    id: "2",
    agent: "Curator",
    message: "Analyzing rebalancing opportunity: +2.5% APY increase possible",
    timestamp: new Date(Date.now() - 5000).toISOString(),
    data: {
      tools: ["Strategy Optimizer"],
    },
  },
  {
    id: "3",
    agent: "Executor",
    message: "Successfully rebalanced position for optimal yield",
    timestamp: new Date(Date.now() - 10000).toISOString(),
    data: {
      tools: ["Transaction Manager"],
      report: "Rebalanced 1000 USDC to Morpho for 10.78% APY",
    },
  },
]

export interface AgentSlice {
  // State
  agents: AgentStatus[]
  thoughts: Thought[]

  // Actions
  fetchAgentStatus: () => Promise<void>
  fetchThoughts: () => Promise<void>
}

export const createAgentSlice: StateCreator<
  AgentSlice & { isLoading: boolean; error: string | null },
  [],
  [],
  AgentSlice
> = (set) => ({
  // Initial state
  agents: [],
  thoughts: [],

  // Actions
  fetchAgentStatus: async () => {
    try {
      set({ isLoading: true, error: null })
      // Use mock data for now
      set({ agents: MOCK_AGENTS })
      // const data = await api.agents.getStatus()
      // set({ agents: data })
    } catch (_error) {
      set({ error: "Failed to fetch agent status" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchThoughts: async () => {
    try {
      set({ isLoading: true, error: null })
      // Use mock data for now
      set({ thoughts: MOCK_THOUGHTS })
      // const data = await api.agents.getThoughts()
      // set({ thoughts: data })
    } catch (_error) {
      set({ error: "Failed to fetch thoughts" })
    } finally {
      set({ isLoading: false })
    }
  },
})
