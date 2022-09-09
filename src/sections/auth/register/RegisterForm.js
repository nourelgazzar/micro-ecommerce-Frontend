import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required('First name required'),
    last_name: Yup.string().required('Last name required'),
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
    console.log(data);
    axios
      .post('http://localhost:8000/api/admin/register', data, {
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
          navigate('/login', { replace: true });
          console.log('Response : ', response);
        }
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
            {...register('first_name', { required: true })}
          />
          {errors.first_name?.message}
          <TextField
            name="last_name"
            label="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            {...register('last_name', { required: true })}
          />
          {errors.last_name?.message}
        </Stack>

        <TextField
          name="email"
          label="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          {...register('email', { required: true })}
        />
        {errors.email?.message}

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
        {errors.password?.message}
        <TextField
          name="password_confirmation"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setpasswordConfirmation(e.target.value);
          }}
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
        {errors.password_confirmation && "Passwords Don't Match"}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
