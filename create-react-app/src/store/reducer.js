import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import walletReducer from './walletReducer';
import networkProviderReducer from './networkProviderReducer';
import transactionReducer from './transactionReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  wallet: walletReducer,
  networkProvider: networkProviderReducer,
  transaction: transactionReducer
});

export default reducer;
