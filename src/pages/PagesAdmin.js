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

  console.log(category, brand, price, 'TESTTTTTT');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  console.log(categories, 'CATTTTTTTT');
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/admin/products', {
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
      .get('http://localhost:8000/api/admin/categories', {
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
      .get('http://localhost:8000/api/admin/brands', {
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
      </Container>
    </Page>
  );
}
