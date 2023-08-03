import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid } from '@mui/material';

// project imports
import AccountInfoCard from './AccountInfoCard';
import NetworkStatusCard from './NetworkStatusCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlockHeight } from 'utils/crypto';
import TokenList from './TokenList';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { InfuraProvider } from 'ethers';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { wallet, networkProvider, transaction } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(true);
  const[ blockNumebr, setBlockNumber ] = useState('')

  useEffect(() => {
	async function setProvider() {
		setLoading(false);
		if (Object.keys(networkProvider).length == 0) {
			setLoading(true)
			dispatch({type: 'SET_PROVIDER'})
			setLoading(false)
		} 
	}

	window.addEventListener('beforeunload', () => {
		dispatch({type: 'LOGOUT'})
		dispatch({type: 'RESET_TX'})
		dispatch({type: 'RESET_TOKEN'})
	})
	setProvider()

	if (localStorage.getItem('tx')){
		const localTxs = JSON.parse(localStorage.getItem('tx'))
		for (const tx of localTxs){
			if (transaction.tx.filter(t => t.hash === tx.hash).length == 0){
				dispatch({type: 'ADD_TRANSACTION', payload: {tx}})
			}
		}
	} else {
		localStorage.setItem('tx', JSON.stringify([]))
	}
  }, []);

  useEffect(() => {
	async function subscribeBlocks() {
		if (networkProvider !== undefined && Object.keys(networkProvider).length != 0){
			networkProvider.on('block', async (blockNumber) => {
				setBlockNumber(blockNumber)

				const block = await networkProvider.getBlock(blockNumber)

				if (block !== null) {
					for (const txHash of block.transactions) {
						const isExist = transaction.tx.filter(elem => elem.hash == txHash).length
						if (isExist == 0) {
							const tx = await networkProvider.getTransaction(txHash)
							if (tx !== null && (tx.to === wallet.address || tx.from === wallet.address)) {
								dispatch({type: 'ADD_TRANSACTION', payload: {
									tx
								}})
								if (localStorage.getItem('tx')){
									const localTxs = JSON.parse(localStorage.getItem('tx'))
									localTxs.push(tx)
									localStorage.setItem('tx', JSON.stringify(localTxs))
								} else {
									localStorage.setItem('tx', JSON.stringify([tx]))
								}
							}
						}
					}
				}
			})
		}
	}
	subscribeBlocks()
  }, [networkProvider])

  useEffect(() => {
	if (Object.keys(wallet).length == 0) {
		navigate('/wallet')
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
