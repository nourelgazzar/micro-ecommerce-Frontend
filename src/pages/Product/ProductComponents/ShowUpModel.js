import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { CheckBox, FamilyRestroomRounded, PropaneSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  FormLabel,
  InputLabel,
  MenuItem,
  ListItemText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, OutlinedInput, Select } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Fab from '@mui/material/Fab';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from '../../../components/hook-form';

import Button from '../../../components/Button';

import ProductDiv from './ProductDiv';

// import Button from '../../../components/Button';

// let count = 1;
const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  formControl: {
    margin: theme.spacing(1),
    Width: '40vw',
    display: 'flex',
    marginLeft: '3.5vw !important',
    marginTop: '2vw',
  },
  modal: {
    backgroundColor: '#FFFAFA',
    height: 650,
    marginTop: '20%',
    borderRadius: 20,
    width: 650,
    borderWidth: 3,
    borderColor: '#252F3E',
  },
  textFieldDiv: {
    width: '40vw',
    marginLeft: '3.5vw !important',
    display: 'flex',
    marginTop: '2vw',
  },
  newCat: {
    width: '100%',
    display: 'flex',
    height: 250,
    borderRadius: 20,

    overflow: 'auto',
    flexWrap: 'wrap',
  },
  productdiv: {
    marginLeft: 5,
    marginTop: '5%',
  },
  buttonAddProduct: { marginTop: '2%', textAlign: 'right', marginRight: 30 },
  buttonAddImage: { marginTop: '2%', textAlign: 'right', marginRight: 30 },
  error: {
    alignItems: 'left',
    marginLeft: '-40%',
    marginTop: '1%',
    color: 'red',
  },
  InputLabel: {
    alignItems: 'right',
    width: '40vw',
    display: 'flex',
  },
  MenuItem: {
    width: '20vw',
  },
}));
const ShowUpModel = (props) => {
  // Set States

  const classes = useStyles(props);
  const [products, setproducts] = useState([]);
  const [product, setproduct] = useState('');
  const [deleteCheck, setdeleteCheck] = useState(false);
  const [deleteID, setdeleteID] = useState(0);
  const [error, seterror] = useState('');
  const token = localStorage.getItem('token');
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (props.open === true) {
      if (props.openedit) {
        console.log(1, '1');
      } else if (products.length !== 0) {
        console.log(products === [], products, products.length);
        console.log(products.legnth, 'length');
        console.log(2);

        props.setheight(500);
      } else {
        console.log(3);

        props.setheight(270);
      }
    }
  }, [props.open]);

  // React hook form validation

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .max(40)
      .required('Name Is Required')
      .matches(/(^([a-zA-Z]+)(\d+)?$)/u, 'Name has to start with a letter'),
    price: Yup.number()
      .typeError('Price Must Be a number')
      .max(999999)
      .positive('Price Must Be a positive number')
      .integer()
      .required('Price Is Required'),
    quantity: Yup.number()
      .typeError('Quantity Must Be a number')
      .max(999)
      .positive('Quantity Must Be a positive number')
      .integer()
      .required('Quantity Is Required'),
    description: Yup.string()
      .max(500, 'Description Must Be At Most 500 Charachters')
      .required('Description Is Required'),
    image: Yup.mixed().required('Please Provide a file'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(ProductSchema) });

  useEffect(() => {}, [props.name]);

  const changeSelectedBrand = (event) => {
    setBrand(event.target.value);
    console.log('Value : ', event.target.value);
  };

  // Axios Call For GET Brands

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/admin/brands', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('response : ', response);
        const myData = response.data;
        console.log('data,', myData);
        setBrands(myData);
      })
      .catch((error) => {});
  }, []);

  // Axios Call for GET categories

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/admin/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('response : ', response);
        const myData = response.data;
        console.log('data,', myData);
        setCategories(myData);
      })
      .catch((error) => {});
  }, []);

  // Axios Call for Add Product
  const onSubmit = async (data) => {
    if (props.openedit === false) {
      console.log(props.finalarray, 'array addddddddddddddddddd');
      axios
        .post(
          'http://localhost:8000/api/admin/products',
          { data },
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
          console.log('Response : ', response);
          if (response.data.status === 201) {
            props.snackbar(true);
            props.snackbartext('Product Added Successfully');
            console.log('hereeeeee', response.data.product_ids);
            props.setnewproductsids(response.data.product_ids);
            setproducts([]);
          }
        })
        .catch((error) => {
          console.log('Error :', error);
          if (error.status === 401) {
            console.log(error.message);
          }
        });
    } else {
      props.editBtn(data.name);
    }

    props.setopen(false);
  };

  useEffect(() => {
    if (deleteCheck === true) {
      const newar = products.filter((item) => !(item.id === deleteID));
      for (let i = 0; i < newar.length; i += 1) {
        newar[i].id = i;
      }
      setproducts(newar);
    }
    if (products.length === 0) setdeleteCheck(false);
  }, [deleteCheck, products]);

  console.log({ products });
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={props.open}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 400,
          alignItems: 'center',
        }}
      >
        <div className={classes.modal}>
          <div style={{ marginTop: '5%', textAlign: 'right', marginRight: 20 }}>
            <IconButton
              sx={{
                size: 'small',
                color: 'primary',
                width: 30,
                height: 30,
              }}
              onClick={() => {
                props.setopen(false);
                props.setopeneditmodel(false);
              }}
            >
              <CloseIcon
                sx={{
                  color: 'black',
                  fontSize: 13,
                }}
              />
            </IconButton>{' '}
          </div>
          <div>
            <Stack>
              {props.openedit ? (
                <Typography sx={{ marginLeft: '-56%' }} variant="h4">
                  {' '}
                  Edit Product
                </Typography>
              ) : (
                <Typography sx={{ marginLeft: '-56%' }} variant="h4">
                  {' '}
                  Add Product
                </Typography>
              )}
              <div className={classes.textFieldDiv}>
                <TextField
                  name="name"
                  label="Product Name"
                  defaultValue={props.openedit ? props.name : ''}
                  error={(products.length === 0 && errors.name) || error}
                  onChange={(e) => {
                    setproduct(e.target.value);
                  }}
                  {...register('name', { required: true })}
                />
              </div>

              <div className={classes.error}> {(products.length === 0 && errors.name?.message) || error}</div>

              <div className={classes.textFieldDiv}>
                <TextField
                  name="price"
                  label="Price"
                  defaultValue={props.openedit ? props.price : ''}
                  error={(products.length === 0 && errors.price) || error}
                  onChange={(e) => {
                    setproduct(e.target.value);
                  }}
                  {...register('price', { required: true })}
                />
              </div>

              <div className={classes.error}> {(products.length === 0 && errors.price?.message) || error}</div>

              <div className={classes.textFieldDiv}>
                <TextField
                  name="quantity"
                  label="Quantity"
                  defaultValue={props.openedit ? props.quantity : ''}
                  error={(products.length === 0 && errors.quantity) || error}
                  onChange={(e) => {
                    setproduct(e.target.value);
                  }}
                  {...register('quantity', { required: true })}
                />
              </div>

              <div className={classes.error}> {(products.length === 0 && errors.quantity?.message) || error}</div>

              <div className={classes.textFieldDiv}>
                <TextField
                  name="description"
                  label="Description"
                  defaultValue={props.openedit ? props.description : ''}
                  error={(products.length === 0 && errors.description) || error}
                  onChange={(e) => {
                    setproduct(e.target.value);
                  }}
                  {...register('description', { required: true })}
                />
              </div>

              <div className={classes.error}> {(products.length === 0 && errors.description?.message) || error}</div>

              {/* Brands DropDown */}

              <div className={classes.formControl}>
                <InputLabel>Select Brand : </InputLabel>
                <FormControl>
                  <Select onChange={changeSelectedBrand} label="Select Brand">
                    {brands.map((item, index) => (
                      <MenuItem value={item.id} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Categories DropDown */}

              <div>
                <FormControl sx={{ m: 1, width: 450 }}>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    displayEmpty
                    value={categories}
                    input={<OutlinedInput />}
                    onChange={(e) => {
                      setCategories(e.target.value);
                    }}
                  >
                    {categories.map((item, index) => (
                      <MenuItem value={item.id} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" name="image" {...register('image', { required: true })} />
                  <PhotoCamera />
                </IconButton>
              </div>

              <div className={classes.error}> {(products.length === 0 && errors.image?.message) || error}</div>
              {/* <Fab className={classes.buttonAddImage}>
                <AddPhotoAlternateIcon />
              </Fab> */}

              <div className={classes.buttonAddProduct}>
                <Button
                  text={props.openedit ? 'Edit Product' : 'Add Product'}
                  icon={AddCircleOutlineIcon}
                  onClick={(e) => {
                    handleSubmit(onSubmit)(e);
                  }}
                />
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: 640 }} />
            </Stack>

            <div className={classes.newCat}>
              {!props.openedit &&
                products.map((item) => (
                  <div className={classes.productdiv}>
                    <ProductDiv
                      text={item.product}
                      id={item.id}
                      setdeleteID={setdeleteID}
                      setdeleteCheck={setdeleteCheck}
                      deleteItem={() => {
                        const newarray = props.finalarray.filter((temp) => {
                          return temp !== item.product;
                        });
                        console.log(newarray, 'newwwwwwwwwwwwww');
                        props.setfinalarray(newarray);
                        const newProducts = products.filter((temp) => {
                          return temp.id !== item.id;
                        });
                        setproducts(newProducts);
                      }}
                    />
                  </div>
                ))}
            </div>
            <div>{/* <Button text={'Add Product'} /> */}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;
