import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Typography } from '@mui/material';
import TypoGraphy from '@mui/material/Typography';

// third party
import * as Yup from 'yup';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { etherToWei, getETHGasLimit, getGasPrice, isValidAddress, sendEther, weiToEther } from 'utils/crypto';
import { useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import GasFeeCard from './GasFeeCard';
import SubCard from 'ui-component/cards/SubCard';
import { useNavigate } from 'react-router';

// ==============================|| Send - SendLoad ||============================== //

const SendLoad = ({ formik }) => {
  const theme = useTheme();

  return (
	<Grid container direction="column">
		<SubCard>
			<Grid container direction="column" spacing={1}>
				{
					formik.values.txResult == 'pending' ? (
						<Grid item>
							<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>Transaction Send Processing...</TypoGraphy>
						</Grid>
					) : (
						formik.values.txResult == 'success' ? (
							<Grid item>
								<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>트랜잭션 성공! </TypoGraphy>
							</Grid>
						): (
							<Grid item>
								<TypoGraphy sx={{ fontSize: '1rem', fontWeight: 400 }}>트랜잭션 실패. 다시 시도하세요.</TypoGraphy>
							</Grid>
						)
					)
				}
			</Grid>
		</SubCard>
	</Grid>
  );
};

SendLoad.propTypes = {
  formik: PropTypes.object
};

export default SendLoad;
