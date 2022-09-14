import { useEffect, useState } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Category from './pages/Category/Category';
import Brand from './pages/Brand/Brand';
import OderDetails from './pages/OrderDetails';

// ----------------------------------------------------------------------

export default function Router() {
  const [cart, setCart] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <DashboardLayout
          cart={cart}
          setCart={setCart}
          settotalPrice={settotalPrice}
          totalPrice={totalPrice}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
        />
      ),
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        {
          path: 'products',
          element: (
            <Products
              cart={cart}
              setCart={setCart}
              settotalPrice={settotalPrice}
              totalPrice={totalPrice}
              totalItems={totalItems}
              setTotalItems={setTotalItems}
            />
          ),
        },
        { path: 'category', element: <Category /> },
        { path: 'brand', element: <Brand /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'oder',
      element: <OderDetails />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
