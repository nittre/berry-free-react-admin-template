import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Typography } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { etherToWei, getETHGasLimit, getGasPrice, getTokenBalance, importTokenContract, isValidAddress, sendEther, weiToEther } from 'utils/crypto';
import { useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import GasFeeCard from '../send/GasFeeCard';
import SubCard from 'ui-component/cards/SubCard';
import { useNavigate } from 'react-router';

// ==============================|| Import - ImportTokenConfirm ||============================== //

const ImportTokenConfirm = ({ isLoading, handleStep, formik, updateFormikValue }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const {networkProvider, wallet} = useSelector(state => state)

  const handlePrevButton = () => {
	handleStep('init')
  }

  const handleNextButton = () => {
	const locTokens = localStorage.getItem('tokens')
	if (locTokens !== null && locTokens.length !== 0){
		localStorage.setItem('tokens', [...JSON.parse(locTokens), formik.values])
	} else {
		localStorage.setItem('tokens', JSON.stringify([formik.values]))
	}
	navigate('/')
  }

  useEffect(() => {
	async function getBalance() {
		const balance = await getTokenBalance(networkProvider, formik.values.tokenAddress, wallet.address)
		updateFormikValue('balance', String(weiToEther(balance, formik.values.decimals)))
	}

	getBalance()
  }, [])

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
		<MainCard title="토큰 가져오기" >
			<CardContent>
				<Grid container direction="column">
					<Grid item>
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 600 }}>아래 토큰을 가져올까요?</TypoGraphy>
					</Grid>
					<Grid item>
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>{formik.values.tokenSymbol}{formik.values.balance}</TypoGraphy>
					</Grid>
					
					<Grid container direction="row">
						<Box sx={{ mt: 2, flexGrow: 1, padding: '0.1rem' }}>
							<AnimateButton>
								<Button disableElevation onClick={handlePrevButton} disabled={formik.isSubmitting} fullWidth={true} size="large" type="submit" variant="contained" sx={{
									bgcolor: theme.palette.secondary.light,
									color: "#5f5f5f",
									"&:hover": {
										bgcolor: theme.palette.secondary['200'],
										color: "#0d0d0d",
									}
								}}>
								이전
								</Button>
							</AnimateButton>
						</Box>
						<Box sx={{ mt: 2, flexGrow: 1, padding: '0.1rem' }}>
							<AnimateButton>
								<Button disableElevation onClick={handleNextButton} disabled={formik.isSubmitting} fullWidth={true} size="large" type="submit" variant="contained" color="secondary">
								확인
								</Button>
							</AnimateButton>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</MainCard>
      )}
    </>
  );
};

ImportTokenConfirm.propTypes = {
  isLoading: PropTypes.bool,
  handleStep: PropTypes.func,
  formik: PropTypes.object,
  updateFormikValue: PropTypes.func
};

export default ImportTokenConfirm;
