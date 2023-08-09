import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';

// ===============================|| RestoreOrCreate ||=============================== //

const RestoreOrCreate = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const handleButtonClick = (action) => {
		navigate(`/wallet/${action}`)
  }
  
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            지갑 생성 또는 복구
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
														지갑을 생성하거나, 복구하세요.
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
								</Grid>
								<Box sx={{ mt: 2 }}>
									<AnimateButton>
										<Button onClick={() => handleButtonClick('create')} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
											생성하기
										</Button>
									</AnimateButton>
								</Box>
								<Box sx={{ mt: 2 }}>
									<AnimateButton>
										<Button onClick={() => handleButtonClick('restore')} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
											복구하기
										</Button>
									</AnimateButton>
								</Box>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default RestoreOrCreate;
