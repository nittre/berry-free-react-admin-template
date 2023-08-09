import { CardContent, Grid, Link, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { weiToEther } from 'utils/crypto';
import { formatAddress } from 'utils/utils';

// ==============================|| TRANSACTION - TransactionList ||============================== //

const TransactionList = ({ isLoading }) => {
  const theme = useTheme();
  const { tx } = useSelector(state => state.transaction)

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard title="트랜잭션" content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing} component={Paper} style={{overflowX: 'auto'}}>
              <Grid item xs={12}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Type</TableCell>
											<TableCell>Transaction Hash</TableCell>
											<TableCell>Block</TableCell>
											<TableCell>From</TableCell>
											<TableCell>To</TableCell>
											<TableCell>Value</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
									{
											/* TO-DO : 트랜잭션 주요 목록 보여주기
											 * 조건 1. 리덕스 상태 변수 tx에 저장된 트랜잭션들을 표로 보여줍니다.
											 * 조건 2. TableCell, TableRow 등을 이용해 트랜잭션 목록을 보여주세요.
											 * 조건 3. 토큰 이름, 트랜잭션 해시, 블록 넘버, from, to, value가 나와야 합니다.
											 * 조건 4. 트랜잭션 해시, from, to는 utils/utils.js의 formatAddress() 함수를 이용해서 짧게 줄여주세요.
											*/
									}
									</TableBody>
								</Table>               
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

TransactionList.propTypes = {
  isLoading: PropTypes.bool
};

export default TransactionList;
