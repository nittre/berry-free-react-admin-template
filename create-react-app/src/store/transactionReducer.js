export const initialState = {
	tx: []
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
		return {
			tx: [...state.tx, action.payload.tx]
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
