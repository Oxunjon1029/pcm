import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import CustomForm from '../components/CustomForm';
import { useLoginUserMutation } from '../features/api/authApi';
import { toast } from 'react-toastify';

const Login = () => {
  const navigator = useNavigate();
  const [loginUser, { isSuccess, data, isError, error, isLoading }] =
    useLoginUserMutation();
  const loginValidationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values) => {
    loginUser(values);
  };

  useEffect(() => {
    if (isSuccess) {
      if ( data.user.role === 'admin') {
        if (data.user.status === 'active') {
          toast.success(`${data?.user?.name} is successfully logged in`);
          navigator('/admin-user');
        }
      } else {
        if ( data?.user?.status === 'active') {
          toast.success(`${data?.user?.name} is successfully logged in`);
          navigator('/user-profile');
        }
      }
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, data, navigator, isError, error]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '89vh',
      }}>
      <CustomForm
        loading={isLoading}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
      />
    </Box>
  );
};

export default Login;
