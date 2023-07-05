import React, { useEffect } from 'react';
import CustomForm from '../components/CustomForm';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router';
import { Box } from '@mui/material';
import { useRegisterUserMutation } from '../features/api/authApi';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [registerUser, { isSuccess, isError, data, error, isLoading }] =
    useRegisterUserMutation();
  const location = useLocation();
  const navigator = useNavigate();
  const signupValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    password: Yup.string().min(6).required(),
  });
  const initialValues = {
    email: '',
    name: '',
    password: '',
  };
  const handleSubmit = (values) => {
    registerUser(values);
  };
  useEffect(() => {
    if (isSuccess) {
      navigator('/login');
      toast.success(data?.message);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, navigator, data, isError, error]);
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
        location={location}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signupValidationSchema}
      />
    </Box>
  );
};

export default SignUp;
