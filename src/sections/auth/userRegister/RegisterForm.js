import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  error: {
    alignItems: 'left',
    marginLeft: '-50%',
    marginTop: '1%',
    color: 'red',
  },
}));

export default function RegisterForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');
  const [error, seterror] = useState(false);

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('First name required')
      .matches(/^[aA-zZ\s]+$/, 'Only Letters Are allowed for first name'),
    last_name: Yup.string()
      .required('Last name required')
      .matches(/^[aA-zZ\s]+$/, 'Only Letters Are allowed for last name'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null]),
  });

  // const defaultValues = {
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  // };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    // defaultValues,
  });

  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data.email, data.password);
    axios
      .get('http://localhost:8000/sanctum/csrf-cookie')
      .then((response) => {
        axios
      .post('http://localhost:8000/api/user/register', data, {
        headers: {
          Authorization: 'Bearer ',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('Response : ', response);

        if (response.status === 201) {
          localStorage.setItem('token', response.data.token);
          navigate('/loginuser', { replace: true });
          console.log('Response : ', response);
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
        if (error.response.status === 422) {
          seterror(true);
        }
      });
      })
      .catch((error) => {
        console.log('Error : ', error);
      });
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            name="first_name"
            label="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            error={errors.first_name}
            {...register('first_name', { required: true })}
          />
          <div className={classes.error}>{errors.first_name?.message}</div>
          <TextField
            name="last_name"
            label="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            error={errors.last_name}
            {...register('last_name', { required: true })}
          />

          <div className={classes.error}>{errors.last_name?.message}</div>
        </Stack>

        <TextField
          name="email"
          label="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          {...register('email', { required: true })}
          error={errors.email}
        />
        <div className={classes.error}>{errors.email?.message}</div>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={errors.password}
          {...register('password', { required: true })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.error}>{errors.password?.message}</div>

        <TextField
          name="password_confirmation"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setpasswordConfirmation(e.target.value);
          }}
          error={errors.password_confirmation}
          {...register('password_confirmation', { required: true })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.error}>{errors.password_confirmation && "Passwords Don't Match"}</div>
        {error && <div className={classes.error}>User Already Exists</div>}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
