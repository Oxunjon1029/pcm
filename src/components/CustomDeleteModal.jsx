import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React from 'react';

const CustomDeleteModal = ({
  open,
  handleClose,
  handleSubmit,
  deleteMode,
  likedItemId,
  dislikedItemId,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
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
              // if(deleteMode === likedItemId || deleteMode === dislikedItemId){
              //   deleteCookie('likedItemId')
              //   deleteCookie('dislikedItemId')
              // }
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
