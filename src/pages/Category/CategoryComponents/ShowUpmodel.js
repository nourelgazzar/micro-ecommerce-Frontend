import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { FamilyRestroomRounded } from '@mui/icons-material';
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
}));
const ShowUpModel = (props) => {
  const classes = useStyles(props);
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState('');
  const [deleteCheck, setdeleteCheck] = useState(false);
  const [deleteID, setdeleteID] = useState(0);
  const token = localStorage.getItem('token');

  const CategorySchema = Yup.object().shape({
    name: Yup.string().max(40).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CategorySchema) });

  const addnewCategory = (data) => {
    props.setheight(500);
    setcategories([...categories, { category: data.name, id: count }]);
    setcategory('');
    count += 1;
  };

  const onSubmit = async (data) => {
    props.seteditBtn(data);
    axios
      .post('http://localhost:8000/api/admin/categories', data, {
        headers: {
          Authorization: `Bearer  ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('Response : ', response);
        if (response.status === 201) {
          response.text('Added Successfully');
          console.log('Response Text', response.text);
        }
      })
      .catch((error) => {
        console.log('Error :', error);
        if (error.status === 401) {
          console.log(error.message);
        }
      });
  };

  useEffect(() => {
    if (deleteCheck === true) {
      const newar = categories.filter((item) => !(item.id === deleteID));
      for (let i = 0; i < newar.length; i += 1) {
        newar[i].id = i;
      }
      setcategories(newar);
    }
    if (categories.length === 0) props.setheight(250);
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
                props.setopen(false);
                props.setopenedit(false);
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
                  // value={category}

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
                      }}
                    />
                  </IconButton>
                )}
              </div>
              {errors.name?.message}
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
              {categories.map((item) => (
                <div className={classes.categorydiv}>
                  <CategoryDiv
                    text={item.category}
                    id={item.id}
                    setdeleteID={setdeleteID}
                    setdeleteCheck={setdeleteCheck}
                    deleteItem={() => {
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
