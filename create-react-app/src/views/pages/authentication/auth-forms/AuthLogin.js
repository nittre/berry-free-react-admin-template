import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { createWalletFromPhrase } from 'utils/crypto';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { useNavigate } from 'react-router';

// ============================|| Restore Wallet ||============================ //

const WalletRestore = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef(); 
  // scriptRef: 컴포넌트가 마운트된 상태에서 비동기 작업이 완료되기 전에 언마운트 되었을 때, 컴포넌트가 마운트되지 않은 상태에서 비동기 작업의 콜백이 호출되는 상황 방지.
  // scriptRef.current -> 현재 마운트 된 상태면 true, 아니면 false
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [checked, setChecked] = useState(true);
  const [numPhrase, setNumPhrase] = useState(12)

  const restoreWallet = (phrase) => {
	dispatch({
		type: 'RESTORE_WALLET',
		payload: {
			phrase
		}
	})
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	const handlePaste = (event, setFieldValue) => {
		event.preventDefault()
		const pastedText = event.clipboardData.getData('text/plain').split(' ').map((text) => text.replace(/\n/g, ""))
		pastedText.forEach((text, index) => {
			setFieldValue(`word${index + 1}`, text);
		});
	};

  return (
    <>
      <Formik
        initialValues={{
			word1: '',
			word2: '',
			word3: '',
			word4: '',
			word5: '',
			word6: '',
			word7: '',
			word8: '',
			word9: '',
			word10: '',
			word11: '',
			word12: '',
		}}
        validationSchema={Yup.object().shape({
			word1: Yup.string().required('Word 1 is required'),
			word2: Yup.string().required('Word 2 is required'),
			word3: Yup.string().required('Word 3 is required'),
			word4: Yup.string().required('Word 4 is required'),
			word5: Yup.string().required('Word 5 is required'),
			word6: Yup.string().required('Word 6 is required'),
			word7: Yup.string().required('Word 7 is required'),
			word8: Yup.string().required('Word 8 is required'),
			word9: Yup.string().required('Word 9 is required'),
			word10: Yup.string().required('Word 10 is required'),
			word11: Yup.string().required('Word 11 is required'),
			word12: Yup.string().required('Word 12 is required'),
		})}

        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
			
            if (scriptedRef.current) {
				restoreWallet(Object.values(values).join(' '))
				setSubmitting(false);
				navigate('/')
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
		
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }
		/* 
		* errors: 각 입력 필드에 대한 유효성 검사 오류를 포함하는 객체. 유효성 검사 스키마에 오류가 정의되어 있고, 유효성 검사에 실패하면 오류가 표시됨
		* handleBlur: 입력 필드의 onBlur 이벤트를 처리하는 함수. 
		* handleChange: onChange 이벤트 처리. 해당 입력 필드에 값을 입력하거나 선택할 때, 해당 값을 values 객체에 업데이트한다.
		* handleSubmit: 폼 제출을 처리. 
		* isSubmitting: 폼이 제출 중인지의 여부를 나타냄. 폼이 제출되는 동안 사용자가 추가적으로 제출할 수 없도록 제어하는데 사용한다.
		* touched: 사용자가 입력 필드를 터치(상호작용)한 경우, 해당 필드의 이름을 키로 가진다. 이 속성을 통해, 터치된 필드에만 유효성 검사 오류를 표시할 수 있다.
		* values: 객체 형태. 폼 내의 모든 입력 필드의 현재값이 포함되어 있다. 초기값은 Formik의 initialValues로 설정.
		*/
		) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
				{
					Array.from({length: numPhrase}, (_, index) => (
						<FormControl key={index+1} fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
							<InputLabel htmlFor={`word${index+1}`}>word {index+1}</InputLabel>
							<OutlinedInput
							id={`word${index+1}`}
							type={showPassword ? 'text' : 'password'}
							value={values[`word${index+1}`]}
							name={`word${index+1}`}
							onBlur={handleBlur}
							onChange={handleChange}
							onPaste={(e) => { 
								e.stopPropagation()
								handlePaste(e, setFieldValue)}
							}
							endAdornment={
								<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
									size="large"
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
								</InputAdornment>
							}
							label={`word${index+1}`}
							inputProps={{}}
							/>
							{touched.password && errors.password && (
							<FormHelperText error id="standard-weight-helper-text-password-login">
								{errors.password}
							</FormHelperText>
							)}
						</FormControl>
					))
				}
            
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Restore
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default WalletRestore;
