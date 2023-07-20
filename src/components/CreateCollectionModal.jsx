import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CreateCollectionForm from './CreateCollectionForm';

const CreateCollectionModal = ({
  open,
  handleClose,
  handleSubmit,
  initialValues,
  mode,
  setFile,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        Collection {mode ? 'update' : 'create'}
      </DialogTitle>
      <DialogContent dividers>
        <CreateCollectionForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          mode={mode}
          setFile={setFile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionModal;
