import { describe, test, expect, beforeAll } from 'bun:test'
import { defiLlama } from '../../data/defi-llama'
import { goatService } from '../goat'
import { MANTLE_USDC, getTokenAddress } from '../../config/tokens'
import { privateKeyToAccount } from 'viem/accounts'
import env from '../../env'

describe('DeFi Llama Integration', () => {
	test('should fetch Mantle yield pools', async () => {
		try {
			const pools = await defiLlama.getYieldPools()
			expect(Array.isArray(pools)).toBe(true)

			if (pools.length > 0) {
				const pool = pools[0]
				expect(pool.chain).toBe('Mantle')
				expect(typeof pool.apy).toBe('number')
				expect(typeof pool.tvlUsd).toBe('number')
				expect(typeof pool.project).toBe('string')
			}
		} catch (error) {
			console.error('Error fetching yield pools:', error)
			throw error
		}
	}, 30000) // 30 second timeout

	test('should get USDC market data', async () => {
		try {
			const data = await defiLlama.getMarketData()
			expect(data).toHaveProperty('usdc')
			expect(Array.isArray(data.usdc.tokens)).toBe(true)
		} catch (error) {
			console.error('Error getting market data:', error)
			throw error
		}
	}, 30000) // 30 second timeout

	test('should get protocol TVL', async () => {
		try {
			// Test with a known Mantle protocol
			const data = await defiLlama.getProtocolTvl('agni-finance')
			expect(data).not.toBeNull()
			if (data) {
				expect(data).toHaveProperty('tvl')
			}
		} catch (error) {
			console.error('Error getting protocol TVL:', error)
			throw error
		}
	}, 30000) // 30 second timeout
})

describe('GOAT SDK Integration', () => {
	let walletAddress: `0x${string}`

	beforeAll(async () => {
		// Initialize GOAT service before tests
		await goatService.initialize()
		// Get wallet address from private key
		const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`)
		walletAddress = account.address
	})

	test('should get USDC balance', async () => {
		const tokenAddress = getTokenAddress(MANTLE_USDC, '5000')
		const balance = await goatService.getBalance({
			token: tokenAddress,
			address: walletAddress,
		})
		expect(typeof balance).toBe('string')
	})

	test('should validate transaction parameters', () => {
		const testAmount = '100000' // 0.1 USDC (6 decimals)
		const testAddress = '0x1234567890123456789012345678901234567890' as `0x${string}`
		const tokenAddress = getTokenAddress(MANTLE_USDC, '5000')

		// Verify the transaction parameters are correctly formatted
		expect(() => {
			const params = {
				to: testAddress,
				amount: testAmount,
				token: tokenAddress,
			}
			expect(params.to).toMatch(/^0x[a-fA-F0-9]{40}$/)
			expect(params.token).toMatch(/^0x[a-fA-F0-9]{40}$/)
			expect(typeof params.amount).toBe('string')
			expect(Number(params.amount)).toBeGreaterThan(0)
		}).not.toThrow()
	})
})
