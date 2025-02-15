import {
	http,
	createWalletClient,
	createPublicClient,
	type WalletClient,
	type PublicClient,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mantle } from 'viem/chains'
import { getOnChainTools } from '@goat-sdk/adapter-vercel-ai'
import { erc20 } from '@goat-sdk/plugin-erc20'
import { sendETH } from '@goat-sdk/wallet-evm'
import { viem } from '@goat-sdk/wallet-viem'
import { MANTLE_USDC } from '../../config/tokens'
import env from '../../env'

export class GoatService {
	private tools: Awaited<ReturnType<typeof getOnChainTools>> | null = null
	private walletClient: WalletClient | null = null
	private publicClient: PublicClient | null = null

	isInitialized(): boolean {
		return this.tools !== null && this.walletClient !== null && this.publicClient !== null
	}

	async initialize() {
		try {
			const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`)

			this.walletClient = createWalletClient({
				account,
				transport: http(env.MANTLE_RPC_URL),
				chain: mantle,
			})

			this.publicClient = createPublicClient({
				transport: http(env.MANTLE_RPC_URL),
				chain: mantle,
			})

			// Cast the wallet client to any to avoid type conflicts between viem versions
			this.tools = await getOnChainTools({
				wallet: viem(this.walletClient as any),
				plugins: [
					sendETH(),
					erc20({
						tokens: [MANTLE_USDC],
					}),
				],
			})

			return true
		} catch (error) {
			console.error('Error initializing GOAT SDK:', error)
			throw error
		}
	}

	async executeTransaction(params: { to: `0x${string}`; amount: string; token: `0x${string}` }) {
		if (!this.tools || !this.walletClient) {
			throw new Error('GOAT SDK not initialized')
		}

		try {
			const account = privateKeyToAccount(env.PRIVATE_KEY as `0x${string}`)
			// Use ERC20 ABI for token transfers
			const data = {
				abi: [
					{
						name: 'transfer',
						type: 'function',
						stateMutability: 'nonpayable',
						inputs: [
							{ name: 'recipient', type: 'address' },
							{ name: 'amount', type: 'uint256' },
						],
						outputs: [{ name: '', type: 'bool' }],
					},
				] as const,
				address: params.token,
				functionName: 'transfer',
				args: [params.to, BigInt(params.amount)],
				chain: mantle,
				account,
			} as const

			const hash = await this.walletClient.writeContract(data)
			return hash
		} catch (error) {
			console.error('Error executing transaction:', error)
			throw error
		}
	}

	async getBalance(params: { token: `0x${string}`; address: `0x${string}` }) {
		if (!this.publicClient) {
			throw new Error('Public client not initialized')
		}

		try {
			// Use ERC20 ABI for balance checks
			const data = {
				abi: [
					{
						name: 'balanceOf',
						type: 'function',
						stateMutability: 'view',
						inputs: [{ name: 'account', type: 'address' }],
						outputs: [{ name: '', type: 'uint256' }],
					},
				] as const,
				address: params.token,
				functionName: 'balanceOf',
				args: [params.address],
				chain: mantle,
			} as const

			const balance = await this.publicClient.readContract(data)
			return balance.toString()
		} catch (error) {
			console.error('Error getting balance:', error)
			throw error
		}
	}
}

// Export singleton instance
export const goatService = new GoatService()
