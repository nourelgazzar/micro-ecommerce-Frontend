// component
import TokenIcon from '@mui/icons-material/Token';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },

  {
    title: 'product',
    path: '/dashboard/productsAdmin',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'brand',
    path: '/dashboard/brand',
    icon: <TokenIcon />,
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
