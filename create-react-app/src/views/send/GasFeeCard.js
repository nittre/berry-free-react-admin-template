import PropTypes from 'prop-types';
import { useState } from 'react';
import TypoGraphy from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBlockHeight, weiToEther } from 'utils/crypto';

// assets

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const GasFeeCard = ({ isLoading, gasPrice, gasLimit, calcGasFeeLoading }) => {
  const theme = useTheme();

  const CardWrapper = styled(SubCard)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.light,
	color: theme.heading,
	overflow: 'hidden',
	position: 'relative',
	// padding: '0'
  }));
  

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
							<TypoGraphy sx={{ fontSize: '0.9rem', fontWeight: 600 }}>Gas Fee: {gasPrice === undefined ? 0 : weiToEther(gasPrice*gasLimit)} GoerliETH</TypoGraphy>
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
  isLoading: PropTypes.bool
};

export default GasFeeCard;
