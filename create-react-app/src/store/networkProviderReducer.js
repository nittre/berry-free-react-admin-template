import { InfuraProvider } from "ethers";

export const initialState = {

};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const networkProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROVIDER':
		return new InfuraProvider('goerli', process.env.REACT_APP_INFURA_KEY)
	default:
      return state;
  }
};

export default networkProviderReducer;
