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
    marginTop: '20%',
    borderRadius: 20,
    width: 650,
    height: '30vw !important',
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
  },
}));
const ShowUpModel = (props) => {
  const classes = useStyles();
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState('');
  const [deleteCheck, setdeleteCheck] = useState(false);
  const [deleteID, setdeleteID] = useState(0);

  console.log(categories, 'cattttttttttt');

  const addnewCategory = () => {
    console.log(category, 'CATTTTTTTTTTTT');
    const length = categories.length;
    const object = { name: { category }, id: length + 1 };
    console.log(object, 'ONJECTTTTTTTT');
    let array = categories;
    array = array.push(object);
    setcategory(array);
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
    if (deleteCheck === true) {
      const newar = categories.filter((item) => !(item.id === deleteID));
      console.log(newar, 'newwwwwwwwwww');
      setcategories(newar);
    }
    setdeleteCheck(false);
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
              <Typography sx={{ marginLeft: '-20vw' }} variant="h4">
                Add Categories
              </Typography>
              <div className={classes.textFieldDiv}>
                <TextField
                  name="Category"
                  label="Category"
                  onChange={(e) => {
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
                <LoadingButton loading={isSubmitting} type="submit" variant="contained">
                  {' '}
                  <AddCircleOutlineIcon />
                </LoadingButton>
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: '38vw' }} />
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
            <div>
              <Button text={'Add Category'} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;
