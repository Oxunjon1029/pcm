import React from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import TextFormField from './TextFormField';
import useAutocomplete from '@mui/base/useAutocomplete';
import AutomCompleteChips from './AutomCompleteChips';
const CreateCollectionItemForm = ({
  initialValues,
  mode,
  createCollectionItem,
  updateCollectionItem,
  tags,
  handleClose,
  setEditMode,
  collectionId,
}) => {
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
    defaultValue:mode ? initialValues?.uztags:[],
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
    defaultValue:mode ? initialValues?.entags:[],
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
      data: { name, uztags: value, entags: enValue },
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
      data: { name, uztags: value, entags: enValue },
    });
    handleClose();
    setEditMode('');
    actions.resetForm();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialValues={initialValues}
        onSubmit={
          !mode
            ? handleCreateCollectionItemSubmit
            : handleUpdateCollectionItemSubmit
        }>
        {() => (
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
            <Field label='Name(en)' name='name_en' component={TextFormField} />
            <Field label='Name(uz)' name='name_uz' component={TextFormField} />
            <Button fullWidth type='submit' variant='contained' color='primary'>
              {!mode ? 'Create' : 'Update'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCollectionItemForm;
