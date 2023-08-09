import { Box, Grid } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import SubCard from 'ui-component/cards/SubCard';
import { weiToEther } from 'utils/crypto';

// ===========================|| SEND - GAS FEE CARD ||=========================== //

const GasFeeCard = ({ isLoading, gasPrice, gasLimit, calcGasFeeLoading }) => {
  const theme = useTheme();

  const CardWrapper = styled(SubCard)(({ theme }) => ({
		backgroundColor: theme.palette.secondary.light,
		color: theme.heading,
		overflow: 'hidden',
		position: 'relative',
  }));

  return (
    <>
      {isLoading && calcGasFeeLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper content={false}>
          <Box sx={{ p: 0.5 }}>
            <Grid container direction="column" >
              <Grid item >
                <SubCard>
									<Grid container direction="column" spacing={1}>
										<Grid item>
											<TypoGraphy sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Gas Fee: {gasPrice === undefined && gasLimit === undefined ? 0 : weiToEther(gasPrice*gasLimit)} GoerliETH</TypoGraphy>
										</Grid>
										<Grid item>
											<Grid container direction="column" spacing={0.1}>
												<Grid item>
													<TypoGraphy sx={{ fontSize: '0.8rem', fontWeight: 400 }}>Gas Price: {gasPrice === undefined ? 0 : String(gasPrice)}</TypoGraphy>
												</Grid>
												<Grid item>
													<TypoGraphy sx={{ fontSize: '0.8rem', fontWeight: 400 }}>Gas Limit: {String(gasLimit)}</TypoGraphy>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
                </SubCard>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

GasFeeCard.propTypes = {
  isLoading: PropTypes.bool,
  gasPrice: PropTypes.bigint, 
  gasLimit: PropTypes.bigint, 
  calcGasFeeLoading: PropTypes.bool
};

export default GasFeeCard;
