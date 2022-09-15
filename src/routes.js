import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import DashboardLayoutUser from './layouts/dashboard/User';
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
import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import ProductsAdmin from './pages/PagesAdmin';

// ----------------------------------------------------------------------

export default function Router() {
  const [cart, setCart] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const token = localStorage.getItem('token');
  const userid = localStorage.getItem('userID');
  const user = localStorage.getItem('user');

  // localStorage.setItem('tokenuser', response.data.token);
  // localStorage.setItem('userID', response.data.admin.id);
  // localStorage.setItem('username', response.data.admin.first_name);
  // localStorage.setItem('username', response.data.admin.last_name);

  useEffect(() => {
    if (user === 1) {
      axios
        .get(
          `http://localhost:8000/api/user/carts/${userid}`,

          {
            headers: {
              Authorization: `Bearer  ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response, 'RESSSSSSSS');
            setCart(response.data.cart_details);
            settotalPrice(response.data.total_price);
            if (response.data.cart_details.length > 0) {
              let ti = 0;
              const newData = response.data.cart_details.filter((temp) => {
                ti = temp.no_items + ti;
                return temp;
              });
              setTotalItems(ti);
            }
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    }
  }, []);

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

        {
          path: 'productsAdmin',
          element: <ProductsAdmin />,
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
      path: '/user',
      element: (
        <DashboardLayoutUser
          cart={cart}
          setCart={setCart}
          settotalPrice={settotalPrice}
          totalPrice={totalPrice}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
        />
      ),
      children: [
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
        {
          path: 'oder',
          element: (
            <OderDetails
              cart={cart}
              setCart={setCart}
              settotalPrice={settotalPrice}
              totalPrice={totalPrice}
              totalItems={totalItems}
              setTotalItems={setTotalItems}
            />
          ),
        },
      ],
    },

    {
      path: 'loginuser',
      element: <LoginUser />,
    },
    {
      path: 'registeruser',
      element: <RegisterUser />,
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
