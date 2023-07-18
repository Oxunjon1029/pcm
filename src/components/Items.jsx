import React from 'react';
import { Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import CustomDeleteModal from './CustomDeleteModal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Items = ({
  collectionItems,
  user,
  lang,
  deleteOpen,
  handleDeleteClose,
  deleteCollectionItem,
  editMode,
  setDeleteOpen,
  handleIsLiked,
  handleDislikeItem,
  makeEditMode,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const location = useLocation();
  const navigator = useNavigate();
  console.log(collectionItems, collectionItems?.length > 0);
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}>
      {collectionItems?.length === 0 && (
        <Typography variant='h3' color='text.secondary'>
          {lang === 'en'
            ? 'There are no collection items'
            : "Bu yerda kolleksiya elementlari yo'q"}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
        {collectionItems?.length > 0 &&
          location.pathname === '/' &&
          collectionItems.map((item) => (
            <Card
              key={item?._id}
              raised
              sx={{
                minWidth: '300px',
                height: '270px',
                maxWidth: {
                  xs: '400px',
                  lg: '355px',
                  sm: '365px',
                  md: '420px',
                },
                flexGrow: 1,
              }}>
              <CardContent>
                <Typography variant='h5'>{item?.name[lang]}</Typography>
                <Box
                  className='collection_item_custom_fields_box'
                  sx={{
                    minHeight: '50px',
                    maxHeight: '60px',
                    overflowY: 'auto',
                    margin: '20px 0',
                  }}>
                  {item?.strings &&
                    item?.strings?.map((string) => (
                      <Typography key={string?._id}>
                        {string?.name}:{string?.value}
                      </Typography>
                    ))}
                  {item?.dates &&
                    item?.dates?.map((date) => (
                      <Typography key={date?._id}>
                        {date?.name}:{date?.value}
                      </Typography>
                    ))}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    flexWrap: 'wrap',
                  }}>
                  {lang === 'en' &&
                    item?.entags?.map((tag) => (
                      <Typography key={tag?._id}>#{tag?.title}</Typography>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  {lang === 'uz' &&
                    item?.uztags?.map((tag) => (
                      <Typography key={tag?._id}>#{tag?.title}</Typography>
                    ))}
                </Box>
              </CardContent>
              <CardActions
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IconButton
                      onClick={() =>
                        navigator('/comments', {
                          state: {
                            comments: item?.comments,
                            itemId: item?._id,
                            collectionId: location.state?.collectionId
                              ? location.state?.collectionId
                              : '',
                            userId: location.state?.userId
                              ? location.state?.userId
                              : '',
                          },
                        })
                      }>
                      <CommentIcon color='primary' />
                    </IconButton>

                    <Typography component='div' fontSize='10px'>
                      {item?.comments?.length === 0
                        ? 'Comments'
                        : item?.comments?.length}
                    </Typography>
                  </Box>
                  {!item?.likes?.includes(user?._id) && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        disabled={!user || location.pathname === '/'}
                        onClick={() => handleIsLiked(item?._id)}>
                        <ThumbUpOffAltIcon
                          color={`${
                            !user || location.pathname === '/' ? '' : 'primary'
                          }`}
                        />
                      </IconButton>
                      <Typography component='div' fontSize='10px'>
                        {item?.likes.length === 0
                          ? 'Likes'
                          : item?.likes?.length}
                      </Typography>
                    </Box>
                  )}
                  {item?.likes?.includes(user?._id) && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        key={item?._id}
                        disabled={!user || location.pathname === '/'}
                        onClick={() => handleIsLiked(item?._id)}>
                        <ThumbUpIcon
                          color={`${
                            !user || location.pathname === '/' ? '' : 'primary'
                          }`}
                        />
                      </IconButton>
                      <Typography component='div' fontSize='10px'>
                        {item?.likes?.length}
                      </Typography>
                    </Box>
                  )}
                  {!item?.dislikes?.includes(user?._id) && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        disabled={!user || location.pathname === '/'}
                        onClick={() => handleDislikeItem(item?._id)}>
                        <ThumbDownOffAltIcon
                          color={`${
                            !user || location.pathname === '/' ? '' : 'primary'
                          }`}
                        />
                      </IconButton>
                      <Typography component='div' fontSize='10px'>
                        {item?.dislikes.length === 0
                          ? 'Dislikes'
                          : item?.dislikes?.length}
                      </Typography>
                    </Box>
                  )}
                  {item?.dislikes?.includes(user?._id) && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <IconButton
                        key={item?._id}
                        disabled={!user || location.pathname === '/'}
                        onClick={() => handleDislikeItem(item?._id)}>
                        <ThumbDownAltIcon
                          color={`${
                            !user || location.pathname === '/' ? '' : 'primary'
                          }`}
                        />
                      </IconButton>
                      <Typography component='div' fontSize='10px'>
                        {item?.dislikes?.length}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box>
                  <IconButton
                    color='success'
                    disabled={
                      editMode === item?._id ||
                      !user ||
                      location.pathname === '/'
                    }
                    onClick={() =>
                      makeEditMode(
                        {
                          name_uz: item?.name['uz'],
                          name_en: item?.name['en'],
                          uztags: item?.uztags,
                          entags: item?.entags,
                          strings: item?.strings,
                          dates: item?.dates,
                          booleans: item?.booleans,
                          multilineTexts: item?.multilineTexts,
                          integers: item?.integers,
                        },
                        item?._id
                      )
                    }>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    disabled={!user || location.pathname === '/'}
                    color='error'
                    onClick={() => {
                      setDeleteOpen(true);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  <CustomDeleteModal
                    open={deleteOpen}
                    handleClose={handleDeleteClose}
                    deleteMode={item?._id}
                    handleSubmit={deleteCollectionItem}
                  />
                </Box>
              </CardActions>
            </Card>
          ))}
      </Box>
      {collectionItems?.length > 0 && location.pathname !== '/' && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TableContainer component={Paper} elevation={8}>
            <Table
              sx={{
                minWidth: {
                  lg: 1450,
                  xs: 1500,
                  sm: 1480,
                  md: 1470,
                  xl: 1420,
                },
              }}
              aria-label='customized table'>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: 'text.secondary',
                    width: '100%',
                  }}>
                  <StyledTableCell sx={{ flex: 1 }}>
                    {lang === 'en' ? 'Item name' : 'Element nomi'}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {lang === 'en' ? 'Tags' : 'Taglar'}
                  </StyledTableCell>

                  <StyledTableCell align='center'>
                    Comment/Like/Dislike
                  </StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                  <StyledTableCell>
                    {collectionItems?.map((item) => (
                      <Box
                        key={item?._id + 'strings'}
                        sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        {item?.strings &&
                          item?.strings?.map((string) => (
                            <Typography key={string?._id}>
                              {string?.name}
                            </Typography>
                          ))}
                      </Box>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell>
                    {collectionItems?.map((item) => (
                      <Box
                        key={item?._id + 'dates'}
                        sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        {item?.dates &&
                          item?.dates?.map((string) => (
                            <Typography key={string?._id}>
                              {string?.name}
                            </Typography>
                          ))}
                      </Box>
                    ))}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collectionItems?.map((item) => (
                  <StyledTableRow key={item?._id}>
                    <StyledTableCell sx={{ fontWeight: '600' }}>
                      {item?.name[lang]}
                    </StyledTableCell>
                    {lang === 'en' && (
                      <StyledTableCell>
                        {item?.entags?.map((tag) => (
                          <Typography key={tag?._id}>#{tag?.title}</Typography>
                        ))}
                      </StyledTableCell>
                    )}
                    {lang === 'uz' && (
                      <StyledTableCell
                        sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {item?.uztags?.map((tag) => (
                          <Typography key={tag?._id}>#{tag?.title}</Typography>
                        ))}
                      </StyledTableCell>
                    )}

                    <StyledTableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <IconButton
                            onClick={() =>
                              navigator('/comments', {
                                state: {
                                  comments: item?.comments,
                                  itemId: item?._id,
                                  collectionId: location.state?.collectionId,
                                  userId: location.state?.userId,
                                },
                              })
                            }>
                            <CommentIcon color='primary' />
                          </IconButton>

                          <Typography component='div' fontSize='10px'>
                            {item?.comments?.length === 0
                              ? 'Comments'
                              : item?.comments?.length}
                          </Typography>
                        </Box>
                        {!item?.likes?.includes(user?._id) && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              disabled={!user || location.pathname === '/'}
                              onClick={() => handleIsLiked(item?._id)}>
                              <ThumbUpOffAltIcon
                                color={`${
                                  !user || location.pathname === '/'
                                    ? ''
                                    : 'primary'
                                }`}
                              />
                            </IconButton>
                            <Typography component='div' fontSize='10px'>
                              {item?.likes.length === 0
                                ? 'Likes'
                                : item?.likes?.length}
                            </Typography>
                          </Box>
                        )}
                        {item?.likes?.includes(user?._id) && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              key={item?._id}
                              disabled={!user || location.pathname === '/'}
                              onClick={() => handleIsLiked(item?._id)}>
                              <ThumbUpIcon
                                color={`${
                                  !user || location.pathname === '/'
                                    ? ''
                                    : 'primary'
                                }`}
                              />
                            </IconButton>
                            <Typography component='div' fontSize='10px'>
                              {item?.likes?.length}
                            </Typography>
                          </Box>
                        )}
                        {!item?.dislikes?.includes(user?._id) && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              disabled={!user || location.pathname === '/'}
                              onClick={() => handleDislikeItem(item?._id)}>
                              <ThumbDownOffAltIcon
                                color={`${
                                  !user || location.pathname === '/'
                                    ? ''
                                    : 'primary'
                                }`}
                              />
                            </IconButton>
                            <Typography component='div' fontSize='10px'>
                              {item?.dislikes.length === 0
                                ? 'Dislikes'
                                : item?.dislikes?.length}
                            </Typography>
                          </Box>
                        )}
                        {item?.dislikes?.includes(user?._id) && (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <IconButton
                              key={item?._id}
                              disabled={!user || location.pathname === '/'}
                              onClick={() => handleDislikeItem(item?._id)}>
                              <ThumbDownAltIcon
                                color={`${
                                  !user || location.pathname === '/'
                                    ? ''
                                    : 'primary'
                                }`}
                              />
                            </IconButton>
                            <Typography component='div' fontSize='10px'>
                              {item?.dislikes?.length}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Box>
                        <IconButton
                          color='success'
                          disabled={
                            editMode === item?._id ||
                            !user ||
                            location.pathname === '/' ||
                            (user.role === 'user' &&
                              user?._id !== location.state?.userId)
                          }
                          onClick={() =>
                            makeEditMode(
                              {
                                name_uz: item?.name['uz'],
                                name_en: item?.name['en'],
                                uztags: item?.uztags,
                                entags: item?.entags,
                                strings: item?.strings,
                                dates: item?.dates,
                              },
                              item?._id
                            )
                          }>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={
                            !user ||
                            location.pathname === '/' ||
                            (user?.role === 'user' &&
                              user?._id !== location.state?.userId)
                          }
                          color='error'
                          onClick={() => {
                            setDeleteOpen(true);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                        <CustomDeleteModal
                          open={deleteOpen}
                          handleClose={handleDeleteClose}
                          deleteMode={item?._id}
                          handleSubmit={deleteCollectionItem}
                        />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      {item?.strings && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          {item?.strings?.map((string) => (
                            <Typography key={string?._id}>
                              {string?.value}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item?.dates && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          {item?.dates?.map((date) => (
                            <Typography key={date?._id}>
                              {date?.value}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    count={collectionItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Items;
