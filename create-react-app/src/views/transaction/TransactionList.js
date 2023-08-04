import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Link, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import { weiToEther } from 'utils/crypto';
import { useEffect } from 'react';
import { formatAddress } from 'utils/utils';

// ==============================|| Transaction - TransactionList ||============================== //

const TransactionList = ({ isLoading }) => {
  const theme = useTheme();
  const {tx} = useSelector(state => state.transaction)
  
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
						Array.from({length: tx.length}, (_, index) => {
							return (
							<TableRow key={index}>
								<TableCell>{tx[index].tokenName ? tx[index].tokenName : <>GoerliETH</>}</TableCell>
								<TableCell>
									<Link href={`https://sepolia.etherscan.io/tx/${tx[index].hash}`} target="_blank" rel="noreferrer" underline="none" >{formatAddress(tx[index].hash)}</Link>
								</TableCell>
								<TableCell>{tx[index].blockNumber}</TableCell>
								<TableCell>{formatAddress(tx[index].from)}</TableCell>
								<TableCell>{formatAddress(tx[index].to)}</TableCell>
								<TableCell>{weiToEther(tx[index].value)} {tx[index].tokenSymbol ? tx[index].tokenSymbol : <>GoerliETH</>} </TableCell>
							</TableRow>
						)
						})
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
