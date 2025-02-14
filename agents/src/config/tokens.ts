import type { Token } from '@goat-sdk/plugin-erc20'

interface TokenChains {
	[chainId: string]: {
		contractAddress: `0x${string}`
	}
}

interface TokenConfig {
	decimals: number
	symbol: string
	name: string
	chains: TokenChains
}

export const MANTLE_USDC: TokenConfig = {
	decimals: 6,
	symbol: 'USDC',
	name: 'USD Coin',
	chains: {
		'5000': {
			// Mantle chain ID
			contractAddress: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9' as `0x${string}`,
		},
	} as Record<string, { contractAddress: `0x${string}` }>,
} as const

// Helper function to get token address for a specific chain
export function getTokenAddress(token: TokenConfig, chainId: string): `0x${string}` {
	const chainData = token.chains[chainId]
	if (!chainData) {
		throw new Error(`Token not supported on chain ${chainId}`)
	}
	return chainData.contractAddress
}
