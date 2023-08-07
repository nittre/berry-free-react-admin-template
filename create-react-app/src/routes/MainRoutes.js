import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Transaction from 'views/transaction';
import Send from 'views/send';
import ImportToken from 'views/import';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/transaction',
      element: <Transaction />
    },
    {
      path: 'send',
      element: <Send />
    },
    {
      path: 'token',
      children: [
        {
          path: 'import',
          element: <ImportToken />
        }
      ]
    },
  ]
};

export default MainRoutes;
