import { createWalletFromPhrase } from 'utils/crypto';

export const initialState = {

};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESTORE_WALLET':
		return createWalletFromPhrase(action.payload.phrase);
	case 'CREATE_WALLET':
		return action.payload.wallet
    default:
      return state;
  }
};

export default walletReducer;