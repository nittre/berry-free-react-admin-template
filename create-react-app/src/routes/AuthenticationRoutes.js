import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const RestoreWallet = Loadable(lazy(() => import('views/pages/authentication/authentication3/RestoreWallet')));
const CreateWallet = Loadable(lazy(() => import('views/pages/authentication/authentication3/CreateWallet')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/wallet/restore',
      element: <RestoreWallet />
    },
    {
      path: '/wallet/create',
      element: <CreateWallet />
    }
  ]
};

export default AuthenticationRoutes;
