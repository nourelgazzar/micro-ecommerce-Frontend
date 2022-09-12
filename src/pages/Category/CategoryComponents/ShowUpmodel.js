import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { FamilyRestroomRounded, PropaneSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from '../../../components/hook-form';

import Button from '../../../components/Button';

import CategoryDiv from './CategoryDiv';

// import Button from '../../../components/Button';

let count = 1;
const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  modal: {
    backgroundColor: '#FFFAFA',
    height: (props) => props.height,
    marginTop: '20%',
    borderRadius: 20,
    width: 650,
    borderWidth: 3,
    borderColor: '#252F3E',
  },
  textFieldDiv: {
    width: '20vw',
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
  categorydiv: {
    marginLeft: 5,
    marginTop: '5%',
  },
  buttonAddCategory: { marginTop: '2%', textAlign: 'right', marginRight: 30 },
  error: {
    alignItems: 'left',
    marginLeft: '-50%',
    marginTop: '1%',
    color: 'red',
  },
}));
const ShowUpModel = (props) => {
  const classes = useStyles(props);
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState('');
  const [deleteCheck, setdeleteCheck] = useState(false);
  const [deleteID, setdeleteID] = useState(0);
  const [error, seterror] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (props.open === true) {
      console.log(props.openedit, props.open, categories, 'aaaaaaaaaaaaaaa');

      if (props.openedit) {
        props.setheight(270);
        console.log(1, '1');
      } else if (categories.length !== 0) {
        console.log(categories === [], categories, categories.length);
        console.log(categories.legnth, 'length');
        console.log(2);

        props.setheight(500);
      } else {
        console.log(3);

        props.setheight(270);
      }
    }
  }, [props.open]);

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .max(40)
      .required()
      .matches(/(^([a-zA-Z]+)(\d+)?$)/u, ' Category has to start with a letter'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(CategorySchema) });

  const addnewCategory = (data) => {
    if (props.openedit === true) {
      props.editBtn(data.name);
    } else if (props.finalarray.includes(data.name.toLowerCase())) {
      seterror('Category is already included');
      console.log(error, 'Error');
    } else {
      props.setheight(500);
      seterror(null);

      props.setfinalarray([...props.finalarray, data.name]);
      setcategories([...categories, { category: data.name, id: count }]);
      setcategory('');

      count += 1;
    }
  };

  useEffect(() => {}, [props.name]);

  const onSubmit = async (data) => {
    if (props.openedit === false) {
      console.log(props.finalarray, 'array addddddddddddddddddd');
      axios
        .post(
          'http://localhost:8000/api/admin/categories',
          { names: props.finalarray },
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
            props.snackbartext('Category Added Successfully');
            console.log('hereeeeee', response.data.category_ids);
            props.setnewcategoriesids(response.data.category_ids);
            setcategories([]);
          }
        })
        .catch((error) => {
          console.log('Error :', error);
          if (error.status === 401) {
            console.log(error.message);
          }
        });
    } else {
      console.log(data, 'DATTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
      props.editBtn(data.name);
    }

    props.setopen(false);
  };

  useEffect(() => {
    if (deleteCheck === true) {
      const newar = categories.filter((item) => !(item.id === deleteID));
      for (let i = 0; i < newar.length; i += 1) {
        newar[i].id = i;
      }
      setcategories(newar);
    }
    if (categories.length === 0) props.setheight(270);
    setdeleteCheck(false);
  }, [deleteCheck, categories]);

  console.log({ categories });
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
                props.setopenedit(false);

                props.setopen(false);
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
                  Edit Category
                </Typography>
              ) : (
                <Typography sx={{ marginLeft: '-56%' }} variant="h4">
                  {' '}
                  Add Category
                </Typography>
              )}
              <div className={classes.textFieldDiv}>
                <TextField
                  name="name"
                  label="Category"
                  error={(categories.length === 0 && errors.name) || error}
                  onChange={(e) => {
                    props.setheight(500);
                    setcategory(e.target.value);
                  }}
                  {...register('name', { required: true })}
                />

                {!props.openedit && (
                  <IconButton
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(addnewCategory)(e);
                    }}
                  >
                    <AddCircleOutlineIcon
                      sx={{
                        width: 30,
                        height: 30,
                        color: '#2065D1',
                      }}
                    />
                  </IconButton>
                )}
              </div>
              <div className={classes.error}> {(categories.length === 0 && errors.name?.message) || error}</div>
              <div className={classes.buttonAddCategory}>
                {(categories.length > 0 || props.openedit) && (
                  <Button
                    text={props.openedit ? 'Edit Category' : 'Add Category'}
                    icon={AddCircleOutlineIcon}
                    onClick={(e) => {
                      handleSubmit(onSubmit)(e);
                    }}
                  />
                )}
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: 640 }} />
            </Stack>

            <div className={classes.newCat}>
              {!props.openedit &&
                categories.map((item) => (
                  <div className={classes.categorydiv}>
                    <CategoryDiv
                      text={item.category}
                      id={item.id}
                      setdeleteID={setdeleteID}
                      setdeleteCheck={setdeleteCheck}
                      deleteItem={() => {
                        const newarray = props.finalarray.filter((temp) => {
                          return temp !== item.category;
                        });
                        console.log(newarray, 'newwwwwwwwwwwwww');
                        props.setfinalarray(newarray);
                        const newCategories = categories.filter((temp) => {
                          return temp.id !== item.id;
                        });
                        setcategories(newCategories);
                      }}
                    />
                  </div>
                ))}
            </div>
            <div>{/* <Button text={'Add Category'} /> */}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;
