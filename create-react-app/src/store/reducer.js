import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import walletReducer from './walletReducer';
import networkProviderReducer from './networkProviderReducer';
import transactionReducer from './transactionReducer';
import tokenReducer from './tokenReducer';
import blockReducer from './blockReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  wallet: walletReducer,
  networkProvider: networkProviderReducer,
  transaction: transactionReducer,
  token: tokenReducer,
  blockNumber: blockReducer
});

export default reducer;
