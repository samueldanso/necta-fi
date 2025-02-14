import { z } from "zod"

export const AgentStatusSchema = z.object({
  agent: z.string(),
  status: z.enum(["active", "processing", "inactive"]),
  lastActive: z.string(),
  description: z.string(),
})

export const ThoughtSchema = z.object({
  id: z.string(),
  agent: z.string(),
  message: z.string(),
  timestamp: z.string(),
  data: z
    .object({
      tools: z.array(z.string()).optional(),
      report: z.string().optional(),
    })
    .optional(),
})

export type AgentStatus = z.infer<typeof AgentStatusSchema>
export type Thought = z.infer<typeof ThoughtSchema>
