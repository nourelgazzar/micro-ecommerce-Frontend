import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate, useParams } from 'react-router-dom';
import { Container, Stack, Typography, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';
import Form from '../components/OrderDetailsForm';
import Checkout from '../components/OrderDCheckout';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category(props) {
  const classes = useStyles();
  console.log(props.cart, 'CARTTTTT');
  const [checkout, setcheckout] = useState(false);
  const userid = localStorage.getItem('userID');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (checkout === true) {
      axios
        .post(
          `http://localhost:8000/api/orders`,
          { cart_id: 1, user_id: 1 },

          {
            headers: {
              Authorization: `Bearer  ${'6|8YpTTJ7Yrt06MWljx67PQOlWVTqUdybrDhvJt3Wx'}`,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.data.status === 200) {
            console.log(response, 'RESSSSSSSS');
            props.setTotalItems(0);
            props.settotalPrice(0);
            props.setCart([]);
            Navigate('/products');
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    }
  }, [checkout]);

  useEffect(() => {
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
          props.setCart(response.data.cart_details);
          props.settotalPrice(response.data.total_price);
          if (response.data.cart_details.length > 0) {
            let ti = 0;
            const newData = response.data.cart_details.filter((temp) => {
              ti = temp.no_items + ti;
              return temp;
            });
            props.setTotalItems(ti);
          }
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: '1%' }}>
        <Page title="Dashboard: Categories">
          <Container sx={{ width: 8000, backgroundColor: 'white', height: '100%' }}>
            <div style={{ display: 'flex' }}>
              <div>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Shopping Cart
                </Typography>{' '}
              </div>
              <div style={{ marginLeft: '77%', marginTop: '2%' }}>
                {' '}
                <Typography variant="h12" sx={{ color: 'grey' }}>
                  Price{' '}
                </Typography>{' '}
              </div>
            </div>
            <Divider sx={{ borderRightWidth: 8 }} />

            {props.cart.map((item) => item && item.no_items > 0 && <Form item={item} />)}
            <Divider />
          </Container>
        </Page>
      </div>
      <div style={{ width: 300, height: 120, marginTop: '1%', marginLeft: '2%', backgroundColor: 'white' }}>
        <Checkout
          cart={props.cart}
          setCart={props.setCart}
          settotalPrice={props.settotalPrice}
          totalPrice={props.totalPrice}
          totalItems={props.totalItems}
          setTotalItems={props.setTotalItems}
          setcheckout={setcheckout}
        />
      </div>
    </div>
  );
}
