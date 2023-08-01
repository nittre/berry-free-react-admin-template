// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Transaction',
  type: 'group',
  children: [
    {
      id: 'transaction',
      title: 'Transaction',
      type: 'item',
      icon: icons.IconKey,
      url: '/transaction'

      // children: [
      //   {
      //     id: 'login3',
      //     title: 'Login',
      //     type: 'item',
      //     url: '/pages/login/login3',
      //     target: true
      //   },
      //   {
      //     id: 'register3',
      //     title: 'Register',
      //     type: 'item',
      //     url: '/pages/register/register3',
      //     target: true
      //   }
      // ]
    }
  ]
};

export default pages;
