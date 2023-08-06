import { BaseContract, ethers, formatUnits, parseUnits } from 'ethers'
import axios from 'axios'
import { erc20abi } from './erc20abi'

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

export const etherToWei = (value, decimal = 18) => {
	return parseUnits(value, decimal)
}

export const weiToEther = (value, decimal = 18, ceil = 7) => {
	return formatUnits(value, decimal).slice(0, ceil)
}

export const isValidAddress = (address) => {
	try {
		return ethers.isAddress(address)
	} catch (e) {
		return false
	}
}

export const getGasPrice = async ()=> {
	const apiKey = process.env.REACT_APP_ETHERSCAN_KEY

	try {
		const result = await axios.get(
			`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`,
		)

		const { SafeGasPrice, ProposeGasPrice, FastGasPrice } =
			result.data.result
		return {
			data: {
				safe: BigInt(Math.ceil(Number(SafeGasPrice) * 1000000000)),
				propose: BigInt(Math.ceil(Number(ProposeGasPrice) * 1000000000)),
				fast: BigInt(Math.ceil(Number(FastGasPrice) * 1000000000)),
			},
			message: 'success',
		}
	} catch (e) {
		const { code } = JSON.parse(JSON.stringify(e))
		return {
			message: code,
			data: null,
		}
	}
}

export const getETHGasLimit = () => {
	return 21000n
}

export const sendEther = async (provider, wallet, tx) => {
	try {
		const signer = wallet.connect(provider)
		const nonce = await signer.getNonce()
		const txResponse = await signer.sendTransaction({...tx, nonce})
		const txReceipt = await txResponse.wait()

		return true
	} catch(e) {
		console.error(e)
		return false
	}	
}

export const importTokenContract = async (provider, contractAddress, abi = erc20abi) => {
	const contract = new BaseContract(contractAddress, abi, provider)
	const getSymbol = contract.getFunction('symbol')
	const getDecimals = contract.getFunction('decimals')
	
	const symbol = await getSymbol()
	const decimals = await getDecimals()
	return {symbol, decimals}
}

export const getTokenBalance = async (
	provider,
	tokenAddress,
	accountAddress,
)=> {
	const contract = new ethers.BaseContract(tokenAddress, erc20abi, provider)
	const getBalance = await contract.getFunction('balanceOf')
	const result = await getBalance(accountAddress)

	return result
}

export const getPopulatedTx = async (
	provider,
	contractAddress,
	method,
	args,
) => {
	const contract = new BaseContract(contractAddress, erc20abi, provider)
	const populatedTx = await contract[method].populateTransaction(...args)
	return populatedTx
}

export const getTokenGasLimit = async (
	provider,
	from,
	contractAddress,
	method,
	args,
) => {
	try {
		const populatedTx = await getPopulatedTx(provider, contractAddress, method, args)

		const gasLimit = await provider.estimateGas({
			from,
			to: populatedTx.to,
			data: populatedTx.data,
		})
		return gasLimit
	} catch (e) {
		console.error(e)
		const { code } = JSON.parse(JSON.stringify(e))
		return BigInt(0)
	}
}

export const getBlockHeight = async (provider) => {
	const height = await provider.getBlockNumber()
	return height
}

export const getUserNormalTransaction = async (address, startBlock, endBlock) => {
	const apiKey = process.env.REACT_APP_ETHERSCAN_KEY

	const url = `https://api-goerli.etherscan.io/api
		?module=account
		&action=txlist
		&address=${address}
		&startblock=${startBlock}
		&endblock=${endBlock}
		&sort=asc
		&page=1
		&offset=10
		&apikey=${apiKey}
		`		

	const result = await axios.get(url)
	return result.data.result
}

export const getUserTokenTransferEvents = async(walletAddress, contractAddress, startBlock, endBlock) => {
	const apiKey = process.env.REACT_APP_ETHERSCAN_KEY

	const url = `https://api-goerli.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&page=1&offset=100&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${apiKey}`

	const result = await axios.get(url)
	return result.data.result
}


// export const weiToGwei = (value: number): bigint => {
// 	return BigInt(formatUnits(BigInt(value), 'gwei'))
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
