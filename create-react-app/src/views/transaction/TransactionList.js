import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { weiToEther } from 'utils/crypto';
import { useEffect } from 'react';

// ==============================|| Transaction - TransactionList ||============================== //

const TransactionList = ({ isLoading }) => {
  const theme = useTheme();
  const {tx} = useSelector(state => state.transaction)
  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard title="토큰 목록" content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                  {
					Array.from({length: tx.length}, (_, index) => {
						return (
						<Grid container direction="column" key={index}>
							<Grid item>
							<Grid container alignItems="center" justifyContent="space-between">
							<Grid item>
								<Typography variant="subtitle1" color="inherit">
									block: {tx[index].blockNumber}
								</Typography>
							</Grid>
							</Grid>
							<Grid container alignItems="center" justifyContent="space-between">
							<Grid item>
								<Typography variant="subtitle1" color="inherit">
									txHash: {tx[index].hash}
								</Typography>
							</Grid>
							</Grid>
							<Grid container alignItems="center" justifyContent="space-between">
							<Grid item>
								<Typography variant="subtitle1" color="inherit">
									from: {tx[index].from}
								</Typography>
							</Grid>
							<Grid item>
								<Grid container alignItems="center" justifyContent="space-between">
								<Grid item>
									<Typography variant="subtitle1" color="inherit">
										to: {tx[index].to}
									</Typography>
								</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<Grid container alignItems="center" justifyContent="space-between">
								<Grid item>
									<Typography variant="subtitle1" color="inherit">
									value: {weiToEther(tx[index].value)} GoerliETH
									</Typography>
								</Grid>
								</Grid>
							</Grid>
							</Grid>
						</Grid>
						</Grid>)
					})
				
				}
               
                <Divider sx={{ my: 1.5 }} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TransactionList.propTypes = {
  isLoading: PropTypes.bool
};

export default TransactionList;
