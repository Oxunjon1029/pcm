import React from 'react';
import { Typography, Box } from '@mui/material';
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
  // hide last border
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
  const location = useLocation();
  const navigator = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: { sm: 'center', xl: 'flex-start' },
        alignItems: { sm: 'center' },
      }}>
      {(!collectionItems || collectionItems?.length === 0) && (
        <Typography variant='h3' color='text.secondary'>
          {lang === 'en'
            ? 'There is no collection items'
            : "Bu yerda kolleksiya elementlari yo'q"}
        </Typography>
      )}
      <TableContainer component={Paper} elevation={8} sx={{ width: '1450px' }}>
        <Table sx={{ minWidth: '650' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'text.secondary' }}>
              <StyledTableCell>
                {lang === 'en' ? 'Item name' : 'Element nomi'}
              </StyledTableCell>
              <StyledTableCell>
                {lang === 'en' ? 'Tags' : 'Taglar'}
              </StyledTableCell>

              <StyledTableCell>Comment/Like/Dislike</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
              {collectionItems?.map((item) => (
                <>
                  {item?.customFields?.strings &&
                    item?.customFields?.strings?.map((string) => (
                      <StyledTableCell>{string?.name}</StyledTableCell>
                    ))}
                </>
              ))}
              {collectionItems?.map((item) => (
                <>
                  {item?.customFields?.dates &&
                    item?.customFields?.dates?.map((date) => (
                      <StyledTableCell key={date?._id}>
                        {date?.name}
                      </StyledTableCell>
                    ))}
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {collectionItems?.map((item) => (
              <StyledTableRow key={item?._id} >
                <StyledTableCell>{item?.name[lang]}</StyledTableCell>
                {lang === 'en' && (
                  <TableRow
                    sx={{
                      display: 'flex',
                      width: 400,
                      flexWrap: 'wrap',
                      height: 100,
                    }}>
                    {item?.entags?.map((tag) => (
                      <StyledTableCell key={tag?._id}>
                        #{tag?.title}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                )}
                {lang === 'uz' && (
                  <TableRow
                    sx={{
                      display: 'flex',
                      width: 400,
                      flexWrap: 'wrap',
                      height: 100,
                    }}>
                    {item?.uztags?.map((tag) => (
                      <StyledTableCell key={tag?._id}>
                        #{tag?.title}
                      </StyledTableCell>
                    ))}
                  </TableRow>
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
                            : item?.likes.length}
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
                            : item?.dislikes.length}
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
                          user._id !== location.state.userId)
                      }
                      onClick={() =>
                        makeEditMode(
                          {
                            name_uz: item?.name['uz'],
                            name_en: item?.name['en'],
                            uztags: item?.uztags,
                            entags: item?.entags,
                            strings: item?.customFields?.strings,
                            dates: item?.customFields?.dates,
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
                        (user.role === 'user' &&
                          user._id !== location.state.userId)
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
                {item?.customFields?.strings &&
                  item?.customFields?.strings?.map((string) => (
                    <TableCell key={string?._id}>{string?.value}</TableCell>
                  ))}
                {item?.customFields?.dates &&
                  item?.customFields?.dates?.map((date) => (
                    <TableCell key={date?._id}>{date?.value}</TableCell>
                  ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Items;
