import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import { deleteCookie } from '../utils/cookies';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { REACT_APP_TOKEN } from '../utils/host';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../features/user/userSlice';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Header = ({ checked, changeMode, lang, languages, handleChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const user = useSelector(selectUser)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalClose = () => {
    setOpenSearchModal(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{
          width: '100%',
          height: '70px',
          justifyContent: { md: 'space-between', lg: 'space-between' },
          alignItems: {
            xs: 'center',
            sm: 'inherit',
            lg: 'inherit',
            xl: 'inherit',
            md: 'inherit',
          },
        }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            onClick={() => navigate('/')}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
            }}>
            Personal collection management
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: '40px', sm: '40px', md: '40px', lg: '20px' },
              justifyContent: 'center',
              alignItems: 'center',
              height: '70px',
            }}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={lang}
              onChange={handleChange}>
              {languages?.map((l) => (
                <MenuItem key={l?.value} value={l?.value}>
                  {l?.text}
                </MenuItem>
              ))}
            </Select>
            <IconButton
              sx={{ borderRadius: '12px', border: '1px solid white', flex: 1 }}
              onClick={() => setOpenSearchModal(true)}
              color='inherit'>
              <SearchIcon />
            </IconButton>
            <SearchModal
              open={openSearchModal}
              handleClose={handleModalClose}
              lang={lang}
            />
            <MaterialUISwitch
              {...label}
              checked={checked}
              onChange={changeMode}
            />
            <div style={{ flex: 1 }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                  divider
                  selected={location.pathname === '/signup'}
                  onClick={() => {
                    navigate('/signup');
                    handleClose();
                  }}>
                  Sign up
                </MenuItem>
                <MenuItem
                  divider
                  sx={{ justifyContent: 'flex-start' }}
                  selected={location.pathname === '/login'}
                  onClick={() => {
                    navigate('/login');
                    handleClose();
                  }}>
                  <LoginIcon sx={{ marginRight: '10px' }} />
                  Login
                </MenuItem>

                <MenuItem
                  divider
                  selected={location.pathname === '/user-profile'}
                  onClick={() => {
                    navigate('/user-profile');
                    handleClose();
                  }}>
                  <AccountCircle sx={{ marginRight: '10px' }} />
                  Profile
                </MenuItem>
                {user && (
                  <MenuItem
                    divider
                    onClick={async () => {
                      handleClose();
                      deleteCookie(REACT_APP_TOKEN);
                      dispatch(setUser(null))
                      navigate('/login');
                    }}>
                    <LogoutIcon sx={{ marginRight: '10px' }} />
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
