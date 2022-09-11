import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Container, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';

import Page from '../../components/Page';
import Table from '../../components/Table';
import ShowUpModel from '../../components/ShowModelPopUp';
import Button from '../../components/Button';
import SnackBar from '../../components/SnackBar';
import ShowUpModelAdd from './CategoryComponents/ShowUpmodel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category() {
  const classes = useStyles();
  const [openedit, setopenedit] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [deleteBtn, setdeleteBtn] = useState(false);
  const [editBtn, seteditBtn] = useState(false);

  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalCategoriesArray, setfinalCategoriesArray] = useState([]);
  const [height, setheight] = useState(250);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [id, setid] = useState(0);
  const [name, setname] = useState('');

  const [openSnackBar, setopenSnackBar] = useState(false);
  const [snackBarText, setsnackBarText] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/admin/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      })
      .then((respone) => {
        console.log(respone);
        const myData = respone.data;
        // console.log(respone.data);
        setData(myData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log('Data : ', data);

  useEffect(() => {
    console.log('INNN');
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].name === name) {
        setid(data[i].id);
        console.log(data[i]);
      }
    }
    if (deleteBtn === true) {
      axios
        .delete(`http://localhost:8000/api/admin/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const newData = data.filter((temp) => {
              return temp.id !== id;
            });
            setData(newData);
            setopendelete(false);
            setopenSnackBar(true);
            setsnackBarText('Category deleted successfully ');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setdeleteBtn(false);
    }
    if (openedit === true) {
      axios
        .put(`http://localhost:8000/api/admin/categories/${id}`, {
          headers: {
            Authorization: 'Bearer ',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setopenSnackBar(true);
            setsnackBarText('Category Updated successfully ');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setopenedit(false);
    }
  }, [deleteBtn, data, openedit]);

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
              data={data}
              name={setname}
            />
          </Stack>
        </Stack>

        {/* <Table className={classes.table} /> */}
        <ShowUpModel open={opendelete} setopen={setopendelete} delete={setdeleteBtn} />
        <ShowUpModelAdd
          open={openShowUpModelAddEdit}
          setopen={setopenShowUpModelAddEdit}
          finalCategoriesArray={finalCategoriesArray}
          height={height}
          setheight={setheight}
          setfinalCategoriesArray={setfinalCategoriesArray}
          openedit={openedit}
          setopenedit={setopenedit}
          editBtn={seteditBtn}
          name={name}
          snackbar={setopenSnackBar}
          snackbartext={setsnackBarText}
        />
      </Container>
      <SnackBar open={openSnackBar} setopen={setopenSnackBar} />
    </Page>
  );
}
