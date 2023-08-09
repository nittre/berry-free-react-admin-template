import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { etherToWei, getETHGasLimit, getGasPrice, getPopulatedTx, getTokenGasLimit } from 'utils/crypto';
import GasFeeCard from './GasFeeCard';

// ==============================|| SEND - SendInit ||============================== //

const SendInit = ({ isLoading, formik, handleFormikValue, handleStep }) => {
  const theme = useTheme();
  const {wallet, networkProvider} = useSelector(state => state)

  const [calcGasFeeLoading, setCalcGasFeeLoading] = useState(false)
  const [token, setToken] = useState([])

  const handleValueChange = async (e, value, to) => {
		setCalcGasFeeLoading(true)

		if (value != 0 && to.length != 0){
			/* TO-DO : 이더를 전송하기 위한 Gas Limit을 구합니다.
			 * 조건 1. utils/crypto.js의 getETHGasLimit() 함수를 사용하세요.
			 * 조건 2. 결과값을 gasLimit 변수에 저장하세요.
			*/

			/* TO-DO : 토큰을 전송하기 위한 적절한 가스 리밋을 가져옵니다.
			 * 조건 1. utils/crypto.js의 getTokenGasLimit() 함수를 사용하세요.
			 * 조건 2. 결과값을 gasLimit 변수에 저장하세요.
			*/

			/* TO-DO : 토큰 컨트랙트의 transfer 메서드를 호출하기 위한 data를 구합니다.
			 * 조건 1. 토큰의 transfer 메서드를 호출하는 작업을 16진수화 해야 합니다. utils/crypto.js의 getPopulatedTx() 함수를 사용하세요.
			 * 조건 2. 결과값을 formik value의 'data'에 넣어주세요.
			*/

			/* TO-DO : 이더를 전송하기 위한 적절한 가스 가격을 가져옵니다.
			 * 조건 1. utils/crypto.js의 getGasPrice() 함수를 사용하세요. 
			 * 조건 2. 결과값을 gasPrice 변수값에 저장하세요.
			*/

			if (gasPrice.data !== null){
				handleFormikValue('gasPrice', {
					safe: gasPrice.data.safe,
					propose: gasPrice.data.propose,
					fast: gasPrice.data.fast,
				})
			}

			handleFormikValue('gasLimit', gasLimit)
		}

		setCalcGasFeeLoading(false)
  }

  const handleAssetChange = (e) => {
		for (const t of token) {
			if (t.tokenSymbol == e.target.value) {
				handleFormikValue('token', t)
				break
			}
		} 
  }

  const handleNextButton = () => {
		handleStep('confirm')
  }

  useEffect(() => {
		const locTokens = localStorage.getItem('tokens')
		if (locTokens !== null && locTokens.length !== 0){
			setToken(JSON.parse(locTokens))
		}
  }, [])

  return (
		<Grid container direction="column">
			<Grid container item direction="row">
				<Select sx={{...theme.typography.customInput, flexGrow: 1, marginRight: '0.5rem'}} value={formik.values.asset} onChange={(e) => {
					formik.handleChange(e)
					handleAssetChange(e)
				}} id="asset" name="asset" defaultValue="GoerliETH">
					<MenuItem key="GoerliETH" value="GoerliETH">GoerliETH</MenuItem>
					{Array.from({length: token.length}, (_, index) => {
						return <MenuItem key={index} value={token[index].tokenSymbol}>{token[index].tokenSymbol}</MenuItem>
					})}
				</Select>
				<FormControl sx={{...theme.typography.customInput, flexGrow: 3}}>
					<InputLabel htmlFor="value">amount</InputLabel>
					<OutlinedInput
						id="value"
						type="text"
						name="value"
						value={formik.values.value}
						onChange={(e) => {
							formik.handleChange(e)
							handleValueChange(e, e.target.value, formik.values.to)
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
					onChange={(e) => {
						formik.handleChange(e)
						handleValueChange(e, formik.values.value, e.target.value)
					}}
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
