import { InfuraProvider } from "ethers";

export const initialState = {
	blockNumber: 0
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const blockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BLOCKNUMBER':
			return { blockNumber: action.payload.blockNumber}
		default:
				return state;
  }
};

export default blockReducer;
