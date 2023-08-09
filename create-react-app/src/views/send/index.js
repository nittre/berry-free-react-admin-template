import { CardContent, Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { isValidAddress } from 'utils/crypto';
import * as Yup from 'yup';
import SendConfirm from './SendConfirm';
import SendInit from './SendInit';
import SendLoad from './SendLoad';

// ==============================|| SEND ||============================== //

const Send = () => {
  const { wallet } = useSelector(state => state)
  const navigate = useNavigate('/')
  const [ isLoading, setLoading ] = useState(true);
  const[ step, setStep ] = useState('init') // init, confirm, load, success, fail

  const handleStep = (newStep) => {
	setStep(newStep)
  }
  
  const validateToField = (value) => {
		return isValidAddress(value)
  }

  const validationSchema = Yup.object().shape({
    to: Yup.string().required('To 필드는 필수 항목입니다.').test('validateToField', validateToField)
  });

  const formik = useFormik({
		initialValues: {
			asset: 'GoerliETH',
			value: '0',
			to: '',
			from: wallet.address,
			selectedFeeType: 'propose',
			gasPrice: {
				safe: BigInt(0),
				propose: BigInt(0),
				fast: BigInt(0)
			},
			gasLimit: BigInt(0),
			txResult: 'pending',
			data: '',
			token: {}
		},
		validationSchema: validationSchema
  })

  const handleFormikValue = (field, value) => {
		formik.setFieldValue(field, value)
  }


  useEffect(() => {
		setLoading(false);
  }, []);

  useEffect(() => {
		if (Object.keys(wallet).length == 0) {
			navigate('/login')
		} 
  })

  return (
    <Grid container direction="column" sx={{ maxHeight: '100vh' }}>
		{
			isLoading ? (
				<SkeletonPopularCard />
			) : (
				<MainCard title="보내기" content={false}>
					<CardContent>
						<form noValidate onSubmit={formik.handleSubmit}>
							{
								step === 'init' ? (
									<SendInit isLoading={isLoading} formik={formik} handleFormikValue={handleFormikValue} handleStep={handleStep} />
								) : (
									step === 'confirm' ? (
										<SendConfirm formik={formik} handleStep={handleStep} handleFormikValue={handleFormikValue} />
									) : <SendLoad formik={formik} />
								)
							}
						</form>
					</CardContent>
				</MainCard>
			)
		}
    </Grid>
  );
};

export default Send;
