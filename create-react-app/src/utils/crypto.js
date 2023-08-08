import { BaseContract, ethers, formatUnits, parseUnits } from 'ethers'
import axios from 'axios'
import { erc20abi } from './erc20abi'

export const createWallet = () => {
	/* TO-DO : 새로운 지갑을 생성합니다.
	 * 조건 1. ethers.js를 사용합니다.
	 * 조건 2. HDNodeWallet을 생성하세요.
	*/
}

export const createWalletFromPhrase = (phrase) => {
	/* TO-DO : 니모닉 구문으로부터 지갑을 복구합니다.
	 * 조건 1. ethers.js를 사용합니다.
	 * 조건 2. HDNodeWallet의 fromPhrase() 메서드를 사용합니다.
	*/
}

export const getBalance = async (provider, address)=> {
	/* TO-DO : 계정의 잔액을 가져오세요.
	 * 조건 1. provider.getBalance()를 통해 특정 계정의 잔액을 가져올 수 있습니다. 
	*/
}

export const etherToWei = (value, decimal = 18) => {
	return parseUnits(value, decimal)
}

export const weiToEther = (value, decimal = 18, ceil = 7) => {
	/* TO-DO : wei를 이더 형식으로 변환해주는 함수를 작성하세요.
	 * 조건 1. ethers.js의 formatUnits() 메서드를 사용하세요.
	 * 조건 2. value는 단위를 변경해야 할 값이며, decimal을 기준으로 변경한 후, ceil만큼 올림해야 합니다.
	*/
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
		/* TO-DO : 이더스캔 API를 사용해 적절한 가스 가격을 가져옵니다.
		 * 조건 1. 이더스캔 API에는 현재 네트워크에서 트랜잭션을 수행하기 위한 적절한 가스 가격을 제공하고 있습니다.  
		 * 조건 2. `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`로 GET 요청을 보낼 수 있습니다.
		 * 조건 3. 결과값을 각각 SafeGasPrice, ProposeGasPrice, FastGasPrice 변수에 담으세요.
		*/
		
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
		/* TO-DO : 이더를 전송하는 함수를 작성하세요.
		 * 조건 1. ethers.js를 사용합니다.
		 * 조건 2. 지갑을 네트워크에 연결해야 합니다. wallet.connect() 메서드를 사용하세요.
		 * 조건 3. 트랜잭션을 전송하기 위해서는 계정의 논스를 정확히 설정해야 합니다. signer.getNonce() 메서드를 사용하세요.
		 * 조건 4. signer.sendTransaction() 메서드를 사용해 트랜잭션을 전송합니다.
		 * 조건 5. 트랜잭션이 네트워크에 올라가고, 블록에 담겨 transaction receipt가 올 때까지 기다렸다가, receipt가 오면 성공 및 실패 여부를 반환합니다. 
		*/
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
