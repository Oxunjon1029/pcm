import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import TextFormField from './TextFormField';
import useAutocomplete from '@mui/base/useAutocomplete';
import AutomCompleteChips from './AutomCompleteChips';
import { useGetCollectionByIdQuery } from '../features/api/collectionsApi';
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
    let customFields = {
      strings: values?.strings,
      dates: values?.dates,
    };
    createCollectionItem({
      collectionId: collectionId,
      data: { name, uztags: value, entags: enValue, customFields },
    });
    handleClose();
    actions.resetForm();
  };
  const handleUpdateCollectionItemSubmit = (values, actions) => {
    let name = {
      en: values?.name_en,
      uz: values?.name_uz,
    };
    let customFields = {
      strings: values?.strings,
      dates: values?.dates,
    };
    updateCollectionItem({
      itemId: mode,
      data: { name, uztags: value, entags: enValue, customFields },
    });
    handleClose();
    setEditMode('');
    actions.resetForm();
  };
  const [stringFieldName, setStringFieldName] = useState(['']);
  const [dateFieldName, setDateFieldName] = useState(['']);
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
