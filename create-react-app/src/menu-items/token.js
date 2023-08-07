// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| TOKEN MENU ITEMS ||============================== //

const token = {
  id: 'token',
  title: 'Token',
  type: 'group',
  children: [
    {
      id: 'token-import',
      title: 'Import Token',
      type: 'item',
      url: '/token/import',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'token-send',
      title: 'Send Token',
      type: 'item',
      url: '/send',
      icon: icons.IconPalette,
      breadcrumbs: false
    }
  ]
};

export default token;
