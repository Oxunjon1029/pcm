import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import TextFormField from '../components/TextFormField';
import { useLocation } from 'react-router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
const Comments = ({ socket, lang }) => {
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const user = useSelector(selectUser)
 
  const validationSchema = yup.object({
    content: yup.string().required(),
  });
  useEffect(() => {
    socket.on('newComment', (comment) => {
      setComments(comment);
    });
  }, [socket]);

  const handleMakeCommentSubmit = (values, actions) => {
    let data = {
      content: values.content,
      userName: user?.name,
      itemId: location.state.itemId,
    };
    socket.emit('newComment', data);
    actions.resetForm();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        width: '96%',
        margin: '100px auto',
        height: '85vh',
      }}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          style={{
            pointerEvents: `${
              !user || !location.state?.collectionId ? 'none' : ''
            }`,
          }}
          to='/collection/items'
          state={{
            collectionId: location.state?.collectionId,
            userId: location.state?.userId,
          }}>
          {lang === 'en' ? 'Collection items' : 'Kolleksiya elementlari'}
        </Link>
        <Typography color='text.primary'>
          {lang === 'en' ? 'Comments' : 'Izohlar'}
        </Typography>
      </Breadcrumbs>
      <Box sx={{ width: '50%' }}>
        <Formik
          initialValues={{ content: '' }}
          onSubmit={handleMakeCommentSubmit}
          validationSchema={validationSchema}>
          {({ values, handleBlur, handleChange }) => (
            <Form>
              <Field
                label='Comment'
                multiline
                placeholder='Write your comment...'
                name='content'
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                component={TextFormField}
              />
              <Button
                disabled={!user}
                type='submit'
                variant='contained'
                color='primary'>
                Write comment
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxHeight: '900px',
          overflowY: 'auto',
          padding: '10px',
          boxShadow: '10px 10px 10px 10px rgba(0,0,0,0.12)',
        }}>
        {comments &&
          comments?.map((comment) => (
            <Box
              key={comment?._id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: '15px',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '10px',
              }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bolder' }}
                color='#0F0F0F'>
                {comment?.userName}
              </Typography>
              <Typography
                variant='h6'
                color='#0F0F0F'
                sx={{
                  wordBreak: 'normal',
                  display: 'inline',
                  fontWeight: '200',
                }}>
                {comment?.content}
              </Typography>
            </Box>
          ))}
        {comments.length === 0 &&
          location.state?.comments?.map((comment) => (
            <Box
              key={comment?._id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: '15px',
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '10px',
              }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bolder' }}
                color='#0F0F0F'>
                {comment?.userName}
              </Typography>
              <Typography
                variant='h6'
                color='#0F0F0F'
                sx={{
                  wordBreak: 'normal',
                  display: 'inline',
                  fontWeight: '200',
                }}>
                {comment?.content}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
