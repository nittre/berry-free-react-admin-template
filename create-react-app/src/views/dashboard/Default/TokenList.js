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
import { getTokenBalance, weiToEther } from 'utils/crypto';
import { useEffect } from 'react';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const TokenList = ({ isLoading }) => {
  const theme = useTheme();
  const { wallet, networkProvider } = useSelector(state => state)
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateTokenBalance = async () => {
	const locTokens = localStorage.getItem('tokens')
	if (locTokens !== null && locTokens.length !== 0){
		const tokens = JSON.parse(locTokens)
		for (const t of tokens){
			const balance = await getTokenBalance(networkProvider, t.tokenAddress, wallet.address)
			token.push({...t, balance: weiToEther(balance, t.tokenDecimals)})
		}
	}
  }

  useEffect( () => {
	if (networkProvider !== undefined) {
		updateTokenBalance()
	}
  }, [])
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing} sx={{flexGrow: 1}}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h3">토큰 목록</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {
					Array.from({length: token.length}, (_, index) => {
						return (
							<Grid item key={index}>
								<Grid container alignItems="center" justifyContent="space-between">
								<Grid item>
									<Typography variant="subtitle1" color="inherit">
										{token[index].tokenSymbol}
									</Typography>
								</Grid>
								<Grid item>
									<Grid container alignItems="center" justifyContent="space-between">
									<Grid item>
										<Typography variant="subtitle1" color="inherit">
										{token[index].balance} {token[index].tokenSymbol}
										</Typography>
									</Grid>
									</Grid>
								</Grid>
								</Grid>
							</Grid>
						)
					})
				}
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TokenList.propTypes = {
  isLoading: PropTypes.bool
};

export default TokenList;
