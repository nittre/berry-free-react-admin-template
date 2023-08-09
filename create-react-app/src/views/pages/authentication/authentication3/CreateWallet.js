import { Box, Button, FormControl, Grid, Input, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { createWallet } from 'utils/crypto';
import { pasteToClipboard } from 'utils/utils';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';

// ===============================|| Create Wallet ||=============================== //

const createWalletStep = ['start', 'pasteMnemonic', 'end']

const CreateWallet = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [step, setStep] = useState(createWalletStep[0]) // start -> pastedMnemonic -> end
  const [phrase, setPhrase] = useState([]) // 니모닉 구문의 각 단어를 배열의 요소로 저장합니다.
  const [wallet, setWallet] = useState(undefined) // 새롭게 생성한 지갑 객체를 저장합니다.
  const [isPhrasePasted, setIsPhrasePasted] = useState(false) // 니모닉이 사용자의 클립보드에 복사되었는지의 여부를 저장합니다.

  const dispatchWallet = () => {
		dispatch({
			type: 'CREATE_WALLET',
			payload: {
				wallet
			}
		})
  }

  const handleCreateButtonClick = () => {
		try {
			/* TO-DO : 생성하기 버튼을 누르면 새로운 니모닉 지갑을 생성합니다.
			* 조건 1. ethers.js를 사용해 니모닉 지갑을 생성하고, 해당 지갑의 니모닉을 상태 변수 phrase에 할당합니다. utils/crypto.js 파일의 createWallet()함수를 사용하세요.
			* 조건 2. 생성된 니모닉 지갑은 리덕스가 관리하는 상태에 저장합니다. dispatchWallet() 함수를 사용하세요.
			* 조건 2. 정상적으로 니모닉 지갑이 생성되었다면, 다음 step으로 넘어갑니다.
			*/
		} catch (e) {
			console.error(e)
		}
  }

  const handlePasteButtonClick = (e) => {
		/* TO-DO : 복사 기능을 구현하세요.
		 * 조건 1. pasteToClipboard() 함수를 호출해 사용자의 클립보드에 니모닉을 복사합니다.
		 * 조건 2. 성공적으로 니모닉을 복사하면, isPhrasePasted 상태변수를 true로 설정합니다.
		*/
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
                            지갑 생성하기
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
														{
															step === 'start' ? (
															<>버튼을 누르면 새로운 지갑을 생성합니다.</>
															) : step === 'pasteMnemonic' ? (
															<>
															<p>
																니모닉을 복사하세요.
															</p>
															<p>
																⚠️ 이 페이지를 벗어나면 더 이상 니모닉 문구를 확인할 수 없습니다!
																꼭 니모닉 문구를 복사한 후, 다른 곳에 백업해두세요!
															</p>
															</>
															) : null
														}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
							</Grid>
							{
								step === 'pasteMnemonic' ? (
									<>
										{
											Array.from({length: 12}, (_, index) => {
												return <FormControl key={phrase[index]} sx={{...theme.typography.customInput}}>
													<Input
														id={phrase[index]}
														type="text"
														value={phrase[index]}
														name={phrase[index]}
													/>
												</FormControl>
											})
										}
									</>
								) : null
							}
							{
								step === 'pasteMnemonic' ? (
								<>
									<Box sx={{ mt: 2 }}>
									<AnimateButton>
										<Button onClick={handlePasteButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
											{
												isPhrasePasted === false 
												? (
													<>복사하기</>
												) : (
													<>복사 완료!</>
												)
											}
										</Button>
									</AnimateButton>
									</Box>
								</>
								) : null
							}

								<Box sx={{ mt: 2 }}>
									<AnimateButton>
									{
										step === 'start' ? (
											<Button onClick={handleCreateButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
												생성하기
											</Button>
										) : ( 
											<Button disabled={!isPhrasePasted} onClick={handleCreateButtonClick} disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
												확인
											</Button>
										)
									}
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

export default CreateWallet;
