// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  title: 'Goerli ETH',
  children: [
    {
      id: 'sample-page',
      title: 'Send',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Receive',
      type: 'item',
      url: '/eth/send',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
