import {useState, useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';


import { useDispatch, useSelector } from 'react-redux';
import { getUserNormalTransaction, getUserTokenTransferEvents } from 'utils/crypto';


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { wallet, networkProvider } = useSelector(state => state)
  const dispatch = useDispatch()
  const [networkProviderConnected, setNetworkProviderConnected] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

	if (networkProvider == undefined || networkProvider == null || Object.keys(networkProvider).length == 0) {
		dispatch({type: 'SET_PROVIDER'})
		setNetworkProviderConnected(true)
	} 

  useEffect(() => {
		window.addEventListener('beforeunload', () => {
			dispatch({type: 'LOGOUT'})
			dispatch({type: 'RESET_TX'})
			dispatch({type: 'RESET_TOKEN'})
		})
  }, []);

  useEffect(() => {
		if (Object.keys(wallet).length > 0) {
			setWalletConnected(true)
		}
  }, [wallet])

  useEffect(() => {
		const locTx = localStorage.getItem('tx')
		if (locTx == null || locTx == undefined) {
			localStorage.setItem('tx', JSON.stringify([]))
		}
		async function subscribeBlocks() {
		/* TO-DO : 블록을 구독합니다.
		 * 조건 1. Provider가 연결되어 있고, 지갑이 복구되어 있을 때만 구독해야 합니다.
		 * 조건 2. ethers.js에서는 provider.on('block', (blockNum) => {...})과 같은 형식으로 블록을 구독할 수 있습니다.
		 * 조건 3. 블록 넘버는 리덕스 상태 변수로 관리됩니다. 블록이 업데이트 될 때마다 	dispatch({type: 'UPDATE_BLOCKNUMBER', payload: {blockNumber}})를 호출합니다.
		*/

		/* TO-DO : 트랜잭션 데이터를 가져옵니다
		 * 조건 1. 블록이 생성될 때마다, 현재 계정과 관련된 트랜잭션이 있는지 확인합니다.
		 * 조건 2. utils/crypto.js의 getUserNormalTransaction() 함수를 사용하세요.
		 * 조건 3. getUserNormalTransaction() 함수를 반환한 결과값은 리덕스 상태 변수 tx에 저장하세요.
		 * 조건 4. 또한 localStroge에도 저장합니다. 
		*/
					/*
					// ----- get token data ----- //
					const locToken = localStorage.getItem('tokens')
					if (locToken != null && locToken.length != 0){
						const tokens = JSON.parse(locToken)
						for (const token of tokens){
							const tokenTransferEvents = await getUserTokenTransferEvents(wallet.address, token.tokenAddress, blockNumber-1, blockNumber-1, new Date())
							if (tokenTransferEvents.length > 0){
								for (const tokenTransferEvent of tokenTransferEvents){
									const tx = {
										hash: tokenTransferEvent.hash,
										from: tokenTransferEvent.from,
										to: tokenTransferEvent.to,
										value: tokenTransferEvent.value,
										blockNumber: tokenTransferEvent.blockNumber,
										tokenName: tokenTransferEvent.tokenName,
										tokenDecimal: tokenTransferEvent.tokenDecimal,
										tokenSymbol: tokenTransferEvent.tokenSymbol,
										type: 'token-transfer'
									}
									dispatch({type: 'ADD_TRANSACTION', payload: {tx: tx}})
								
									const txList = JSON.parse(localStorage.getItem('tx'))
									txList.push(tx)
									localStorage.setItem('tx', JSON.stringify(txList))
								}
							}

						}
					}

					*/
				// })
			// }
		}
		subscribeBlocks()
  }, [networkProviderConnected, walletConnected])


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
