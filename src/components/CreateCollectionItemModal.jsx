import React, { useEffect, useState } from 'react';
import CreateCollectionItemForm from './CreateCollectionItemForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useGetAllTagsQuery } from '../features/api/tagsApi';

const CreateCollectionItemModal = ({
  open,
  handleClose,
  initialValues,
  mode,
  createCollectionItem,
  updateCollectionItem,
  setEditMode,
  collectionId,
  validationSchema,
  formik,
}) => {
  const { isSuccess, data } = useGetAllTagsQuery();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setTags(data);
    }
  }, [isSuccess, data, tags]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{textAlign:'center'}}>Collection item {mode ? 'update' : 'create'}</DialogTitle>
      <DialogContent dividers>
        <CreateCollectionItemForm
          initialValues={initialValues}
          mode={mode}
          tags={tags}
          handleClose={handleClose}
          createCollectionItem={createCollectionItem}
          updateCollectionItem={updateCollectionItem}
          setEditMode={setEditMode}
          collectionId={collectionId}
          validationSchema={validationSchema}
          formik={formik}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionItemModal;
