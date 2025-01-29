// assets
import { IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const clients = {
  id: 'clients',
  title: 'Clientes',
  type: 'group',
  children: [
    {
      id: 'clients',
      title: 'Clientes',
      type: 'item',
      url: '/clients',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default clients;
