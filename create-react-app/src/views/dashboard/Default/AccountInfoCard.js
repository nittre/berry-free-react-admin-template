import { Avatar, Box, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import EthBalanceIcon from 'assets/images/icons/ethBalance.svg';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { getBalance, weiToEther } from 'utils/crypto';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - ACCOUNT INFO CARD ||=========================== //

const AccountInfoCard = ({ isLoading, wallet, networkProvider }) => {
  const theme = useTheme();
  const [balance, setBalance] = useState('')
  
  const formatAddress = (address) => {
		return address.slice(0, 8) + '...' + address.slice(address.length - 10, address.length - 1)
  }

  useEffect(() => {
		if (networkProvider !== undefined && Object.keys(networkProvider).length !== 0 && Object.keys(wallet).length != 0){
			getBalance(networkProvider, wallet.address, new Date()).then(balance => {
				setBalance(weiToEther(balance))
			})
		}
  }, [wallet])

  return (
	<>
		{isLoading ? (
			<SkeletonEarningCard />
		) : (
			<CardWrapper border={false} content={false}>
				<Box sx={{ p: 2.25 }}>
					<Grid container direction="column">
						<Grid item>
							<Grid container justifyContent="space-between">
								<Grid item>
									<Avatar
										variant="rounded"
										sx={{
										...theme.typography.commonAvatar,
										...theme.typography.largeAvatar,
										backgroundColor: theme.palette.secondary[800],
										mt: 1
										}}
									>
										<img src={EthBalanceIcon} alt="Notification" />
									</Avatar>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
									<Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{balance} GoerliETH</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item sx={{ mb: 1.25 }}>
						<Typography
							sx={{
							fontSize: '1rem',
							fontWeight: 400,
							color: theme.palette.secondary[200]
							}}
						>
							{wallet.address ? formatAddress(wallet.address) : <></>}
						</Typography>
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		)}
	</>
  )
};

AccountInfoCard.propTypes = {
	isLoading: PropTypes.bool,
	wallet: PropTypes.object,
	networkProvider: PropTypes.object,
};

export default AccountInfoCard;
