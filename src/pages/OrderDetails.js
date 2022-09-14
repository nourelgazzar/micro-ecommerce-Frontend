import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Container, Stack, Typography, Divider, IconButton } from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';
import Form from '../components/OrderDetailsForm';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category() {
  const classes = useStyles();

  return (
    <Page title="Dashboard: Categories">
      <Container sx={{ width: 8000, backgroundColor: 'white', height: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Shopping Cart
            </Typography>{' '}
          </div>
          <div style={{ marginLeft: '80%', marginTop: '2%' }}>
            {' '}
            <Typography variant="h12" sx={{ color: 'grey' }}>
              Price{' '}
            </Typography>{' '}
          </div>
        </div>
        <Divider />
        <Form />
        <Divider />
      </Container>
    </Page>
  );
}
