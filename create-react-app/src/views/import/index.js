import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import AccountInfoCard from '../dashboard/Default/AccountInfoCard';
import NetworkStatusCard from '../dashboard/Default/NetworkStatusCard';
import PopularCard from '../dashboard/Default/TokenList';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getBlockHeight, isValidAddress } from 'utils/crypto';
import MainCard from 'ui-component/cards/MainCard';
import ImportTokenInit from './ImportTokenInit';
import { Formik, useFormik } from 'formik';
// third party
import * as Yup from 'yup';
import ImportTokenConfirm from './ImportTokenConfirm';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ImportToken = () => {
  const { wallet, networkProvider, transaction } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate('/')

  const [isLoading, setLoading] = useState(true);
  const [step, setStep] = useState('init') // init, confirm

  useEffect(() => {
	setLoading(false);
	
  }, []);

  useEffect(() => {
	if (Object.keys(wallet).length == 0) {
		navigate('/wallet')
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
