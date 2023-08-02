import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import AccountInfoCard from '../dashboard/Default/AccountInfoCard';
import NetworkStatusCard from '../dashboard/Default/NetworkStatusCard';
import PopularCard from '../dashboard/Default/PopularCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlockHeight } from 'utils/crypto';
import MainCard from 'ui-component/cards/MainCard';
import SendComponent from './SendComponent';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Send = () => {
  const { wallet, networkProvider, transaction } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(true);
  const[ blockNumebr, setBlockNumber ] = useState('')

  useEffect(() => {
	setLoading(false);
	
  }, []);

  

  useEffect(() => {
	if (Object.keys(wallet).length == 0) {
		navigate('/wallet')
	} 
  })

  return (
    <Grid container direction="column" sx={{ maxHeight: '100vh' }}>
		<SendComponent isLoading={isLoading} />
    </Grid>
  );
};

export default Send;
