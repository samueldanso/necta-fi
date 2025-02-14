import { z } from 'zod'

const YieldPoolSchema = z.object({
	pool: z.string(),
	chain: z.string(),
	project: z.string(),
	symbol: z.string(),
	tvlUsd: z.number(),
	apyBase: z.number(),
	apyReward: z.number().optional(),
	apy: z.number(),
	rewardTokens: z.array(z.string()).optional(),
})

export type YieldPool = z.infer<typeof YieldPoolSchema>

export class DefiLlamaService {
	private readonly BASE_URL = 'https://yields.llama.fi'

	async getYieldPools(
		options: {
			minApy?: number
			maxApy?: number
			minTvl?: number
		} = {}
	) {
		try {
			const { minApy = 3, maxApy = 60, minTvl = 10000 } = options

			const response = await fetch(`${this.BASE_URL}/pools`)
			const data = await response.json()

			// Filter for Mantle pools with our criteria
			return data.data
				.filter(
					(pool: YieldPool) =>
						pool.chain === 'Mantle' &&
						pool.tvlUsd >= minTvl &&
						pool.apy >= minApy &&
						pool.apy <= maxApy
				)
				.map((pool: YieldPool) => ({
					pool: pool.pool,
					chain: pool.chain,
					project: pool.project,
					symbol: pool.symbol,
					tvlUsd: pool.tvlUsd,
					apyBase: pool.apyBase,
					apyReward: pool.apyReward,
					apy: pool.apy,
					rewardTokens: pool.rewardTokens,
				}))
		} catch (error) {
			console.error('Error fetching DeFi Llama yield data:', error)
			return []
		}
	}

	async getProtocolTvl(protocol: string) {
		try {
			const response = await fetch(`https://api.llama.fi/protocol/${protocol}`)
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Error fetching protocol TVL:', error)
			return null
		}
	}

	// Keep interface similar to existing Portals service for easier integration
	async getMarketData(minApy = 3, maxApy = 60) {
		const pools = await this.getYieldPools({ minApy, maxApy })

		return {
			usdc: {
				tokens: pools.filter((pool: YieldPool) =>
					pool.symbol.toLowerCase().includes('usdc')
				),
			},
		}
	}
}

// Export singleton instance
export const defiLlama = new DefiLlamaService()
