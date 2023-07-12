import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
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
      {(collectionItems || collectionItems?.length > 0) &&
        collectionItems.map((item) => (
          <Card
            key={item?._id}
            raised
            sx={{
              minWidth: '350px',
              height: '270px',
              maxWidth: '400px',
              flexGrow: 1,
            }}>
            <CardContent>
              <Typography variant='h5'>{item?.name[lang]}</Typography>
              <Box
                sx={{
                  minHeight: '50px',
                  overflowY: 'auto',
                  margin: '20px 0',
                }}>
                {item?.customFields?.strings &&
                  item?.customFields?.strings?.map((string) => (
                    <Typography key={string?._id}>
                      {string?.name}:{string?.value}
                    </Typography>
                  ))}
                {item?.customFields?.dates &&
                  item?.customFields?.dates?.map((date) => (
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
                  wordBreak: 'normal',
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
                          collectionId: location.state.collectionId,
                          userId: location.state.userId,
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
