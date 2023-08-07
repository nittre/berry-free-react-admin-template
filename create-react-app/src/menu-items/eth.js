// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| ETH MENU ITEMS ||============================== //

const eth = {
  id: 'eth',
  type: 'group',
  title: 'Goerli ETH',
  children: [
    {
      id: 'send-eth',
      title: 'Send',
      type: 'item',
      url: '/send',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
  ]
};

export default eth;
