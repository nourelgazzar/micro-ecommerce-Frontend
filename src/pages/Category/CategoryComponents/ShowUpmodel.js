import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LoadingButton } from '@mui/lab';
import Button from '../../../components/Button';

import CategoryDiv from './CategoryDiv';
// import Button from '../../../components/Button';

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

  const addnewCategory = () => {
    console.log(categories, 'in add');
    const array = categories;

    for (let i = 0; i < array.length; i += 1) {
      console.log(array[i], 1);
      array[i].id = i;
    }
    const length = array.length;
    const object = { name: { category }, id: length };
    array[length] = object;
    console.log(array, 'ALLLLLLLLLLLLL');
    setcategories(array);
    setcategory('');
  };

  const CategorySchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
  });

  const defaultValues = {
    category: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
    console.log(categories, 'before delete');

    if (deleteCheck === true) {
      console.log(deleteID, 'delete id');
      const newar = categories.filter((item) => !(item.id === deleteID));
      for (let i = 0; i < newar.length; i += 1) {
        console.log(newar[i], 1);
        newar[i].id = i;
      }
      setcategories(newar);
    }
    if (categories.length === 0) props.setheight(250);
    setdeleteCheck(false);
    console.log(categories, 'after delete');
  }, [deleteCheck, categories]);

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
              <Typography sx={{ marginLeft: '-24vw' }} variant="h4">
                Add Categories
              </Typography>
              <div className={classes.textFieldDiv}>
                <TextField
                  name="Category"
                  label="Category"
                  value={category}
                  onChange={(e) => {
                    props.setheight(500);
                    setcategory(e.target.value);
                  }}
                />
                <IconButton
                  type="submit"
                  onClick={() => {
                    addnewCategory();
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </IconButton>
              </div>
              <div className={classes.buttonAddCategory}>
                {categories.length > 0 && (
                  <Button text={'Add Category'} icon={AddCircleOutlineIcon} onClick={() => {}} />
                )}
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: 640 }} />
            </Stack>

            <div className={classes.newCat}>
              {categories.map((item) => (
                <div className={classes.categorydiv}>
                  <CategoryDiv
                    text={item.name.category}
                    id={item.id}
                    setdeleteID={setdeleteID}
                    setdeleteCheck={setdeleteCheck}
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
