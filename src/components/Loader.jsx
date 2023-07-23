import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const Loader = ({ size }) => {
  return <CircularProgress color='primary' size={size ? size : ''} />;
};

export default Loader;
