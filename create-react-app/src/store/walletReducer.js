import { createWalletFromPhrase } from 'utils/crypto';

export const initialState = {

};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESTORE_WALLET':
		return createWalletFromPhrase(action.payload.phrase);
    default:
      return state;
  }
};

export default walletReducer;
