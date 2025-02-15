import { tool } from 'ai'
import type { Account } from 'viem'
import { z } from 'zod'
import { formatUnits, createPublicClient, http } from 'viem'
import { goatService } from '../../services/goat'
import { MANTLE_USDC, getTokenAddress } from '../../config/tokens'
import { mantle } from 'viem/chains'

interface BalanceInfo {
	mnt: string
	usdc: string
	safeUsdcAmount: string
	safeMntAmount: string
	hasGas: boolean
}

interface ExecutorTools {
	checkBalances: ReturnType<typeof tool>
	executeAction: ReturnType<typeof tool>
}

export const getExecutorToolkit = (account: Account): ExecutorTools => {
	return {
		checkBalances: tool({
			description: 'A tool that checks both MNT and USDC balances.',
			parameters: z.object({}),
			execute: async ({}): Promise<BalanceInfo | null> => {
				console.log('======== checkBalances Tool =========')
				console.log(`[checkBalances] checking balances for ${account.address}`)

				try {
					// Get native MNT balance first
					const publicClient = createPublicClient({
						chain: mantle,
						transport: http(),
					})
					const mntBalance = await publicClient.getBalance({ address: account.address })
					const formattedMntBalance = formatUnits(mntBalance, 18)

					// Initialize GOAT service if needed
					if (!goatService.isInitialized()) {
						await goatService.initialize()
					}

					// Get USDC balance
					const tokenAddress = getTokenAddress(MANTLE_USDC, '5000')
					const usdcBalance = await goatService.getBalance({
						token: tokenAddress,
						address: account.address,
					})
					const formattedUsdcBalance = formatUnits(BigInt(usdcBalance), 6)

					// Calculate safe amounts for transactions (keeping reserves)
					const safeUsdcAmount = Number(formattedUsdcBalance) * 0.95 // Keep 5% as reserve
					const safeMntAmount = Number(formattedMntBalance) - 0.001 // Keep 0.001 MNT for future gas

					return {
						mnt: formattedMntBalance,
						usdc: formattedUsdcBalance,
						safeUsdcAmount: safeUsdcAmount.toFixed(6),
						safeMntAmount: safeMntAmount > 0 ? safeMntAmount.toFixed(18) : '0',
						hasGas: Number(formattedMntBalance) >= 0.0001,
					}
				} catch (error) {
					console.error('Error checking balances:', error)
					return null
				}
			},
		}),
		executeAction: tool({
			description:
				'A tool that simulates deposits and swaps on Mantle, keeping safe reserves.',
			parameters: z.object({
				action: z.object({
					type: z.enum(['deposit', 'swap']),
					amount: z.string(),
					token: z.string(),
					protocol: z.string(),
					targetToken: z.string().optional(),
				}),
			}),
			execute: async ({ action }): Promise<string> => {
				console.log('======== executeAction Tool =========')

				try {
					const balances: BalanceInfo | null = await getExecutorToolkit(
						account
					).checkBalances.execute({})
					if (!balances) {
						return 'Failed to check balances'
					}
					if (!balances.hasGas) {
						return 'Insufficient MNT for gas fees. Need at least 0.0001 MNT.'
					}

					// Check if amount is within safe limits
					const amount = Number(action.amount)
					if (
						action.token.toLowerCase() === 'usdc' &&
						amount > Number(balances.safeUsdcAmount)
					) {
						return `Amount too high. Maximum safe USDC amount is ${balances.safeUsdcAmount} (keeping 5% reserve)`
					}
					if (
						action.token.toLowerCase() === 'mnt' &&
						amount > Number(balances.safeMntAmount)
					) {
						return `Amount too high. Maximum safe MNT amount is ${balances.safeMntAmount} (keeping 0.001 MNT for gas)`
					}

					// Simulate the action
					if (action.type === 'deposit') {
						return `Would deposit ${action.amount} ${action.token} into ${action.protocol} (simulation only)`
					} else if (action.type === 'swap') {
						return `Would swap ${action.amount} ${action.token} for ${action.targetToken} on ${action.protocol} (simulation only)`
					}

					return 'Unknown action type'
				} catch (error) {
					console.error('Error executing action:', error)
					return `Error executing action: ${error}`
				}
			},
		}),
	}
}
