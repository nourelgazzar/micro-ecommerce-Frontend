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
import { RHFTextField } from '../../../components/hook-form';
import Button from '../../../components/Button';

import BrandDiv from './BrandDiv';
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
  branddiv: {
    marginLeft: 5,
    marginTop: '5%',
  },
  buttonAddbrand: { marginTop: '2%', textAlign: 'right', marginRight: 30 },
}));
const ShowUpModel = (props) => {
  const classes = useStyles(props);
  const [brands, setbrands] = useState([]);
  const [brand, setbrand] = useState('');
  const [deleteCheck, setdeleteCheck] = useState(false);
  const [deleteID, setdeleteID] = useState(0);

  const brandSchema = Yup.object().shape({
    Brand: Yup.string().max(40).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(brandSchema) });

  const addnewbrand = (data) => {
    props.setheight(500);
    setbrands([...brands, { brand: data.brand, id: count }]);
    setbrand('');
    count += 1;
  };

  useEffect(() => {
    if (deleteCheck === true) {
      const newar = brands.filter((item) => !(item.id === deleteID));
      for (let i = 0; i < newar.length; i += 1) {
        newar[i].id = i;
      }
      setbrands(newar);
    }
    if (brands.length === 0) props.setheight(250);
    setdeleteCheck(false);
  }, [deleteCheck, brands]);

  console.log({ brands });
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
              <Typography sx={{ marginLeft: '-56%' }} variant="h4">
                Add brands
              </Typography>
              <div className={classes.textFieldDiv}>
                <TextField
                  name="Brand"
                  label="Brand"
                  // value={brand}

                  onChange={(e) => {
                    props.setheight(500);
                    setbrand(e.target.value);
                  }}
                  {...register('brand', { required: true })}
                />

                <IconButton
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(addnewbrand)(e);
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
              {errors.brand?.message}
              <div className={classes.buttonAddbrand}>
                {brands.length > 0 && <Button text={'Add brand'} icon={AddCircleOutlineIcon} onClick={() => {}} />}
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: 640 }} />
            </Stack>

            <div className={classes.newCat}>
              {brands.map((item) => (
                <div className={classes.branddiv}>
                  <brandDiv
                    text={item.brand}
                    id={item.id}
                    setdeleteID={setdeleteID}
                    setdeleteCheck={setdeleteCheck}
                    deleteItem={() => {
                      const newbrands = brands.filter((temp) => {
                        return temp.id !== item.id;
                      });
                      setbrands(newbrands);
                    }}
                  />
                </div>
              ))}
            </div>
            <div>{/* <Button text={'Add brand'} /> */}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;
