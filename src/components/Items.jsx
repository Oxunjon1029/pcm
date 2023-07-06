import React from 'react';
import { Card, CardContent, Typography, Box, CardActions } from '@mui/material';
import CustomDeleteModal from './CustomDeleteModal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Link, useLocation } from 'react-router-dom';
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
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: { sm: 'center', xl: 'flex-start' },
        alignItems: { sm: 'center' },
      }}>
      {collectionItems?.length === 0 && (
        <Typography variant='h3' color='text.secondary'>
          {lang === 'en'
            ? 'There is no collection items yet'
            : "Bu yerda hozircha kolleksiya elementlaru yo'q"}
        </Typography>
      )}
      {collectionItems?.map((item) => (
        <Card
          raised={true}
          key={item._id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            minHeight: '195px',
            maxWidth: '400px',
          }}>
          <CardContent>
            <Typography variant='h5'>{item?.name[lang]}</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                marginTop: '7px',
                flexWrap: 'wrap',
              }}>
              {lang === 'en' &&
                item?.entags.map((tag, index) => (
                  <Typography
                    key={index}
                    variant='h6'
                    sx={{ fontSize: '15px' }}>
                    #{tag?.title}
                  </Typography>
                ))}
              {lang === 'uz' &&
                item?.uztags.map((tag, index) => (
                  <Typography
                    key={index}
                    variant='h6'
                    sx={{ fontSize: '15px' }}>
                    #{tag?.title}
                  </Typography>
                ))}
            </Box>
          </CardContent>

          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconButton>
                  <Link
                    to='/comments'
                    state={{ comments: item?.comments, itemId: item?._id }}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CommentIcon color='primary' />
                  </Link>
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
                    {item?.likes.length === 0 ? 'Likes' : item?.likes.length}
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
                      : item?.dislikes.length}
                  </Typography>
                </Box>
              )}
              {item?.dislikes?.includes(user?._id) && (
                <Box>
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
                    {item?.dislike?.length}
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
                  location.pathname === '/' ||
                  (user.role === 'user' && user._id !== location.state.userId)
                }
                onClick={() =>
                  makeEditMode(
                    {
                      name_uz: item?.name['uz'],
                      name_en: item?.name['en'],
                      uztags: item?.uztags,
                      entags: item?.entags,
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
                  (user.role === 'user' && user._id !== location.state.userId)
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
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Items;
