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
		if (networkProviderConnected && walletConnected){
			networkProvider.on('block', async (blockNumber) => {
				dispatch({type: 'UPDATE_BLOCKNUMBER', payload: {blockNumber}})

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


				// ----- get ether data ----- //
				const transactions = await getUserNormalTransaction(wallet.address, blockNumber-1, blockNumber-1, new Date())
				if (transactions.length !== 0) {
					for (const transaction of transactions) {
						if (transaction.methodId == '0x') {
							const newTx = {
								hash: transaction.hash,
								from: transaction.from,
								to: transaction.to, 
								value: transaction.value,
								blockNumber: transaction.blockNumber,
								type: 'send-ether'
							}

							
							dispatch({type: 'ADD_TRANSACTION', payload: {
								tx: newTx
							}})

							const txList = JSON.parse(localStorage.getItem('tx'))
							txList.push(newTx)
							localStorage.setItem('tx', JSON.stringify(txList))
							
						}
					}
				}
				
			})
		}
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
