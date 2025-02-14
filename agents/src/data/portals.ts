import type { Hex } from 'viem'
import env from '../env'
import { getChainConfig } from '../config/chains'

/**
 * Get network ID for Portals API from current chain config
 */
function getPortalsNetworkId(): string {
	const chainConfig = getChainConfig(parseInt(env.CHAIN_ID))
	return chainConfig.portals.networkId
}

/**
 * @dev Gets the balances of an account
 * @param owner - The owner of the account
 * @returns The balances of the account
 */
export const getAccountBalances = async (owner: Hex) => {
	try {
		const networkId = getPortalsNetworkId()
		const url = `https://api.portals.fi/v2/account?owner=${owner}&networks=${networkId}`
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: env.PORTALS_API_KEY,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()

		// Ensure we have a valid response structure
		if (!data || !Array.isArray(data.balances)) {
			return { balances: [] }
		}

		return data
	} catch (error) {
		console.error('Error fetching account balances:', error)
		return { balances: [] }
	}
}

/**
 * @dev Gets the market data for USDC
 * @returns The market data for USDC opportunities
 */
export const getMarketData = async (minApy: number = 3, maxApy: number = 60) => {
	try {
		const chainConfig = getChainConfig(parseInt(env.CHAIN_ID))
		const url = `https://api.portals.fi/v2/tokens?networks=${chainConfig.portals.networkId}&minLiquidity=${chainConfig.minLiquidity}&minApy=${minApy}&maxApy=${maxApy}&search=usdc`
		console.log('======== fetchTokenData =========')
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: env.PORTALS_API_KEY,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return {
			usdc: data,
		}
	} catch (error) {
		console.error('Error fetching market data:', error)
		return {
			usdc: { tokens: [] },
		}
	}
}

/**
 * @dev Gets the market data for multiple protocol/token combinations
 * @param queries - Array of {protocol, token} pairs to check
 * @param minLiquidity - Minimum liquidity threshold
 * @param minApy - Minimum APY threshold
 * @param maxApy - Maximum APY threshold
 * @returns The market data for the specified positions
 */
export const getPositionData = async (
	queries: Array<{ protocol: string; token: string }>,
	minLiquidity: number = 10000000,
	minApy: number = 3,
	maxApy: number = 60
) => {
	try {
		const networkId = getPortalsNetworkId()
		const chainConfig = getChainConfig(parseInt(env.CHAIN_ID))

		const results = await Promise.all(
			queries.map(async ({ protocol, token }) => {
				const url = `https://api.portals.fi/v2/tokens?networks=${networkId}&platforms=${protocol}&minLiquidity=${chainConfig.minLiquidity}&minApy=${minApy}&maxApy=${maxApy}&search=${token}`
				console.log('======== fetchPositionData =========')
				const response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: env.PORTALS_API_KEY,
					},
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = await response.json()
				return {
					protocol,
					token,
					data,
				}
			})
		)
		return results
	} catch (error) {
		console.error('Error fetching position data:', error)
		return []
	}
}
