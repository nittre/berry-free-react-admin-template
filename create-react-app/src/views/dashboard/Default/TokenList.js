import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const TokenList = ({ isLoading }) => {
  const theme = useTheme();
  const { token } = useSelector(state => state)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing} sx={{flexGrow: 1}}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h3">토큰 목록</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {
					Array.from({length: token.token.length}, (_, index) => {
						return (
							<Grid item key={index}>
								<Grid container alignItems="center" justifyContent="space-between">
								<Grid item>
									<Typography variant="subtitle1" color="inherit">
										{token.token[index].tokenSymbol}
									</Typography>
								</Grid>
								<Grid item>
									<Grid container alignItems="center" justifyContent="space-between">
									<Grid item>
										<Typography variant="subtitle1" color="inherit">
										{token.token[index].balance} {token.token[index].tokenSymbol}
										</Typography>
									</Grid>
									</Grid>
								</Grid>
								</Grid>
							</Grid>
						)
					})
				}
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TokenList.propTypes = {
  isLoading: PropTypes.bool
};

export default TokenList;
