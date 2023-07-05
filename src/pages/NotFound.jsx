import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
const NotFound = () => {
  const navigator = useNavigate();
  const goHome = () => {
    navigator('/');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '90vh',
      }}>
      <Typography variant='h2' color="orange">
        Oops,this page is not found!!!
      </Typography>
      <Button onClick={goHome} variant='contained'>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
