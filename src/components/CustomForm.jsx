import React from 'react';
import { Card, CardContent } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import TextFormField from '../components/TextFormField';
import LoadingButton from '@mui/lab/LoadingButton';
const CustomForm = ({
  onSubmit,
  initialValues,
  validationSchema,
  location,
  loading,
}) => {
  return (
    <Card
      sx={{
        boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.11)',
        width: 400
      }}>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {() => (
            <Form>
              {location && location.pathname === '/signup' && (
                <Field
                  label='Full Name'
                  placeholder='Enter your name...'
                  name='name'
                  component={TextFormField}
                />
              )}
              <Field
                label='Email'
                placeholder='Enter you email...'
                name='email'
                component={TextFormField}
              />

              <Field
                label='Password'
                placeholder='Enter your password...'
                name='password'
                type='password'
                component={TextFormField}
              />
              <LoadingButton
                loading={loading}
                type='submit'
                variant='contained'
                fullWidth>
                {location && location.pathname === '/signup'
                  ? 'Sign up'
                  : 'Login'}
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CustomForm;
