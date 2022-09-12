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

  console.log(openedit, 'open edit bool ');
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
      console.log(data, data[i].name, prevname, 'alllllllllllllll');
      if (data[i].name === prevname) {
        setid(data[i].id);
        break;
      }
      console.log(id, 'IDDDDDDDDDDDDDD');
    }

    if (deleteBtn === true && id !== null) {
      console.log(deleteBtn, id, prevname, 'alllllllllllllllllll');
      console.log('in deleteeeeeeeee');
      console.log(id, 'test');
      axios
        .delete(`http://localhost:8000/api/admin/brands/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(response, 'response');
          if (response.data.status === 200) {
            const newData = data.filter((temp) => {
              return temp.id !== id;
            });
            console.log(newData, 'newwwwwwwwwwww');

            setData(newData);
            setopendelete(false);
            setopenSnackBar(true);

            setsnackBarText('Brand deleted successfully ');
            setdeleteBtn(false);
          }
        })
        .catch((error) => {});
    }
    if (openedit === true) {
      if (editBtn !== '') {
        if (editBtn !== prevname) {
          axios
            .put(
              `http://localhost:8000/api/admin/brands/${id}`,
              {
                name: editBtn,
              },
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
              setopenedit(false);
              seteditBtn('');
              if (response.data.status === 200) {
                console.log(response.data, response, 'EDITTTTTTTTTT');
                const newcategory = response.data.data;
                const newCategories = data.filter((temp) => {
                  console.log(temp, 'temp');
                  if (temp.id === newcategory.id) {
                    temp.name = newcategory.name;
                    console.log(temp, newcategory, 'checkkkkkkk');
                  }
                  return temp;
                });
                console.log(newCategories, 'newwwwwwwwwwwwwwwww');
                setData(newCategories);
                setnewcategoriesids([]);
                setopenSnackBar(true);
                setsnackBarText('Brand Updated successfully ');
              }
            })
            .catch((error) => {});
        }
      }
    }
    console.log(newcategoriesids, 'newwwwwwwwwwwwww cat ');
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
    <Page title="Dashboard: Categories">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse" mb={5}>
          <Typography variant="h4" gutterBottom>
            Brands
          </Typography>
          <Button
            text={'Add Brand'}
            icon={AddCircleOutlineIcon}
            onClick={() => {
              setopenShowUpModelAddEdit(true);
            }}
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Table
              text={'Brand Name'}
              openedit={openedit}
              setopenedit={setopenedit}
              openeditmodel={openShowUpModelAddEdit}
              setopeneditmodel={setopenShowUpModelAddEdit}
              opendelete={opendelete}
              setopendelete={setopendelete}
              data={data}
              name={setname}
              height={setheight}
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
        />
      </Container>
      <SnackBar open={openSnackBar} setopen={setopenSnackBar} message={snackBarText} />
    </Page>
  );
}
