export const initialState = {
	token: []
};

// ==============================|| TOKEN REDUCER ||============================== //

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
			return {
				token: [...state.token, action.payload.token]
			}
		case 'UPDATE_BALANCE':
			return {
				token: [...action.payload.token]
			}
		case 'RESET_TOKEN':
			return {
				token: []
			}
		default:
				return state;
	}
};

export default tokenReducer;
