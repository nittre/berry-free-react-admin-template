import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

// ============================|| Restore Wallet Form ||============================ //

const RestoreWalletForm = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef(); 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [numPhrase, setNumPhrase] = useState(12) // 니모닉 구문의 단어 갯수를 저장합니다. 현재는 12개로 고정되어 있지만, 추후 확장이 필요할 경우 필요에 맞게 변경하는 기능을 추가할 수 있습니다.

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
							/* TO-DO : 지갑을 복구합니다.
							 * 조건 1. restoreWalle() 함수를 호출해 지갑을 복구합니다. (복구한 지갑은 리덕스 상태 변수에 저장됩니다.)
							*/
							navigate('/')
							setSubmitting(false);
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }
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

export default RestoreWalletForm;
