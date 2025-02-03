import { IconReportMoney } from '@tabler/icons-react';

// constant
const icons = { IconReportMoney };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const expenses = {
  id: 'expenses',
  title: 'Gastos',
  type: 'group',
  children: [
    {
      id: 'expenses',
      title: 'Gastos',
      type: 'item',
      url: '/expenses',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    }
  ]
};

export default expenses;
