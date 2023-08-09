import { Box, Button, Grid } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { etherToWei, sendEther, weiToEther } from 'utils/crypto';

// ==============================|| SEND - SendConfirm ||============================== //

const SendConfirm =({ formik, handleStep, handleFormikValue }) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const {wallet, networkProvider} = useSelector(state => state)

  const handleNextButton = async () => {
		handleStep('load')

		const {from, to, value, gasPrice, gasLimit, selectedFeeType, data, token, asset} = formik.values

		/* TO-DO : 주어진 트랜잭션 데이터를 사용해 이더를 전송하세요.
		 * 조건 1. utils/crypto.js의 sendEther() 함수를 사용하세요.
		 * 조건 2. sendEther()의 반환값을 result 변수에 할당하세요.
		*/
		
		if (result) {
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
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>From: {wallet.address} </TypoGraphy>
					</Grid>
					<Grid item>
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>To: {formik.values.to} </TypoGraphy>
					</Grid>
					<Grid item>
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Amount: {formik.values.value} {formik.values.asset} </TypoGraphy>
					</Grid>
					<Grid item>
						<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Gas Fee: {weiToEther(formik.values.gasPrice[formik.values.selectedFeeType]*formik.values.gasLimit)} GoerliETH</TypoGraphy>
					</Grid>
					<Grid item>
						{
							formik.values.asset === 'GoerliETH' ? (
								<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Total: {weiToEther(etherToWei(formik.values.value) + (formik.values.gasPrice[formik.values.selectedFeeType]*formik.values.gasLimit))} GoerliETH</TypoGraphy>
							) : (
								<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Total: {formik.values.value}{formik.values.asset} + {weiToEther(formik.values.gasPrice[formik.values.selectedFeeType]*formik.values.gasLimit)} GoerliETH</TypoGraphy>
							)
						}
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
