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
import ShowUpModelAdd from './BrandComponents/ShowUpmodel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Category() {
  const classes = useStyles();
  const [openedit, setopenedit] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [deleteBtn, setdeleteBtn] = useState(false);
  const [editBtn, seteditBtn] = useState('');
  const [finalarray, setfinalarray] = useState([]);
  const [newcategoriesids, setnewcategoriesids] = useState([]);
  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalCategoriesArray, setfinalCategoriesArray] = useState([]);
  const [height, setheight] = useState(270);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [id, setid] = useState(null);
  const [prevname, setname] = useState('');

  const [openSnackBar, setopenSnackBar] = useState(false);
  const [snackBarText, setsnackBarText] = useState('');
  const [editCategories, setEditCategories] = useState({});

  const getAllCategories = () => {
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
        setData(myData);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const openModalForEdit = (item) => {
    setEditCategories(item);
    setopenShowUpModelAddEdit(true);
  };

  const closeModalForEdit = (item) => {
    setEditCategories({});
    setopenShowUpModelAddEdit(false);
  };

  const updateCategory = (id, editItem) => {
    axios
      .put(`http://localhost:8000/api/admin/brands/${id}`, editItem, {
        headers: {
          Authorization: `Bearer  ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((response) => {
        setopenedit(false);
        if (response.status === 200) {
          setopenSnackBar(true);
          setsnackBarText('Brand Updated successfully ');
          getAllCategories();
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].name === prevname) {
        setid(data[i].id);
        break;
      }
    }
    if (deleteBtn === true && id !== null) {
      console.log('id ', id);
      axios
        .delete(`http://localhost:8000/api/admin/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(response, 'response');
          if (response.data.status === 200) {
            const newData = data.filter((temp) => {
              return temp.id !== id;
            });

            setData(newData);
            setopendelete(false);
            setopenSnackBar(true);

            setsnackBarText('Brands deleted successfully ');
            setdeleteBtn(false);
            getAllCategories();
          }
        })
        .catch((error) => {});
    }

    if (newcategoriesids.length !== 0) {
      let array = data;
      for (let i = 0; i < newcategoriesids.length; i += 1) {
        array = [...array, { name: finalarray[i], id: newcategoriesids[i] }];
      }
      setData(array);
      setnewcategoriesids([]);
      setfinalarray([]);
    }
  }, [deleteBtn, data, openedit, newcategoriesids, id, prevname, editBtn]);

  return (
    <Page title="Dashboard: Brands">
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
              height={setheight}
              openModalForEdit={openModalForEdit}
              deleteBtn={deleteBtn}
              id={setid}
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
          name={prevname}
          snackbar={setopenSnackBar}
          snackbartext={setsnackBarText}
          setnewcategoriesids={setnewcategoriesids}
          finalarray={finalarray}
          setfinalarray={setfinalarray}
          closeModalForEdit={closeModalForEdit}
          item={editCategories}
          updateCategory={updateCategory}
        />
      </Container>
      <SnackBar open={openSnackBar} setopen={setopenSnackBar} message={snackBarText} />
    </Page>
  );
}
