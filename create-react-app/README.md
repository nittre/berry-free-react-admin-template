# Coz Wallet
아주 간단한 형태의 웹 월렛

## ⚠️ 주의
**코즈 월렛은 안전하지 않습니다!**

코즈 월렛은 **학습 목적**으로 제작되었으며, 학습 외 서비스 목적으로 제작되지 않았습니다.<br/>
학습을 위해 사용할 것을 권장하며, 절대 메인넷에서 사용하지 마세요.

학습 외 목적으로 사용한 경우에 대해 어떠한 책임도 지지 않습니다.

## 주요 기능
- 지갑 생성 및 복구
- 계정 이더 잔액 조회
- 이더 전송
- 토큰 잔액 조회
- 토큰 전송
- 트랜잭션 조회
- 토큰 컨트랙트 이벤트 구독

## 주요 스택
- React
	- Material UI - [berry-free-react-admin-template](https://github.com/codedthemes/berry-free-react-admin-template) 사용
- Ethereum Goerli Testnet
- Ethers.js
- Etherscan API
- [Remix](https://remix.ethereum.org/)
	- OpenZeppelin에서 제공하는 [ERC-20 컨트랙트](https://docs.openzeppelin.com/contracts/4.x/erc20)를 사용해 테스트용 ERC-20 토큰 컨트랙트를 배포하여 사용합니다.

## 폴더 구조
```
├── README.md
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
|  ├── favicon.svg
|  └── index.html
├── src
|  ├── App.js
|  ├── assets
|  ├── config.js
|  ├── hooks
|  ├── index.js
|  ├── layout
|  ├── menu-items
|  ├── routes
|  ├── serviceWorker.js
|  ├── store
|  ├── themes
|  ├── ui-component
|  ├── utils
|  └── views
└── yarn.lock
```