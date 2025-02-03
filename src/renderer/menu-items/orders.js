// assets
import { IconUsers } from '@tabler/icons-react';

// constant
const icons = { IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const orders = {
  id: 'orders',
  title: 'Hoja de Pedidos',
  type: 'group',
  children: [
    {
      id: 'orders',
      title: 'Hoja de pedidos',
      type: 'item',
      url: '/orders',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default orders;
