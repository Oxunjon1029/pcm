import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useSearchFullTextQuery } from '../features/api/searchApi';
import { useNavigate } from 'react-router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchModal = ({ open, handleClose, lang }) => {
  const [searchText, setSearchText] = useState('');
  const { data: searchedItems } = useSearchFullTextQuery(open && searchText);
  const handleSearch = (e) => {
    if (e.target.value && open) {
      setSearchText(e.target.value);
    } else {
      setSearchText('');
    }
  };

  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Search sx={{ width: '100%' }}>
          <SearchIconWrapper>
            <SearchIcon fontSize='medium' />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            onChange={handleSearch}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          minWidth: { xl: '400px', sm: '100px' },
          minHeight: '300px',
        }}>
        <MenuList
          autoFocus={true}
          autoFocusItem={true}
          variant='selectedMenu'
          sx={{
            marginTop: '20px',
            borderTop: '1px solid #E7EBF0',
            padding: '10px 0',
          }}>
          {searchedItems?.map((item) => (
            <MenuItem
              onClick={() => {
                navigate('/collection/items', {
                  state: {
                    searchedItems: searchedItems,
                  },
                });
                handleClose();
              }}
              sx={{
                width: '100%',
                borderRadius: '15px',
                padding: '20px',
                margin: '10px 0',
                borderBottom: '1px solid #E7EBF0',
              }}
              key={item._id}
              dense={true}
              selected={
                item._id === searchedItems[searchedItems.length - 1]._id
              }>
              {item.name[lang]}
            </MenuItem>
          ))}
        </MenuList>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
