import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

import Page from '../../components/Page';
import Table from '../../components/Table';
import ShowUpModel from '../../components/ShowModelPopUp';
import Button from '../../components/Button';
import ShowUpModelAdd from './CategoryComponents/ShowUpmodel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category() {
  const classes = useStyles();
  const [openedit, setopenedit] = useState(false);
  const [opendelete, setopendelete] = useState(false);

  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalCategoriesArray, setfinalCategoriesArray] = useState([]);
  const [height, setheight] = useState(250);
  const token = '2|hpJg07BkSJEDixqhaGQlgf1SgJWqHO7leMjhuzvr';
  // useEffect(() => {
  //   const getData = () => {
  //     axios
  //       .get('http://localhost:8000/api/admin/categories', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Access-Control-Allow-Origin': '*',
  //           'Content-Type': 'multipart/form-data',
  //           accept: 'application/json',
  //         },
  //       })
  //       .then((respone) => {
  //         console.log(respone, 'response');
  //         const myData = respone.data[0];
  //         console.log(respone.data[0]);
  //         // setData(myData);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   getData();
  // }, []);
  return (
    <Page title="Dashboard: Categories">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse" mb={5}>
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
          <Button
            text={'Add Category'}
            icon={AddCircleOutlineIcon}
            onClick={() => {
              setopenShowUpModelAddEdit(true);
            }}
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Table
              text={'Category Name'}
              openedit={openedit}
              setopenedit={setopenedit}
              openeditmodel={openShowUpModelAddEdit}
              setopeneditmodel={setopenShowUpModelAddEdit}
              opendelete={opendelete}
              setopendelete={setopendelete}
            />
          </Stack>
        </Stack>

        {/* <Table className={classes.table} /> */}
        <ShowUpModel open={opendelete} setopen={setopendelete} />
        <ShowUpModelAdd
          open={openShowUpModelAddEdit}
          setopen={setopenShowUpModelAddEdit}
          finalCategoriesArray={finalCategoriesArray}
          height={height}
          setheight={setheight}
          setfinalCategoriesArray={setfinalCategoriesArray}
          openedit={openedit}
          setopenedit={setopenedit}
        />
      </Container>
    </Page>
  );
}
