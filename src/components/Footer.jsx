import React from 'react';
import { Box, Typography, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { useLocation, useNavigate } from 'react-router';
const footerElements = [
  {
    id: 'admin',
    content: 'Admin',
    to: '/admin-user',
  },
  {
    id: 'login',
    content: 'Login',
    to: '/login',
  },
  {
    id: 'signup',
    content: 'Sign up',
    to: '/signup',
  },
];
const Footer = () => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.1)',
      }}>
      <Typography sx={{cursor:'pointer'}} component='div' fontSize='16px' onClick={() => navigate('/')}>
        PCM
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {footerElements.map((el) => (
          <MenuItem
            key={el.id}
            selected={location.pathname === el.to}
            onClick={() => navigate(el.to)}
            sx={{
              pointerEvents: `${
                el.id === 'admin' && (!user || user) && user?.role !== 'admin' && 'none'
              }`,
            }}>
            {el.content}
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
