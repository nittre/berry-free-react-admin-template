import { Box, Grid, Typography } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import SubCard from 'ui-component/cards/SubCard';

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

// ===========================|| DASHBOARD - NETWORK STATUS CARD ||=========================== //

const NetworkStatusCard = ({isLoading}) => {
  const theme = useTheme();
  const {blockNumber} = useSelector(state => state.blockNumber)

  return (
	<>
		{isLoading ? (
			<SkeletonEarningCard />
		) : (
			<CardWrapper border={false} content={false}>
				<Box sx={{ p: 2.25 }}>
					<Grid container direction="column">
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
								<Typography sx={{ fontSize: '1.5rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>Network</Typography>
								</Grid>
							</Grid>
							<SubCard>
								<Grid container direction="column" spacing={1}>
									<Grid item>
										<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 600 }}>Goerli TestNet</TypoGraphy>
									</Grid>
									<Grid item>
										<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>block height: {blockNumber ? blockNumber : <>Loading...</>}</TypoGraphy>
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

NetworkStatusCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default NetworkStatusCard;
