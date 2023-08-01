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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { wallet, networkProvider } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
	if (Object.keys(networkProvider).length == 0) {
		dispatch({type: 'SET_PROVIDER'})
	}
	console.log(networkProvider)
  }, []);

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
            <AccountInfoCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NetworkStatusCard isLoading={isLoading} />
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
