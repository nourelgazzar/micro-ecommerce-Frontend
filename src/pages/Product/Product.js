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
import ShowUpModelAdd from './ProductComponents/ShowUpModel';

const useStyles = makeStyles((theme) => ({
  table: {},
}));
export default function Product() {
  const classes = useStyles();
  const [openedit, setopenedit] = useState(false);
  const [opendelete, setopendelete] = useState(false);
  const [deleteBtn, setdeleteBtn] = useState(false);
  const [editBtn, seteditBtn] = useState('');
  const [finalarray, setfinalarray] = useState([]);
  const [newproductsids, setnewproductsids] = useState([]);
  const [newcategoriesids, setnewcategoriesids] = useState([]);
  const [openShowUpModelAddEdit, setopenShowUpModelAddEdit] = useState(false);
  const [finalProductsArray, setfinalProductsArray] = useState([]);
  const [height, setheight] = useState(270);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [id, setid] = useState(null);
  const [prevname, setname] = useState('');
  const [prevBrandId, setBrandId] = useState('');
  const [CategoriesIds, setCategoriesIds] = useState([]);
  const [Price, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState('');
  const [allData, setallData] = useState([]);
  const [openSnackBar, setopenSnackBar] = useState(false);
  const [snackBarText, setsnackBarText] = useState('');

  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
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
        const myData = response.data.products;
        setData(myData);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    for (let i = 0; i < data.length; i += 1) {
      console.log('name', prevname);
      if (data[i].name === prevname) {
        setid(data[i].id);
        setBrandId(data[i].brand_id);
        break;
      }
    }
    if (deleteBtn === true && id !== null) {
      axios
        .delete(`http://localhost:8000/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
        })
        .then((response) => {
          if (response.data.status === 200) {
            const newData = data.filter((temp) => {
              return temp.id !== id;
            });

            setData(newData);
            setopendelete(false);
            setopenSnackBar(true);

            setsnackBarText('Product deleted successfully ');
            setdeleteBtn(false);
            getAllProducts();
          }
        })
        .catch((error) => {});
    }
  }, [deleteBtn, data, openedit, newproductsids, id, prevname, editBtn]);

  // const convertFileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = reject;
  //   });
  // };
  const openModalForEdit = (item) => {
    setEditProduct(item);
    setopenShowUpModelAddEdit(true);
  };

  const closeModalForEdit = (item) => {
    setEditProduct({});
    setopenShowUpModelAddEdit(false);
  };

  const updateProduct = (id, editItem) => {
    axios
      .put(`http://localhost:8000/api/admin/products/${id}`, editItem, {
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
          setsnackBarText('Product Updated successfully ');
          getAllProducts();
        }
      })
      .catch((error) => {});
  };
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap-reverse" mb={5}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          <Button
            text={'Add Product'}
            icon={AddCircleOutlineIcon}
            onClick={() => {
              setopenShowUpModelAddEdit(true);
            }}
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <Table
              text={'Product Name'}
              price={'Price'}
              quantity={'Quantity'}
              description={'Description'}
              image={'Image'}
              openedit={openedit}
              setopenedit={setopenedit}
              openeditmodel={openShowUpModelAddEdit}
              setopeneditmodel={setopenShowUpModelAddEdit}
              opendelete={opendelete}
              setopendelete={setopendelete}
              data={data}
              height={setheight}
              openModalForEdit={openModalForEdit}
              deleteBtn={deleteBtn}
              id={setid}
              name={setname}
            />
          </Stack>
        </Stack>

        {/* <Table className={classes.table} /> */}
        <ShowUpModel open={opendelete} setopen={setopendelete} delete={setdeleteBtn} />
        <ShowUpModelAdd
          open={openShowUpModelAddEdit}
          setopen={setopenShowUpModelAddEdit}
          finalProductsArray={finalProductsArray}
          height={height}
          setheight={setheight}
          setfinalProductsArray={setfinalProductsArray}
          openedit={openedit}
          setopenedit={setopenedit}
          editBtn={seteditBtn}
          name={prevname}
          brand_id={prevBrandId}
          snackbar={setopenSnackBar}
          snackbartext={setsnackBarText}
          setnewproductsids={setnewproductsids}
          finalarray={finalarray}
          setfinalarray={setfinalarray}
          allData={allData}
          setallData={setallData}
          setCategoriesIds={setCategoriesIds}
          CategoriesIds={CategoriesIds}
          getAllProducts={getAllProducts}
          price={Price}
          quantity={Quantity}
          description={Description}
          item={editProduct}
          closeModalForEdit={closeModalForEdit}
          updateProduct={updateProduct}
        />
      </Container>
      <SnackBar open={openSnackBar} setopen={setopenSnackBar} message={snackBarText} />
    </Page>
  );
}
