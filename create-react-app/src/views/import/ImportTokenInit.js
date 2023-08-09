import { Box, Button, CardContent, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { importTokenContract } from 'utils/crypto';

// ==============================|| IMPORT - ImportTokenInit ||============================== //

const ImportTokenInit = ({ isLoading, handleStep, formik, updateFormikValue }) => {
  const theme = useTheme();
  const {networkProvider} = useSelector(state => state)

  const handleNextButton = () => {
		handleStep('confirm')
  }

  const handleTokenAddressChange = async (e) => {
		const {symbol, decimals} = await importTokenContract(networkProvider, e.target.value)

		updateFormikValue('tokenAddress', e.target.value)
		updateFormikValue('tokenSymbol', symbol)
		updateFormikValue('tokenDecimals', Number(decimals))
  }


  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
				<MainCard title="토큰 가져오기" >
					<CardContent>
						<Grid container direction="column">
							<FormControl sx={{...theme.typography.customInput, flexGrow: 1, marginRight: '10px'}}>
								<InputLabel htmlFor="tokenAddress">토큰 주소</InputLabel>
								<OutlinedInput
									id="tokenAddress"
									type="text"
									name="tokenAddress"
									onChange={(e) => {
										handleTokenAddressChange(e)
									}}
								/>
							</FormControl>
							<FormControl sx={{...theme.typography.customInput, flexGrow: 1}}>
								<InputLabel htmlFor="tokenSymbol">토큰 심볼</InputLabel>
								<OutlinedInput
									id="tokenSymbol"
									type="text"
									name="tokenSymbol"
									value={formik.values.tokenSymbol}
									onChange={formik.handleChange}
								/>
							</FormControl>
							<FormControl sx={{...theme.typography.customInput, flex: 1}}>
								<InputLabel htmlFor="tokenDecimals">토큰 Decimals</InputLabel>
								<OutlinedInput
									id="tokenDecimals"
									type="text"
									name="tokenDecimals"
									value={formik.values.tokenDecimals}
									onChange={formik.handleChange}
								/>
							</FormControl>
							{formik.errors.to && (
								<Box sx={{ color: 'red', fontSize: '0.75rem' }}>{formik.errors.tokenAddress}</Box>
							)}
							<Box sx={{ mt: 2 }}>
								<AnimateButton>
									<Button disableElevation onClick={handleNextButton} disabled={formik.isSubmitting} fullWidth={true} size="large" variant="contained" color="secondary">
										다음
									</Button>
								</AnimateButton>
							</Box>
						</Grid>
					</CardContent>
				</MainCard>
      )}
    </>
  );
};

ImportTokenInit.propTypes = {
  isLoading: PropTypes.bool,
  handleStep: PropTypes.func,
  formik: PropTypes.object,
  updateFormikValue: PropTypes.func
};

export default ImportTokenInit;
