export const initialState = {
	tx: []
};

// ==============================|| TRANSACTION REDUCER ||============================== //

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
			return {
				tx: [action.payload.tx, ...state.tx]
			}
		case 'RESET_TX': 
			return {
				tx: []
			}
		default:
      return state;
  }
};

export default transactionReducer;
