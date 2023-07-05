import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import TextFormField from './TextFormField';

import { useGetAllTopicsQuery } from '../features/api/topicApi';
import { SelectFormField } from './SelectFormField';
const CreateCollectionForm = ({
  handleSubmit,
  initialValues,
  mode,
  setFile,
}) => {
  const [topics, setTopics] = useState([]);
  const { isSuccess: success, data: topic } = useGetAllTopicsQuery();
  const collectCreateValidationSchema = Yup.object({
    name_uz: Yup.string().required(),
    name_en: Yup.string().required(),
    description_uz: Yup.string().required(),
    description_en: Yup.string().required(),
  });
  const handleFileUploadChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (success) {
      setTopics(topic);
    }
  }, [success, topic]);
  const uzOptions = [];
  const enOptions = [];
  topics.forEach((t) => {
    let uzData = {
      label: t?.title['uz'],
      value: t?.title['uz'],
    };
    let enData = {
      label: t?.title['en'],
      value: t?.title['en'],
    };
    uzOptions.push(uzData);
    enOptions.push(enData);
  });
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={collectCreateValidationSchema}>
        {({ values }) => {
          return (
            <Form>
              <Field
                label='Name(en)'
                name='name_en'
                component={TextFormField}
              />
              <Field
                label='Name(uz)'
                name='name_uz'
                component={TextFormField}
              />
              <Field
                label='Description(en)'
                name='description_en'
                component={TextFormField}
              />
              <Field
                label='Description(uz)'
                name='description_uz'
                component={TextFormField}
              />

              <Field
                options={uzOptions}
                label='Topic(uz)'
                name={`topic_uz`}
                component={SelectFormField}
              />
              <Field
                options={enOptions}
                label='Topic(en)'
                name={`topic_en`}
                component={SelectFormField}
              />

              <TextField
                sx={{ margin: '10px 0' }}
                type='file'
                onChange={handleFileUploadChange}
              />

              <LoadingButton
                fullWidth
                type='submit'
                variant='contained'
                color='primary'>
                {mode ? 'Update' : 'Create'}
              </LoadingButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateCollectionForm;
