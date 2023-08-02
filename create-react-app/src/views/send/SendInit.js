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

// ==============================|| Send - SendInit ||============================== //

const SendInit = ({ isLoading, formik, handleFormikValue, handleStep }) => {
  const theme = useTheme();
  const {wallet, networkProvider} = useSelector(state => state)

  const [calcGasFeeLoading, setCalcGasFeeLoading] = useState(false)
  const [step, setStep] = useState('init')
  const [txResult, setTxResult] = useState('pending')

  const handleValueChange = async () => {
	setCalcGasFeeLoading(true)
	const gasLimit = await getETHGasLimit(networkProvider, {
		from: wallet.address,
		to: formik.values.to,
		value: etherToWei(formik.values.value)
	})

	const gasPrice = await getGasPrice()
	if (gasPrice.data !== null){
		handleFormikValue('gasPrice', {
			safe: gasPrice.data.safe,
			propose: gasPrice.data.propose,
			fast: gasPrice.data.fast,
		})
	}

	handleFormikValue('gasLimit', gasLimit)

	setCalcGasFeeLoading(false)
  }

  const handleNextButton = () => {
	handleStep('confirm')
  }

  return (
	<Grid container direction="column">
		<Grid container item direction="row">
			<FormControl sx={{...theme.typography.customInput, flexGrow: 1, marginRight: '10px'}}>
				<InputLabel htmlFor="asset">asset</InputLabel>
				<OutlinedInput
					id="asset"
					type="text"
					name="asset"
					defaultValue="GoerliETH"
					onChange={formik.handleChange}
				/>
			</FormControl>
			<FormControl sx={{...theme.typography.customInput, flexGrow: 1}}>
				<InputLabel htmlFor="value">amount</InputLabel>
				<OutlinedInput
					id="value"
					type="text"
					name="value"
					value={formik.values.value}
					onChange={(e) => {
						formik.handleChange(e)
						handleValueChange(e)
					}}
				/>
			</FormControl>
		</Grid>
		<FormControl sx={{...theme.typography.customInput, flex: 1}}>
			<InputLabel htmlFor="to">to</InputLabel>
			<OutlinedInput
				id="to"
				type="text"
				name="to"
				value={formik.values.to}
				onChange={formik.handleChange}
			/>
		</FormControl>
		{formik.errors.to && (
		<Box sx={{ color: 'red', fontSize: '0.75rem' }}>{formik.errors.to}</Box>
		)}
		<FormControl sx={{flex: 1}}>
			<FormLabel id="fee-type-radio-group" sx={{...theme.typography.customInput, flex: 1}}>Fee Type</FormLabel>
			<RadioGroup aria-labelledby="fee-type-radio-group" name="selectedFeeType" defaultValue="propose" value={formik.values.selectedFeeType} onChange={formik.handleChange}>
				<Grid container direction="row" justifyContent="space-evenly">
					<FormControlLabel value="safe" control={<Radio checked={formik.values.selectedFeeType === 'safe'} />} label="Safe" />
					<FormControlLabel value="propose" control={<Radio checked={formik.values.selectedFeeType === 'propose'} />} label="Propose" />
					<FormControlLabel value="fast" control={<Radio checked={formik.values.selectedFeeType === 'fast'} />} label="Fast" />
				</Grid>
			</RadioGroup>
		</FormControl>
		<GasFeeCard calcGasFeeLoading={calcGasFeeLoading} isLoading={isLoading} gasPrice={formik.values.gasPrice[formik.values.selectedFeeType]} gasLimit={formik.values.gasLimit} />
		<Box sx={{ mt: 2 }}>
			<AnimateButton>
				<Button disableElevation onClick={handleNextButton} disabled={formik.isSubmitting} fullWidth={true} size="large" variant="contained" color="secondary">
				다음
				</Button>
			</AnimateButton>
		</Box>
	</Grid>
  );
};

SendInit.propTypes = {
  isLoading: PropTypes.bool,
  formik: PropTypes.object,
  handleFormikValue: PropTypes.func,
  handleStep: PropTypes.func
};

export default SendInit;
