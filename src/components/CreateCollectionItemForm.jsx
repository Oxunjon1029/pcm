import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import TextFormField from './TextFormField';
import useAutocomplete from '@mui/base/useAutocomplete';
import AutomCompleteChips from './AutomCompleteChips';
import { useGetCollectionByIdQuery } from '../features/api/collectionsApi';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const CreateCollectionItemForm = ({
  initialValues,
  mode,
  createCollectionItem,
  updateCollectionItem,
  tags,
  handleClose,
  setEditMode,
  collectionId,
  validationSchema,
}) => {
  const { data: collectionById } = useGetCollectionByIdQuery(collectionId);
  let uztags = [],
    entags = [];
  tags.forEach((tag) => {
    let uzTitle = tag.title['uz'];
    let enTitle = tag.title['en'];
    uztags.push({ title: uzTitle });
    entags.push({ title: enTitle });
  });
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: uztags,
    defaultValue: mode ? initialValues?.uztags : [],
    getOptionLabel: (option) => option?.title,
    isOptionEqualToValue: (option, value) => option === value,
  });
  const {
    getRootProps: getEnRootProps,
    getInputLabelProps: getEnInputLabelProps,
    getInputProps: getEnInputProps,
    getTagProps: getEnTagProps,
    getListboxProps: getEnListboxProps,
    getOptionProps: getEnOptionProps,
    groupedOptions: enGroupedOptions,
    value: enValue,
    focused: enFocused,
    setAnchorEl: enSetAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    options: entags,
    defaultValue: mode ? initialValues?.entags : [],
    getOptionLabel: (option) => option?.title,
    isOptionEqualToValue: (option, value) => option === value,
  });

  const handleCreateCollectionItemSubmit = (values, actions) => {
    let name = {
      en: values?.name_en,
      uz: values?.name_uz,
    };

    createCollectionItem({
      collectionId: collectionId,
      data: {
        name,
        uztags: value,
        entags: enValue,
        strings: values?.strings,
        dates: values?.dates,
        multilineTexts:values?.multilineTexts,
        integers:values?.integers,
        booleans:values?.integers
      },
    });
    handleClose();
    actions.resetForm();
  };
  const handleUpdateCollectionItemSubmit = (values, actions) => {
    let name = {
      en: values?.name_en,
      uz: values?.name_uz,
    };

    updateCollectionItem({
      itemId: mode,
      data: {
        name,
        uztags: value,
        entags: enValue,
        strings: values?.strings,
        dates: values?.dates,
        multilineTexts:values?.multilineTexts,
        integers:values?.integers,
        booleans:values?.integers
      },
    });
    handleClose();
    setEditMode('');
    actions.resetForm();
  };
  const [stringFieldName, setStringFieldName] = useState(['']);
  const [dateFieldName, setDateFieldName] = useState(['']);
  const [integerFieldName, setIntegerFieldName] = useState(['']);
  const [textFieldName, setTextFieldName] = useState(['']);
  const [booleanFieldName, setBooleanFieldName] = useState(['']);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={
          !mode
            ? handleCreateCollectionItemSubmit
            : handleUpdateCollectionItemSubmit
        }>
        {({ values, handleChange, setFieldValue }) => {
          return (
            <Form>
              <FieldArray name='uztags'>
                {() => (
                  <AutomCompleteChips
                    label={'Uzbek item tags'}
                    getRootProps={getRootProps}
                    getInputLabelProps={getInputLabelProps}
                    getInputProps={getInputProps}
                    getTagProps={getTagProps}
                    getListboxProps={getListboxProps}
                    getOptionProps={getOptionProps}
                    value={value}
                    setAnchorEl={setAnchorEl}
                    focused={focused}
                    groupedOptions={groupedOptions}
                  />
                )}
              </FieldArray>
              <FieldArray name='entags'>
                {() => (
                  <AutomCompleteChips
                    label={'English item tags'}
                    getRootProps={getEnRootProps}
                    getInputLabelProps={getEnInputLabelProps}
                    getInputProps={getEnInputProps}
                    getTagProps={getEnTagProps}
                    getListboxProps={getEnListboxProps}
                    getOptionProps={getEnOptionProps}
                    value={enValue}
                    setAnchorEl={enSetAnchorEl}
                    focused={enFocused}
                    groupedOptions={enGroupedOptions}
                  />
                )}
              </FieldArray>
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
              {collectionById?.customFields?.strings?.length > 0 && (
                <FieldArray name='strings'>
                  {({ push }) => (
                    <div>
                      <div>
                        {collectionById?.customFields?.strings?.map(
                          (field, index) => {
                            return (
                              <Box
                                key={index + 'customString'}
                                sx={{
                                  display: 'flex',
                                  gap: '10px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {!stringFieldName.includes(field.name) && (
                                  <Field
                                    key={field?.name}
                                    title='Please click plus button to fill up the input'
                                    disabled={
                                      !stringFieldName.includes(field.name)
                                    }
                                    type='string'
                                    label={field?.name}
                                    name={`strings[${index}].value`}
                                    onChange={handleChange}
                                    component={TextFormField}
                                  />
                                )}
                                {stringFieldName.includes(field.name) && (
                                  <Field
                                    key={field?.name}
                                    type='string'
                                    label={field?.name}
                                    name={`strings[${index}].value`}
                                    onChange={handleChange}
                                    component={TextFormField}
                                  />
                                )}
                                <Button
                                  variant='contained'
                                  onClick={() => {
                                    if (!mode) {
                                      push({ name: field.name });
                                    }
                                    setStringFieldName((prev) => [
                                      ...prev,
                                      field.name,
                                    ]);
                                  }}>
                                  +
                                </Button>
                              </Box>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}
              {collectionById?.customFields?.dates?.length > 0 && (
                <FieldArray name='dates'>
                  {({ push }) => (
                    <div>
                      {collectionById?.customFields?.dates?.map(
                        (field, index) => {
                          return (
                            <Box
                              key={index + 'customDates'}
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {!dateFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  title='Please click plus button to fill up the input'
                                  disabled={!dateFieldName.includes(field.name)}
                                  type='date'
                                  name={`dates[${index}].value`}
                                  onChange={handleChange}
                                  component={TextFormField}
                                />
                              )}
                              {dateFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  type='date'
                                  name={`dates[${index}].value`}
                                  onChange={handleChange}
                                  component={TextFormField}
                                />
                              )}
                              <Button
                                variant='contained'
                                onClick={() => {
                                  if (!mode) {
                                    push({ name: field.name });
                                  }
                                  setDateFieldName((prev) => [
                                    ...prev,
                                    field.name,
                                  ]);
                                }}>
                                +
                              </Button>
                            </Box>
                          );
                        }
                      )}
                    </div>
                  )}
                </FieldArray>
              )}
              {collectionById?.customFields?.multilineTexts?.length > 0 && (
                <FieldArray name='multilineTexts'>
                  {({ push }) => (
                    <div>
                      <div>
                        {collectionById?.customFields?.multilineTexts?.map(
                          (field, index) => {
                            return (
                              <Box
                                key={index + 'text'}
                                sx={{
                                  display: 'flex',
                                  gap: '10px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {!textFieldName.includes(field.name) && (
                                  <Field
                                    key={field?.name}
                                    title='Please click plus button to fill up the input'
                                    disabled={
                                      !textFieldName.includes(field.name)
                                    }
                                    type='string'
                                    label={field?.name}
                                    name={`multilineTexts[${index}].value`}
                                    onChange={handleChange}
                                    component={TextFormField}
                                  />
                                )}
                                {textFieldName.includes(field.name) && (
                                  <Field
                                    key={field?.name}
                                    type='string'
                                    label={field?.name}
                                    name={`multilineTexts[${index}].value`}
                                    onChange={handleChange}
                                    component={TextFormField}
                                  />
                                )}
                                <Button
                                  variant='contained'
                                  onClick={() => {
                                    if (!mode) {
                                      push({ name: field.name });
                                    }
                                    setTextFieldName((prev) => [
                                      ...prev,
                                      field.name,
                                    ]);
                                  }}>
                                  +
                                </Button>
                              </Box>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}
              {collectionById?.customFields?.integers?.length > 0 && (
                <FieldArray name='integers'>
                  {({ push }) => (
                    <div>
                      {collectionById?.customFields?.integers?.map(
                        (field, index) => {
                          return (
                            <Box
                              key={index + 'integers'}
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {!integerFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  title='Please click plus button to fill up the input'
                                  disabled={!integerFieldName.includes(field.name)}
                                  type='number'
                                  name={`integers[${index}].value`}
                                  onChange={handleChange}
                                  component={TextFormField}
                                />
                              )}
                              {integerFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  type='number'
                                  name={`integers[${index}].value`}
                                  onChange={handleChange}
                                  component={TextFormField}
                                />
                              )}
                              <Button
                                variant='contained'
                                onClick={() => {
                                  if (!mode) {
                                    push({ name: field.name });
                                  }
                                  setIntegerFieldName((prev) => [
                                    ...prev,
                                    field.name,
                                  ]);
                                }}>
                                +
                              </Button>
                            </Box>
                          );
                        }
                      )}
                    </div>
                  )}
                </FieldArray>
              )}
              {collectionById?.customFields?.booleans?.length > 0 && (
                <FieldArray name='booleans'>
                  {({ push }) => (
                    <div>
                      {collectionById?.customFields?.booleans?.map(
                        (field, index) => {
                          return (
                            <Box
                              key={index + 'booleans'}
                              sx={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {!booleanFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  title='Please click plus button to fill up the input'
                                  disabled={!booleanFieldName.includes(field.name)}
                                  as={FormControlLabel}
                                  control={<Checkbox  />}
                                  name={`booleans[${index}].value`}
                                  onChange={handleChange}
                                  
                                />
                              )}
                              {booleanFieldName.includes(field.name) && (
                                <Field
                                  key={field?.name}
                                  label={field?.name}
                                  as={FormControlLabel}
                                  control={<Checkbox  />}
                                  name={`booleans[${index}].value`}
                                  onChange={handleChange}
                                />
                              )}
                              <Button
                                variant='contained'
                                onClick={() => {
                                  if (!mode) {
                                    push({ name: field.name });
                                  }
                                  setBooleanFieldName((prev) => [
                                    ...prev,
                                    field.name,
                                  ]);
                                }}>
                                +
                              </Button>
                            </Box>
                          );
                        }
                      )}
                    </div>
                  )}
                </FieldArray>
              )}
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'>
                {!mode ? 'Create' : 'Update'}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateCollectionItemForm;
