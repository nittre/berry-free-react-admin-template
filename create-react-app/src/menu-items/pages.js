// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages -> 트랜잭션으로 바꾸기',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication -> 트랜잭션으로 바꾸기',
      type: 'item',
      icon: icons.IconKey,
      url: '/transactions'

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
