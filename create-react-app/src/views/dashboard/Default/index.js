import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid } from '@mui/material';

// project imports
import AccountInfoCard from './AccountInfoCard';
import NetworkStatusCard from './NetworkStatusCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlockHeight, getUserNormalTransaction, getUserTokenTransferEvents } from 'utils/crypto';
import TokenList from './TokenList';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { InfuraProvider } from 'ethers';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { wallet, networkProvider, blockNumber, transaction } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(false);
  const[ blockNumebr, setBlockNumber ] = useState('')

//   useEffect(() => {
// 	async function setProvider() {
// 		setLoading(false);
// 		if (networkProvider == undefined || networkProvider == null || Object.keys(networkProvider).length == 0) {
// 			setLoading(true)
// 			dispatch({type: 'SET_PROVIDER'})
// 			setLoading(false)
// 		} 
// 	}
useEffect(() => {
	window.addEventListener('beforeunload', () => {
		dispatch({type: 'LOGOUT'})
		dispatch({type: 'RESET_TX'})
		dispatch({type: 'RESET_TOKEN'})
	})


	const localTx = localStorage.getItem('tx')
	if (localTx != null && localTx.length != 0){
		const txs = JSON.parse(localTx)
		for (const tx of txs){
			if (transaction.tx.filter(t => t.hash === tx.hash).length == 0){
				dispatch({type: 'ADD_TRANSACTION', payload: {tx}})
			}
		}
	} else {
		localStorage.setItem('tx', JSON.stringify([]))
	}
	
  }, []);

  useEffect(() => {
	if (Object.keys(wallet).length == 0) {
		navigate('/login')
	} 


  })


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <AccountInfoCard isLoading={isLoading} wallet={wallet} networkProvider={networkProvider} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <NetworkStatusCard isLoading={isLoading} blockNumber={blockNumebr} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
		<Grid item lg={12} md={12} xs={12}>
			<TokenList isLoading={isLoading} />
		</Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
