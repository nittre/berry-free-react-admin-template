import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import TransactionList from './TransactionList';

// ==============================|| TRANSACTION ||============================== //

const Transaction = () => {
  const { wallet, networkProvider } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
	setLoading(false);
	if (Object.keys(networkProvider).length == 0) {
		setLoading(true)
		dispatch({type: 'SET_PROVIDER'})
		setLoading(false)
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
            <TransactionList isLoading={isLoading} />
          </Grid>
    </Grid>
  );
};

export default Transaction;
