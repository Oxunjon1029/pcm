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
  collectionItemName,
  deleteOpen,
  handleDeleteClose,
  deleteCollectionItem,
  editMode,
  setDeleteOpen,
  handleIsLiked,
  handleDislikeItem,
  makeEditMode,
}) => {
  const location = useLocation()
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: { sm: 'center', xl: 'flex-start' },
        alignItems: { sm: 'center' },
      }}>
      {collectionItems?.map((item) => (
        <Card
          key={item._id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            minHeight: '150px',
            maxWidth: '400px',
            backgroundColor: `${
              collectionItemName &&
              item?.name[lang] === collectionItemName[lang]
                ? '#3f51b5'
                : ''
            }`,
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
                  {item?.comments ? item?.comments?.length : 'Comments'}
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
                    <ThumbUpOffAltIcon color='primary' />
                  </IconButton>
                  <Typography component='div' fontSize='10px'>
                    Likes
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
                    <ThumbUpIcon color='primary' />
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
                    <ThumbDownOffAltIcon color='primary' />
                  </IconButton>
                  <Typography component='div' fontSize='10px'>
                    Dislikes
                  </Typography>
                </Box>
              )}
              {item?.dislikes?.includes(user?._id) && (
                <Box>
                  <IconButton
                    key={item?._id}
                    disabled={!user || location.pathname === '/'}
                    onClick={() => handleDislikeItem(item?._id)}>
                    <ThumbDownAltIcon color='primary' />
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
                  editMode === item?._id || !user || location.pathname === '/'
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
  );
};

export default Items;
