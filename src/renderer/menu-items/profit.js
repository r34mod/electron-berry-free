import { IconBusinessplan } from '@tabler/icons-react';

// constant
const icons = { IconBusinessplan };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const profit = {
  id: 'profit',
  title: 'Beneficios',
  type: 'group',
  children: [
    {
      id: 'profit',
      title: 'Beneficios',
      type: 'item',
      url: '/profit',
      icon: icons.IconBusinessplan,
      breadcrumbs: false
    }
  ]
};

export default profit;
