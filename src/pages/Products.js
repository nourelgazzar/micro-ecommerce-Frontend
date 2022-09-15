import { React, useState, useEffect } from 'react';
import axios from 'axios';

// material
import { Container, Stack, Typography, IconButton, InputAdornment, TextField } from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';
import { PriceChangeTwoTone } from '@mui/icons-material';

import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Page from '../components/Page';

import PRODUCTS from '../_mock/products';
import ShowUpModel from '../components/ShowUpModelProduct';
// import Searchbar from '../layouts/dashboard/Searchbar';

// ----------------------------------------------------------------------

export default function EcommerceShop(props) {
  const [searchColour, setsearchColour] = useState(false);
  const [categories, setcategories] = useState([]);
  const [products, setproducts] = useState([]);

  const [brands, setbrands] = useState([]);
  const [category, setcategory] = useState('');
  const [brand, setbrand] = useState('');
  const [price, setprice] = useState('');
  const [open, setopen] = useState(false);

  const token = localStorage.getItem('token');
  const [openFilter, setOpenFilter] = useState(false);

  const [productid, setproductid] = useState(0);
  const [cartid, setcartid] = useState(0);

  const [quantity, setquantity] = useState(0);
  const [addcart, setaddcart] = useState(false);
  const [product, setproduct] = useState({});
  const [tempcart, settempcart] = useState([]);
  const userid = localStorage.getItem('userID');

  console.log(category, brand, price, 'TESTTTTTT');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  useEffect(() => {
    if (addcart === true) {
      // const price = props.totalPrice + quantity * product.price;
      // props.settotalPrice(price);
      // const items = props.totalItems + quantity;
      // props.setTotalItems(items);
      axios
        .post(
          `http://localhost:8000/api/user/carts/add`,
          { cart_id: userid, product_id: product.id, no_items: quantity },
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
          console.log(response, 'RESPONSEEEEEEEEEEEEEEEEE');

          if (response.data.status === 200) {
            console.log('innnnnnnnn');
            console.log(response, 'RESPONSEEEEEEEEEEEEEEEEE');
            let array = props.cart;
            array = [...array, response.data.cart_detail];
            settempcart(array);

            setquantity(0);
            setaddcart(false);
          }
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    }
  }, [addcart]);

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
  }, [tempcart]);

  console.log(categories, 'CATTTTTTTT');
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
    axios
      .get('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log(response, 'RE');
        const myData = response.data.products;
        setproducts(myData);
      })
      .catch((error) => {});

    axios
      .get('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log(response, 'RESSSSSSSSSSSS');
        const myData = response.data;
        setcategories(myData);
      })
      .catch((error) => {});

    axios
      .get('http://localhost:8000/api/brands', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      })
      .then((respone) => {
        const myData = respone.data;
        setbrands(myData);
      })
      .catch((error) => {});
  }, []);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse" mb={5}>
          <TextField
            sx={{ width: 570 }}
            onChange={(e) => {}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {}} edge="end">
                    <SearchIcon sx={{ color: '#2065D1' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              categories={categories}
              brands={brands}
              category={setcategory}
              categoryvalue={category}
              brand={setbrand}
              brandvalue={brand}
              price={setprice}
              pricevalue={price}
            />
          </Stack>
        </Stack>
        {/* {products.length === 0 ? (
          <Typography>No Products found</Typography>
        ) : ( */}
        <ProductList products={products} open={open} setopen={setopen} setproduct={setproduct} />

        <ShowUpModel
          open={open}
          setopen={setopen}
          setquantity={setquantity}
          quantity={quantity}
          setaddcart={setaddcart}
        />
      </Container>
    </Page>
  );
}
