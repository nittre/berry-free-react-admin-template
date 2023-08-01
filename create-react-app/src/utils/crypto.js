import {ethers, formatUnits} from 'ethers'

export const createWallet = () => {
	return ethers.HDNodeWallet.createRandom()
}

export const createWalletFromPhrase = (phrase) => {
	return ethers.HDNodeWallet.fromPhrase(phrase)
}

export const getBalance = async (provider, address)=> {
	const balance = await provider.getBalance(address)
	return balance
}

export const weiToEther = (value, decimal = 18, ceil = 7) => {
	return formatUnits(value, decimal).slice(0, ceil)
}

// export interface GasLimitResponse {
// 	message: string
// 	gasLimit: bigint | null
// }

// export interface GasPrice {
// 	safe: bigint
// 	propose: bigint
// 	fast: bigint
// }

// export interface GasPriceResponse {
// 	message: string
// 	data: GasPrice | null
// }



// export const getTokenBalance = async (
// 	tokenAddress: string,
// 	provider: InfuraProvider,
// 	account: string,
// ): Promise<any> => {
// 	const contract = new ethers.BaseContract(tokenAddress, erc20abi, provider)
// 	const getBalance = contract.getFunction('balanceOf')

// 	const result = await getBalance(account)

// 	return result
// }

// export const ethToWei = (value: string, decimal = 18): bigint => {
// 	return parseUnits(value, decimal)
// }

// export const weiToGwei = (value: number): bigint => {
// 	return BigInt(formatUnits(BigInt(value), 'gwei'))
// }

// export const isValidAddress = (address: string): boolean => {
// 	try {
// 		return ethers.isAddress(address)
// 	} catch (e) {
// 		return false
// 	}
// }

// export const getETHGasLimit = async (
// 	provider: InfuraProvider,
// 	tx: TxType,
// ): Promise<GasLimitResponse> => {
// 	try {
// 		const gasLimit = await provider.estimateGas({
// 			from: tx.from,
// 			to: tx.to,
// 			value: tx.value,
// 		})
// 		return {
// 			message: 'success',
// 			gasLimit,
// 		}
// 	} catch (e) {
// 		const { code } = JSON.parse(JSON.stringify(e))
// 		return {
// 			message: code,
// 			gasLimit: BigInt(0),
// 		}
// 	}
// }

// export const getPopulatedTx = async (
// 	contract: Contract,
// 	method: string,
// 	args: any[],
// ): Promise<ContractTransaction> => {
// 	const populatedTx = await contract[method].populateTransaction(...args)
// 	return populatedTx
// }

// export const getTokenGasLimit = async (
// 	provider: InfuraProvider,
// 	from: string,
// 	contract: Contract,
// 	method: string,
// 	args: any[],
// ): Promise<GasLimitResponse> => {
// 	try {
// 		const populatedTx = await getPopulatedTx(contract, method, args)

// 		const gasLimit = await provider.estimateGas({
// 			from,
// 			to: populatedTx.to,
// 			data: populatedTx.data,
// 		})
// 		return {
// 			message: 'success',
// 			gasLimit,
// 		}
// 	} catch (e) {
// 		console.error(e)
// 		const { code } = JSON.parse(JSON.stringify(e))
// 		return {
// 			message: code,
// 			gasLimit: BigInt(0),
// 		}
// 	}
// }

// export const getProperGasPrice = async (): Promise<GasPriceResponse> => {
// 	const apiKey = process.env.REACT_APP_ETHERSCAN_KEY

// 	try {
// 		if (apiKey !== undefined) {
// 			const result = await axios.get(
// 				`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`,
// 			)
// 			const { SafeGasPrice, ProposeGasPrice, FastGasPrice, suggestBaseFee } =
// 				result.data.result

// 			return {
// 				data: {
// 					safe: BigInt(Math.ceil(Number(SafeGasPrice) * 1000000000)),
// 					propose: BigInt(Math.ceil(Number(ProposeGasPrice) * 1000000000)),
// 					fast: BigInt(Math.ceil(Number(FastGasPrice) * 1000000000)),
// 				},
// 				message: 'success',
// 			}
// 		} else {
// 			return {
// 				data: null,
// 				message: 'no etherscan api key',
// 			}
// 		}
// 	} catch (e: any) {
// 		const { code } = JSON.parse(JSON.stringify(e))
// 		return {
// 			message: code,
// 			data: null,
// 		}
// 	}
// }

// export const hashingPassword = (password: string): string => {
// 	const salt = process.env.PASSWORD_SALT
// 	if (salt !== '' && salt !== undefined && salt !== null) {
// 		return pbkdf2(toUtf8Bytes(password, 'NFKC'), id(salt), 1, 32, 'sha512')
// 	} else {
// 		return 'something wrong'
// 	}
// }

// export const importAccount = (privateKey: string): Wallet => {
// 	return new Wallet(privateKey)
// }

// export const comparePassword = (
// 	password: string,
// 	hashedPassword: string,
// ): boolean => {
// 	return hashedPassword == hashingPassword(password)
// }

// export const encryptWallet = (
// 	hdnodewallet: ethers.HDNodeWallet,
// 	password: string,
// ) => {
// 	return CryptoJS.AES.encrypt(JSON.stringify(hdnodewallet), password).toString()
// }

// export const decryptWallet = (encryptedWallet: string, password: string) => {
// 	return CryptoJS.AES.decrypt(encryptedWallet, password)
// }

// export const createAccount = (wallet: HDNodeWallet): WalletResponse => {
// 	if (wallet.mnemonic == null) {
// 		return { message: 'no wallet' }
// 	}
// 	return HDNodeWallet.fromMnemonic(
// 		wallet.mnemonic,
// 		`m/44'/60'/${wallet.index + 1}'/0/0`,
// 	)
// }
