// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| TRANSACTION MENU ITEMS ||============================== //

const transaction = {
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
    }
  ]
};

export default transaction;
