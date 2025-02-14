"use client"

import { Card } from "@/components/ui/card"
import type { AgentStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Brain, Eye, Terminal } from "lucide-react"

export function AgentStatusCard({ agent }: { agent: AgentStatus }) {
  const getAgentIcon = (agentName: string) => {
    switch (agentName.toLowerCase()) {
      case "sentinel":
        return <Eye className="h-5 w-5" />
      case "curator":
        return <Brain className="h-5 w-5" />
      case "executor":
        return <Terminal className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Card className="border-white/[0.08] bg-zinc-900/[0.65] p-4 backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
          {getAgentIcon(agent.agent)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">{agent.agent}</h3>
            <span
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs",
                agent.status === "active"
                  ? "bg-green-500/10 text-green-500"
                  : agent.status === "processing"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "bg-red-500/10 text-red-500",
              )}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    agent.status === "active"
                      ? "bg-green-500"
                      : agent.status === "processing"
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-2 w-2 rounded-full",
                    agent.status === "active"
                      ? "bg-green-500"
                      : agent.status === "processing"
                        ? "bg-yellow-500"
                        : "bg-red-500",
                  )}
                />
              </span>
              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/60">{agent.description}</p>
          <p className="mt-2 text-white/40 text-xs">
            Last active: {agent.lastActive}
          </p>
        </div>
      </div>
    </Card>
  )
}
