import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextFormField from './TextFormField';
import { useGetAllTopicsQuery } from '../features/api/topicApi';
import { useRemoveCustomFieldMutation } from '../features/api/collectionItemsApi';
import { SelectFormField } from './SelectFormField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CreateCollectionForm = ({
  handleSubmit,
  initialValues,
  mode,
  setFile,
}) => {
  const [topics, setTopics] = useState([]);
  const { isSuccess: success, data: topic } = useGetAllTopicsQuery();
  const [removeCustomField, { isSuccess, data, isError, error }] =
    useRemoveCustomFieldMutation();
  const collectCreateValidationSchema = Yup.object({
    name_uz: Yup.string().required(),
    name_en: Yup.string().required(),
    description_uz: Yup.string().required(),
    description_en: Yup.string().required(),
    strings: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field Name is required'),
      })
    ),
    multilineTexts: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field Name is required'),
      })
    ),
    integers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field Name is required'),
      })
    ),
    dates: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field Name is required'),
      })
    ),
    booleans: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Field Name is required'),
      })
    ),
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
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, data, error]);
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
        {({ values, handleChange }) => {
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
              <Field label='Description(en)' name='description_en'>
                {({ field, form }) => {
                  return (
                    <Box>
                      <CKEditor
                        editor={ClassicEditor}
                        data={field.value}
                        onChange={(event, editor) => {
                          form.setFieldValue(field.name, editor.getData());
                        }}
                      />
                    </Box>
                  );
                }}
              </Field>
              <Field label='Description(uz)' name='description_uz'>
                {({ field, form }) => {
                  return (
                    <Box>
                      <CKEditor
                        editor={ClassicEditor}
                        data={field.value}
                        onChange={(event, editor) => {
                          form.setFieldValue(field.name, editor.getData());
                        }}
                      />
                    </Box>
                  );
                }}
              </Field>

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
              <FieldArray name={`strings`}>
                {({ push, remove }) => (
                  <div>
                    {values.strings &&
                      values.strings.map((field, index) => (
                        <div key={index}>
                          <Field
                            name={`strings[${index}].name`}
                            label='Field Name'
                            value={field.name}
                            onChange={handleChange}
                            component={TextFormField}
                          />
                          <Button
                            variant='contained'
                            onClick={() => {
                              remove(index);
                              if (mode && values?.strings[index].name !== '') {
                                removeCustomField({
                                  collectionId: mode,
                                  name: values?.strings[index].name,
                                  field: 'strings',
                                });
                              }
                            }}>
                            Remove
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant='contained'
                      sx={{ margin: '20px 0' }}
                      disabled={values.strings.length === 3}
                      onClick={() => push({ name: '' })}>
                      Add Custom String Field
                    </Button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name={`multilineTexts`}>
                {({ push, remove }) => (
                  <div>
                    {values.multilineTexts &&
                      values.multilineTexts.map((field, index) => (
                        <div key={index}>
                          <Field
                            name={`multilineTexts[${index}].name`}
                            label='Field Name'
                            value={field.name}
                            onChange={handleChange}
                            component={TextFormField}
                          />
                          <Button
                            variant='contained'
                            onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant='contained'
                      sx={{ margin: '20px 0' }}
                      disabled={values.multilineTexts.length === 3}
                      onClick={() => push({ name: '' })}>
                      Add Custom Mutiline Text Field
                    </Button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name={`integers`}>
                {({ push, remove }) => (
                  <div>
                    {values.integers &&
                      values.integers.map((field, index) => (
                        <div key={index}>
                          <Field
                            name={`integers[${index}].name`}
                            label='Field Name'
                            value={field.name}
                            onChange={handleChange}
                            component={TextFormField}
                          />

                          <Button
                            variant='contained'
                            onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant='contained'
                      sx={{ margin: '20px 0' }}
                      disabled={values.integers.length === 3}
                      onClick={() => push({ name: '' })}>
                      Add Custom Integer Field
                    </Button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name={`dates`}>
                {({ push, remove }) => (
                  <div>
                    {values.dates &&
                      values.dates.map((field, index) => (
                        <div key={index}>
                          <Field
                            name={`dates[${index}].name`}
                            label='Field Name'
                            value={field.name}
                            onChange={handleChange}
                            component={TextFormField}
                          />

                          <Button
                            variant='contained'
                            onClick={() => {
                              remove(index);
                              if (mode && values?.dates[index].name !== '') {
                                removeCustomField({
                                  collectionId: mode,
                                  name: values?.dates[index].name,
                                  field: 'dates',
                                });
                              }
                            }}>
                            Remove
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant='contained'
                      sx={{ margin: '20px 0' }}
                      disabled={values.dates.length === 3}
                      onClick={() => push({ name: '' })}>
                      Add Custom Date Field
                    </Button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name={`booleans`}>
                {({ push, remove }) => (
                  <div>
                    {values.booleans &&
                      values.booleans.map((field, index) => (
                        <div key={index}>
                          <Field
                            name={`booleans[${index}].name`}
                            label='Field Name'
                            value={field.name}
                            onChange={handleChange}
                            component={TextFormField}
                          />
                          <Button
                            variant='contained'
                            onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}

                    <Button
                      variant='contained'
                      sx={{ margin: '20px 0' }}
                      disabled={values.booleans.length === 3}
                      onClick={() => push({ name: '' })}>
                      Add Custom Checkbox Field
                    </Button>
                  </div>
                )}
              </FieldArray>
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
