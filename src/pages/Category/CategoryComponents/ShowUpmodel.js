import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import Divider from '@mui/material/Divider';

import CloseIcon from '@mui/icons-material/Close';
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

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
    width: 600,
    height: '30vw !important',
    borderWidth: 3,
    borderColor: '#252F3E',
  },
  textFieldDiv: {
    width: '20vw',
    marginLeft: '3vw !important',
    display: 'flex',
    marginTop: '2vw',
  },
}));
const ShowUpModel = (props) => {
  const classes = useStyles();
  console.log(props.open, 'a');

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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Typography sx={{ marginLeft: '-20vw' }} variant="h4">
                Add Categories
              </Typography>
              <div className={classes.textFieldDiv}>
                <RHFTextField name="Category" label="Category" />
                {/* <IconButton type="submit">
                  <AddCircleOutlineIcon
                    sx={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </IconButton> */}
                <LoadingButton loading={isSubmitting}>
                  {' '}
                  <AddCircleOutlineIcon />
                </LoadingButton>
              </div>
              <Divider sx={{ marginTop: '1vw', marginLeft: '0.5vw', width: '38vw' }} />
            </Stack>

            {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Login
            </LoadingButton> */}
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
};

export default ShowUpModel;
