import { tool } from 'ai'
import type { Hex } from 'viem'
import { getAccountBalances, getMarketData } from '../../data'
import { z } from 'zod'
import { retrievePastReports } from '../../memory'
import { defiLlama } from '../../data/defi-llama'
import type { YieldPool } from '../../data/defi-llama'
import { goatService } from '../../services/goat'
import { MANTLE_USDC, getTokenAddress } from '../../config/tokens'
import { formatUnits, createPublicClient, http } from 'viem'
import { mantle } from 'viem/chains'

export const getSentinelToolkit = (address: Hex) => {
	return {
		getPastReports: tool({
			description:
				'A tool that returns the past reports that contain information about previously executed actions.',
			parameters: z.object({
				question: z
					.string()
					.describe(
						'The question to retrieve past reports for. If you are thinking about performing operations with USDC for example, you could generate a question to ask to your memory.'
					),
			}),
			execute: async ({ question }) => {
				console.log('======== getPastReports Tool =========')
				console.log(`[getPastReports] retrieving past reports with question: ${question}`)
				const reports = await retrievePastReports(question)

				if (!reports || reports.length === 0) {
					return "No past reports found. This is ok, it means that you're thinking about a new operation."
				}

				console.log(`[getPastReports] reports retrieved: ${reports.length}`)

				return reports
					.map(
						(report: any) =>
							`Report containing the operations done the ${report.created_at}:\n${report.content}\n`
					)
					.join('\n')
			},
		}),
		getWalletBalances: tool({
			description: 'A tool that returns the current balances of your wallet.',
			parameters: z.object({}),
			execute: async () => {
				console.log('======== getWalletBalances Tool =========')
				console.log(`[getWalletBalances] fetching token balances for ${address}...`)

				try {
					// Initialize GOAT service if not already initialized
					if (!goatService.isInitialized()) {
						await goatService.initialize()
					}

					// Get USDC balance
					const tokenAddress = getTokenAddress(MANTLE_USDC, '5000')
					const usdcBalance = await goatService.getBalance({
						token: tokenAddress,
						address,
					})
					const formattedUsdcBalance = formatUnits(BigInt(usdcBalance), 6) // USDC has 6 decimals

					// Get native MNT balance
					const publicClient = createPublicClient({
						chain: mantle,
						transport: http(),
					})
					const mntBalance = await publicClient.getBalance({ address })
					const formattedMntBalance = formatUnits(mntBalance, 18) // MNT has 18 decimals

					console.log(`[getWalletBalances] balances fetched correctly.`)
					return `This is the current status of the wallet with address ${address}:\nTokens:\nMNT: ${formattedMntBalance} ($${(
						Number(formattedMntBalance) * 1.037
					).toFixed(2)})\nUSDC: ${formattedUsdcBalance} ($${Number(
						formattedUsdcBalance
					).toFixed(2)})`
				} catch (error) {
					console.error('Error fetching wallet balances:', error)
					return { balances: [] }
				}
			},
		}),
		getMantleYieldData: tool({
			description: 'A tool that returns the current yield opportunities on Mantle network.',
			parameters: z.object({
				minApy: z.number().optional().describe('Minimum APY threshold (default: 3)'),
				maxApy: z.number().optional().describe('Maximum APY threshold (default: 60)'),
				minTvl: z.number().optional().describe('Minimum TVL threshold (default: 10000)'),
			}),
			execute: async ({ minApy, maxApy, minTvl }) => {
				console.log('======== getMantleYieldData Tool =========')
				console.log(`[getMantleYieldData] fetching yield opportunities...`)
				const pools = await defiLlama.getYieldPools({ minApy, maxApy, minTvl })

				if (!pools || pools.length === 0) {
					return 'No yield opportunities found on Mantle network'
				}

				const formattedPools = pools
					.map(
						(pool: YieldPool) =>
							`[${pool.project}] ${pool.symbol} - APY: ${pool.apy}% (Base: ${
								pool.apyBase
							}%, Reward: ${
								pool.apyReward || 0
							}%) - TVL: $${pool.tvlUsd.toLocaleString()}`
					)
					.join('\n')

				console.log(`[getMantleYieldData] found ${pools.length} opportunities`)
				return `Current yield opportunities on Mantle:\n${formattedPools}`
			},
		}),
		getMarketData: tool({
			description: 'A tool that returns the current market data for USDC.',
			parameters: z.object({}),
			execute: async () => {
				console.log('======== getMarketData Tool =========')
				console.log(`[getMarketData] fetching market data...`)
				const marketData = await defiLlama.getMarketData()

				if (!marketData.usdc.tokens || marketData.usdc.tokens.length === 0) {
					return 'No USDC opportunities found on Mantle'
				}

				const usdcFormatted = marketData.usdc.tokens
					.map(
						(pool: YieldPool) =>
							`[${pool.project}] ${pool.symbol} - APY: ${pool.apy}% (Base: ${
								pool.apyBase
							}%, Reward: ${
								pool.apyReward || 0
							}%) - TVL: $${pool.tvlUsd.toLocaleString()}`
					)
					.join('\n')

				console.log(`[getMarketData] market data fetched correctly.`)
				return `Current USDC opportunities on Mantle:\n${usdcFormatted}`
			},
		}),
		noFurtherActionsTool: tool({
			description: 'A tool that you decide to use when no further actions are needed.',
			parameters: z.object({
				reason: z.string().describe('The reason why no further actions are needed.'),
				waitTime: z
					.number()
					.describe(
						"The time to wait before executing the next action. This number must be logical to the operations you've done."
					),
			}),
		}),
	}
}
