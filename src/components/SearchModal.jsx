import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useSearchFullTextQuery } from '../features/api/collectionItemsApi';
import { useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { setText } from '../features/user/userSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  width: '90%',
  '& .MuiInputBase-input': {
    width: '100%',
  },
}));
const SearchModal = ({ open, handleClose, lang }) => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch()
  const { data: searchedItems } =
    useSearchFullTextQuery( searchText);
  const handleSearch = (e) => {
    if (e.target.value && open) {
      setSearchText(e.target.value);
      dispatch(setText(e.target.value))
    } else {
      setSearchText('');
      
    }
  };

  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Search sx={{ width: '100%' }}>
          <IconButton>
            <SearchIcon fontSize='medium' />
          </IconButton>
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
