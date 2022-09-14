import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  error: {
    alignItems: 'left',
    marginLeft: '-50%',
    marginTop: '1%',
    color: 'red',
  },
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  axios.defaults.withCredentials = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data.email, data.password);
    axios
      .get('http://localhost:8000/sanctum/csrf-cookie')
      .then((response) => {
        axios
          .post(
            'http://localhost:8000/api/user/login',
            {
              email: data.email,
              password: data.password,
            },
            {
              headers: {
                Authorization: 'Bearer ',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
            }
          )
          .then((response) => {
            console.log('Response : ', response);

            if (response.status === 200) {
              localStorage.setItem('token', response.data.token);
              navigate('/products');
              console.log('Response : ', response);
            }
          })
          .catch((error) => {
            console.log('Error : ', error);
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
        {/* <RHFTextField name="email" label="Email address" /> */}
        <TextField
          name="email"
          label="Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={errors.email}
          {...register('email', { required: true })}
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
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.error}>{errors.password?.message}</div>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
