import { InfuraProvider } from "ethers";

export const initialState = {

};

// ==============================|| NETWORK PROVIDER REDUCER ||============================== //

const networkProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROVIDER':
			/* TO-DO : Goerli 네트워크에 연결합니다. 
			 * 조건 1. .env 파일에 Infura API 키를 설정했는지 확인하세요.
			 * 조건 2. ethers.js의 InfuraProvider를 사용해 Infura 엔드포인트에 연결하세요.
			*/
			return
		default:
      return state;
  }
};

export default networkProviderReducer;
