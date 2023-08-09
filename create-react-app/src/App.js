import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from 'routes';
import themes from 'themes';
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
		 * 조건 4. 또한 로컬스토리지에도 저장합니다. 
		 * 조건 5. 트랜잭션에는 hash, from, to, value, blockNumber, tokenName, tokenDecimal, tokenSymbol, type이 들어가야 합니다.
		 *  - tokenName과 tokenSymbol은 'GoerliETH' 값을 넣습니다.
		 *  - tokenDecimal은 18로 설정합니다.
		 *  - 이더 전송 트랜잭션의 type은 'send-ether' 값을 넣습니다.
		*/

		/* TO-DO : 토큰 Transfer 이벤트를 가져옵니다.
		 * 조건 1. 로컬 스토리지에 import한 토큰 목록이 담겨 있습니다. 블록이 생성될 때마다, 현재 계정과 관련된 토큰 Transfer 이벤트가 있는지 확인합니다.
		 * 조건 2. utils/crypto.js의 getUserTokenTransferEvents() 함수를 사용하세요.
		 * 조건 3. getUserTokenTransferEvents() 함수를 반환한 결과값은 리덕스 상태 변수 tx에 저장합니다.
		 * 조건 4. 또한 로컬스토리지에도 저장합니다.
		 * 조건 5. 트랜잭션에는 hash, from, to, value, blockNumber, tokenName, tokenDecimal, tokenSymbol, type이 들어가야 합니다.
		 *  - to에는 컨트랙트 주소가 아닌, 실제로 토큰을 받은 계정 주소가 들어가야 합니다.
		 * 	- value에는 이더가 아닌 실제로 전송한 토큰의 양이 들어가야 합니다.
		 *  - tokenName에는 해당 토큰의 이름이 들어가야 합니다. 없다면, 심볼을 넣습니다.
		 * 	- tokenDecimal: 해당 토큰의 decimal을 넣습니다.
		 *  - tokenSymbol: 해당 토큰의 심볼을 넣습니다.
		 *  - type: Transfer 이벤트에 대한 트랜잭션에는 'token-transfer' 값을 넣습니다.
		*/
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
