import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EnhancedTableHead from '../components/EnhandcedTableHead';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DoNotDisturbOffRoundedIcon from '@mui/icons-material/DoNotDisturbOffRounded';
import {
  useAddOrRemoveUserAsAdminMutation,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../features/api/usersApi';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie } from '../utils/cookies';
import { selectUser, setEntag, setUser, setUztag } from '../features/user/userSlice';
import { REACT_APP_TOKEN } from '../utils/host';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Admin = ({ lang }) => {
  const [changeUserStatus] = useChangeUserStatusMutation();
  const [addOrRemoveUserAsAdmin] = useAddOrRemoveUserAsAdminMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { isSuccess, data, isError, error, isLoading } = useGetAllUsersQuery();
  const dispatch = useDispatch();
  const currUser = useSelector(selectUser)
 
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const navigator = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allUsers?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(allUsers, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, allUsers]
  );

  useEffect(() => {
    if (isSuccess) {
      setAllUsers(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, data, error]);

  const hanleUserStatusChange = (status) => {
    changeUserStatus({ selectedIds: selected, status: status }).then((data) => {
      if (data?.data) {
        toast.success(data?.data?.message);
        let newUser = data?.data.users?.find(
          (item) => item._id === currUser._id
        );
        dispatch(setUser(newUser));
        setSelected([]);
      }
      if (data?.error) {
        toast.error(data?.error?.message);
      }
    });
  };
  const handleAddOrRemoveUserAsAdmin = (role) => {
    addOrRemoveUserAsAdmin({ selectedIds: selected, role: role }).then(
      (data) => {
        if (data?.data) {
          toast.success(data?.data?.message);
          let newUser = data?.data.users?.find(
            (item) => item._id === currUser._id
          );
          dispatch(setUser(newUser));
          setSelected([]);
        }
        if (data?.error) {
          toast.error(data?.error?.message);
        }
      }
    );
  };

  const handleDeleteUsers = () => {
    deleteUser(selected).then((data) => {
      if (data?.data) {
        toast.success(data?.data?.message);
        let newUser = data?.data.users?.find(
          (item) => item._id === currUser._id
        );
        dispatch(setUser(newUser));
        setSelected([]);
      }
      if (data?.error) {
        toast.error(data?.error?.message);
      }
    });
  };

  useEffect(() => {
    if (currUser && currUser?.role !== 'admin') {
      navigator('/user-profile');
    }
    if (!currUser || currUser.status === 'blocked') {
      deleteCookie(REACT_APP_TOKEN);
      deleteCookie('currentUser')
      navigator('/login');
    }
  }, [currUser, navigator]);

  useEffect(() => {
    dispatch(setUztag(null));
    dispatch(setEntag(null));
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '96%',
        margin: '70px  auto',
        marginBottom: '0px',
        minHeight: '82vh',
      }}>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          width: '100%',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}>
        <Button
          size='small'
          variant='contained'
          color='warning'
          disabled={selected.length === 0}
          onClick={() => hanleUserStatusChange('blocked')}>
          <BlockIcon />
        </Button>
        <Button
          onClick={() => hanleUserStatusChange('active')}
          size='small'
          disabled={selected.length === 0}
          variant='contained'
          color='success'>
          <DoNotDisturbOffRoundedIcon />
        </Button>
        <Button
          disabled={selected.length === 0}
          size='small'
          variant='contained'
          color='error'
          onClick={handleDeleteUsers}>
          <DeleteIcon />
        </Button>
        <Button
          disabled={selected.length === 0}
          size='small'
          variant='contained'
          color='info'
          onClick={() => handleAddOrRemoveUserAsAdmin('admin')}>
          <AddCircleIcon />
        </Button>
        <Button
          disabled={selected.length === 0}
          size='small'
          variant='contained'
          color='error'
          onClick={() => handleAddOrRemoveUserAsAdmin('user')}>
          <RemoveCircleIcon />
        </Button>
      </Box>

      {!isLoading && (
        <TableContainer component={Paper}>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allUsers?.length}
            />
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell>
                    <Loader />
                  </TableCell>
                </TableRow>
              )}
              {visibleRows &&
                visibleRows?.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      key={row._id}
                      onClick={(event) => handleClick(event, row._id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                      tabIndex={-1}>
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          onClick={() => {
                            navigator(`/user-profile/${row._id}`, {
                              state: row._id,
                            });
                          }}>
                          {lang === 'en' ? 'View' : "Ko'rish"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={allUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Admin;
