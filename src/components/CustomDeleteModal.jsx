import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React from 'react';

const CustomDeleteModal = ({ open, handleClose, handleSubmit, deleteMode }) => {
  return (
    <Dialog open={open === undefined ? false : open} onClose={handleClose}>
      <DialogContent dividers>
        <Typography variant='h4'>Are you sure to delete !!</Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            width: '100%',
          }}>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit(deleteMode);
              handleClose();
            }}
            variant='contained'>
            Ok
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDeleteModal;
