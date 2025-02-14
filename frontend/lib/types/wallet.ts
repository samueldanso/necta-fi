import { z } from "zod"

export const PositionSchema = z.object({
  protocol: z.string(),
  amount: z.string(),
  value: z.string(),
})

export const WalletDataSchema = z.object({
  address: z.string(),
  balance: z.string(),
  totalBalance: z.string(),
  totalValue: z.number(),
  averageApy: z.number(),
  riskScore: z.number(),
  tokens: z.array(
    z.object({
      symbol: z.string(),
      balance: z.string(),
      value: z.string(),
    }),
  ),
  positions: z.array(PositionSchema),
})

export type Position = z.infer<typeof PositionSchema>
export type WalletData = z.infer<typeof WalletDataSchema>
