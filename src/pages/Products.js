import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Searchbar from '../layouts/dashboard/Searchbar';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  // const ProductSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .max(40)
  //     .required()
  //     .matches(/(^([a-zA-Z]+)(\d+)?$)/u, 'Name has to start with a letter'),
  //   price: Yup.number().max(999999).positive().integer().required(),
  //   quantity: Yup.number().max(999).positive().integer().required(),
  //   description: Yup.string().max(500).required(),
  //   image: Yup.mixed()
  //     .required('Please Provide a profile')
  //     .test('fileSize', 'Maximum Image Size is 2MB', (value) => {
  //       return value && value[0].size <= 2000000;
  //     }),
  // });
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: yupResolver(ProductSchema) });

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Searchbar />
        <Button> Add Product</Button>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
