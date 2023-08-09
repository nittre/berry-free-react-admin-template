import { CardContent, Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { getTokenBalance, weiToEther } from 'utils/crypto';

// ==============================|| DASHBOARD DEFAULT - TOKEN LIST CARD ||============================== //

const TokenList = ({ isLoading, wallet, networkProvider}) => {
  const theme = useTheme();
  const [token, setToken] = useState([])

  const updateTokenBalance = async () => {
		const locTokens = localStorage.getItem('tokens')
		if (locTokens !== null && locTokens.length !== 0){
			const tokens = JSON.parse(locTokens)
			for (const t of tokens){
				const balance = await getTokenBalance(networkProvider, t.tokenAddress, wallet.address, new Date())
				setToken([...token, {...t, balance: weiToEther(balance, t.tokenDecimals)}])
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
		{ isLoading ? (
			<SkeletonEarningCard />
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
  isLoading: PropTypes.bool,
  wallet: PropTypes.object,
  networkProvider: PropTypes.object
};

export default TokenList;
