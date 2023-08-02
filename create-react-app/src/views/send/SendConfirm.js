import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Typography } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';

// third party
import * as Yup from 'yup';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { etherToWei, getETHGasLimit, getGasPrice, isValidAddress, sendEther, weiToEther } from 'utils/crypto';
import { useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import GasFeeCard from './GasFeeCard';
import SubCard from 'ui-component/cards/SubCard';
import { useNavigate } from 'react-router';

// ==============================|| Send - SendConfirm ||============================== //

const SendConfirm =({ formik, handleStep, handleFormikValue }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const {wallet, networkProvider} = useSelector(state => state)

  const handleNextButton = async () => {
	handleStep('load')

	const {from, to, value, gasPrice, gasLimit, selectedFeeType} = formik.values

	const tx = { from, to, value: String(etherToWei(value)), gasPrice: gasPrice[selectedFeeType], gasLimit}

	const receipt = await sendEther(networkProvider, wallet, tx)

	if (receipt) {
		handleFormikValue('txResult', 'success')
		navigate('/transaction')
	} else {
		handleFormikValue('txResult', 'fail')
		navigate('/send')
	}
  }

 

  const handlePrevButton = () => {
	handleStep('init')
  }

  return (
	<Grid container direction="column">
		<SubCard>
			<Grid container direction="column" spacing={1}>
				<Grid item>
					<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>From: {wallet.address} GoerliETH</TypoGraphy>
				</Grid>
				<Grid item>
					<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>To: {formik.values.to} GoerliETH</TypoGraphy>
				</Grid>
				<Grid item>
					<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Amount: {formik.values.value} GoerliETH</TypoGraphy>
				</Grid>
				<Grid item>
					<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Gas Fee: {weiToEther(formik.values.gasPrice[formik.values.selectedFeeType]*formik.values.gasLimit)} GoerliETH</TypoGraphy>
				</Grid>
				<Grid item>
					<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Total: {weiToEther(etherToWei(formik.values.value) + (formik.values.gasPrice[formik.values.selectedFeeType]*formik.values.gasLimit))} GoerliETH</TypoGraphy>
				</Grid>
			</Grid>
		</SubCard>
		<Grid container direction="row">
			<Box sx={{ mt: 2, flexGrow: 1, padding: '0.1rem' }}>
				<AnimateButton>
					<Button disableElevation onClick={handlePrevButton} fullWidth={true} size="large" type="submit" variant="contained" sx={{
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
					<Button disableElevation onClick={handleNextButton} fullWidth={true} size="large" variant="contained" color="secondary">
					확인 및 전송
					</Button>
				</AnimateButton>
			</Box>
		</Grid>
	</Grid>
  );
};

SendConfirm.propTypes = {
  formik: PropTypes.object,
  handleStep: PropTypes.func,
  handleFormikValue: PropTypes.func
};

export default SendConfirm;
