import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { isValidAddress } from 'utils/crypto';
import * as Yup from 'yup';
import ImportTokenConfirm from './ImportTokenConfirm';
import ImportTokenInit from './ImportTokenInit';

// ==============================|| IMPORT TOKENS ||============================== //

const ImportToken = () => {
  const { wallet } = useSelector(state => state)
  const navigate = useNavigate('/')

  const [isLoading, setLoading] = useState(true);
  const [step, setStep] = useState('init') // init, confirm

  useEffect(() => {
		setLoading(false);
  }, []);

  useEffect(() => {
		if (Object.keys(wallet).length == 0) {
			navigate('/login')
		} 
  })

  const handleStep = (newStep) => {
		setStep(newStep)
  }

  const validateToField = (value) => {
		return isValidAddress(value)
  }

  const updateFormikValue = (field, value) => {
		formik.setFieldValue(field, value)
  }

  const formik = useFormik({
		initialValues: {
			tokenAddress: '',
			tokenSymbol: '',
			tokenDecimals: 0,
			balance: ''
		},
		validationSchema: Yup.object().shape({
			tokenAddress: Yup.string().required('address 필드는 필수 항목입니다.').test('validateToField', validateToField)
		})
  })


  return (
    <Grid container direction="column" sx={{ maxHeight: '100vh' }}>
		{
			step === 'init' ? (
				<ImportTokenInit isLoading={isLoading} handleStep={handleStep} formik={formik} updateFormikValue={updateFormikValue} />
			) : (
				<ImportTokenConfirm isLoading={isLoading} handleStep={handleStep} formik={formik} updateFormikValue={updateFormikValue} />
			)
		}
    </Grid>
  );
};

export default ImportToken;
