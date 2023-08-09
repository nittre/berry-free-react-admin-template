import { Grid } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SubCard from 'ui-component/cards/SubCard';

// ==============================|| SEND - SendLoad ||============================== //

const SendLoad = ({ formik }) => {
  const theme = useTheme();

  return (
		<Grid container direction="column">
			<SubCard>
				<Grid container direction="column" spacing={1}>
					{
						formik.values.txResult == 'pending' ? (
							<Grid item>
								<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Transaction Send Processing...</TypoGraphy>
							</Grid>
						) : (
							formik.values.txResult == 'success' ? (
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
  );
};

SendLoad.propTypes = {
  formik: PropTypes.object
};

export default SendLoad;
