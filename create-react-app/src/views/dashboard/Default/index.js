import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import AccountInfoCard from './AccountInfoCard';
import NetworkStatusCard from './NetworkStatusCard';
import PopularCard from './PopularCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlockHeight } from 'utils/crypto';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { wallet, networkProvider, transaction } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(true);
  const[ blockNumebr, setBlockNumber ] = useState('')

  useEffect(() => {
	setLoading(false);
	if (Object.keys(networkProvider).length == 0) {
		setLoading(true)
		dispatch({type: 'SET_PROVIDER'})
		setLoading(false)
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
						const tx = await networkProvider.getTransaction(txHash)
						if (tx !== null && (tx.to === wallet.address || tx.from === wallet.address)) {
							dispatch({type: 'ADD_TRANSACTION', payload: {
								tx
							}})
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
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <AccountInfoCard isLoading={isLoading} wallet={wallet} networkProvider={networkProvider} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NetworkStatusCard isLoading={isLoading} blockNumber={blockNumebr} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
