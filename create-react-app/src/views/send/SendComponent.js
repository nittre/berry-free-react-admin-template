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

// ==============================|| Send - SendComponent ||============================== //

const SendComponent = ({ isLoading }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {wallet, networkProvider} = useSelector(state => state)

  const [calcGasFeeLoading, setCalcGasFeeLoading] = useState(false)
  const [step, setStep] = useState('init')
  const [txResult, setTxResult] = useState('pending')

  const handlePrevButton = () => {
	setStep('init')
  }

  const handleNextButton = () => {
	setStep('confirm')
  }

  const handleSubmit = async () => {
	setStep('load')
	const {from, to, value, gasPrice, gasLimit, selectedFeeType} = formik.values

	const tx = { from, to, value: String(etherToWei(value)), gasPrice: gasPrice[selectedFeeType], gasLimit}

	const receipt = await sendEther(networkProvider, wallet, tx)

	if (receipt) {
		setTxResult('success')
		navigate('/transaction')
	} else {
		setTxResult('fail')
		navigate('/send')
	}
  }
  
  const validateToField = (value) => {
	return isValidAddress(value)
  }

  const validationSchema = Yup.object().shape({
    to: Yup.string().required('To 필드는 필수 항목입니다.').test('validateToField', validateToField)
  });

  const formik = useFormik({
	initialValues: {
		asset: 'GoerliETH',
		value: '0',
		to: '',
		from: wallet.address,
		selectedFeeType: 'propose',
		gasPrice: {
			safe: 0,
			propose: 0,
			fast: 0
		},
		gasLimit: 0
	},
	onSubmit: handleSubmit,
	validationSchema: validationSchema
  })

  const handleValueChange = async () => {
	setCalcGasFeeLoading(true)
	const gasLimit = await getETHGasLimit(networkProvider, {
		from: wallet.address,
		to: formik.values.to,
		value: etherToWei(formik.values.value)
	})

	const gasPrice = await getGasPrice()
	if (gasPrice.data !== null){
		formik.setFieldValue('gasPrice', {
			safe: gasPrice.data.safe,
			propose: gasPrice.data.propose,
			fast: gasPrice.data.fast,
		})
	}

	formik.setFieldValue('gasLimit', gasLimit)

	setCalcGasFeeLoading(false)
  }


  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
		<MainCard title="보내기" content={false}>
			<CardContent>
				<form noValidate onSubmit={formik.handleSubmit}>
				{
					step == 'init' ? (
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
					) : (
						step == 'confirm' ? (
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
											<Button disableElevation onClick={handleSubmit} disabled={formik.isSubmitting} fullWidth={true} size="large" type="submit" variant="contained" color="secondary">
											확인 및 전송
											</Button>
										</AnimateButton>
									</Box>
								</Grid>
							</Grid>
						) : (
							<Grid container direction="column">
								<SubCard>
									<Grid container direction="column" spacing={1}>
										{
											txResult == 'pending' ? (
												<Grid item>
													<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Transaction Send Processing...</TypoGraphy>
												</Grid>
											) : (
												txResult == 'success' ? (
													<Grid item>
														<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>트랜잭션 성공! </TypoGraphy>
													</Grid>
												): (
													<Grid item>
														<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>트랜잭션 실패. 다시 시도하세요.</TypoGraphy>
													</Grid>
												)
											)
										}
									</Grid>
								</SubCard>
							</Grid>
						)
					)}
				</form>
				
				
			</CardContent>
		</MainCard>
      )}
    </>
  );
};

SendComponent.propTypes = {
  isLoading: PropTypes.bool
};

export default SendComponent;
