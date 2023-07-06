import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CustomDeleteModal from './CustomDeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, CardHeader, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { useLocation, useNavigate } from 'react-router';
import {
  useDeleteCollectionMutation,
  useGetS3UrlQuery,
  useUpdateCollectionsMutation,
} from '../features/api/collectionsApi';
import { toast } from 'react-toastify';
import CreateCollectionModal from './CreateCollectionModal';
import Skeleton from '@mui/material/Skeleton';
import Loader from './Loader';
import { selectUrl, setUrl } from '../features/bucket/bucketUrlSlice';
import DefaultImage from '../utils/default.jpg';
const Collections = ({
  open,
  handleClose,
  handleOpen,
  lang,
  collections,
  loading,
}) => {
  const { data: s3url, isSuccess: isS3urlSuccess } = useGetS3UrlQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector(selectUrl);
  const [file, setFile] = useState({});
  const [editMode, setEditMode] = useState('');
  const [openEditMode, setOpenEditMode] = useState(false);
  const [id, setId] = useState('');
  const user = useSelector(selectUser);
  const location = useLocation();
  const [deleteCollection, { isSuccess, isError, isLoading, data, error }] =
    useDeleteCollectionMutation();
  const [
    updateCollection,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      isLoading: updateLoading,
      data: updateMessage,
      error: updateErrMessage,
    },
  ] = useUpdateCollectionsMutation();
  const validationSchema = yup.object({
    name_uz: yup.string().required(),
    description_uz: yup.string(),
    name_en: yup.string().required(),
    description_en: yup.string(),
  });

  const makeEditMode = async (
    {
      name_uz,
      name_en,
      description_uz,
      description_en,
      imageUrl,
      topic_uz,
      topic_en,
    },
    id
  ) => {
    if (isS3urlSuccess) {
      console.log('editMode', s3url);
      dispatch(setUrl(s3url));
    }
    await formik.setValues({
      name_uz,
      name_en,
      description_uz,
      description_en,
      imageUrl,
      topic_en,
      topic_uz,
    });
    setOpenEditMode(true);
    setEditMode(id);
  };
  const handleEditModeClose = () => {
    dispatch(setUrl(null));
    setOpenEditMode(false);
    setEditMode('');
  };
  const formik = useFormik({
    initialValues: {
      name_uz: '',
      name_en: '',
      description_uz: '',
      description_en: '',
      imageUrl: '',
      topic_uz: '',
      topic_en: '',
    },
    validationSchema: validationSchema,
  });
  const handleSubmit = async (values, actions) => {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'multipart/form-data',
      },
      body: file,
    })
      .then(async (data) => {
        if (data.url) {
          let data = {
            name: {
              en: values?.name_en,
              uz: values?.name_uz,
            },
            description: {
              en: values?.description_en,
              uz: values?.description_uz,
            },
            topic: {
              en: values?.topic_en,
              uz: values?.topic_uz,
            },
            imageUrl: (await url) ? await url?.split('?')[0] : values?.imageUrl,
          };
          updateCollection({ id: editMode, data });
          actions.resetForm();
          handleEditModeClose();
          setEditMode('');
        }
      })
      .catch((err) => console.log('imgerr', err));
  };
  const handleDeleteCollection = () => {
    deleteCollection(id);
    handleClose();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      toast.error(error?.message);
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateMessage?.message);
    }
    if (isUpdateError) {
      toast.error(updateErrMessage?.message);
    }
  }, [updateErrMessage, isUpdateSuccess, updateMessage, isUpdateError]);
  if (isLoading || updateLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Loader />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: 'flex',
        width: '99.9%',
        gap: '20px',
        margin: '0 auto',
      }}>
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: {
            xs: 'center',
            md: 'center',
            sm: 'center',
            lg: 'inherit',
            xl: 'inherit',
          },
          alignItems: {
            xs: 'center',
            md: 'center',
            sm: 'center',
            lg: 'inherit',
            xl: 'inherit',
          },
        }}>
        {collections &&
          collections.map((collection) => {
            return (
              <Card
                raised={true}
                key={collection._id}
                sx={{
                  flexGrow: 1,
                  maxWidth: { lg: '350px' },
                  minWidth: '300px',
                }}>
                {location.pathname === '/' && (
                  <CardHeader
                    title={
                      lang === 'en'
                        ? 'Author:' + collection?.author
                        : 'Egasi:' + collection?.author
                    }
                    subheader={
                      lang === 'en'
                        ? 'Items:' + collection.itemCount
                        : 'Elementlar:' + collection.itemCount
                    }
                  />
                )}
                {loading ? (
                  <Skeleton
                    animation='wave'
                    variant='rectangular'
                    sx={{ height: 140 }}
                  />
                ) : (
                  <CardMedia
                    component='img'
                    height='140'
                    alt='Something'
                    image={
                      collection?.imageUrl === ''
                        ? DefaultImage
                        : collection?.imageUrl
                    }
                  />
                )}
                <CardContent>
                  <Box>
                    {loading ? (
                      <Skeleton
                        animaton='wave'
                        variant='rectangular'
                        height={10}
                        width='20%'
                        sx={{ marginBottom: '10px' }}
                      />
                    ) : (
                      <Typography
                        variant='h4'
                        component='div'
                        color='text.primary'
                        gutterBottom>
                        {collection.name[lang]}
                      </Typography>
                    )}
                    {loading ? (
                      <Skeleton
                        animaton='wave'
                        variant='rectangular'
                        height={10}
                        width='30%'
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}>
                        <Typography variant='h6' color='text.secondary'>
                          {collection.description[lang]}
                        </Typography>
                        <Typography variant='h6' color='text.primary'>
                          {collection.topic && collection.topic[lang]}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      navigate('/collection/items', {
                        state: {
                          collectionId: collection?._id,
                          userId: collection?.userId,
                        },
                      });
                    }}>
                    {lang === 'en' ? 'View' : "Ko'rish"}
                  </Button>
                  <Box>
                    {loading ? (
                      <Skeleton
                        animation='wave'
                        variant='circular'
                        width={10}
                        height={10}
                      />
                    ) : (
                      <IconButton
                        color='success'
                        disabled={
                          editMode === collection._id ||
                          !user ||
                          location.pathname === '/'
                        }
                        onClick={() =>
                          makeEditMode(
                            {
                              name_uz: collection.name['uz'],
                              name_en: collection.name['en'],
                              description_uz: collection.description['uz'],
                              description_en: collection.description['en'],
                              imageUrl: collection.imageUrl,
                              topic_uz: collection.topic['uz'],
                              topic_en: collection.topic['en'],
                            },
                            collection._id
                          )
                        }>
                        <EditIcon />
                      </IconButton>
                    )}
                    {loading ? (
                      <Skeleton
                        animation='wave'
                        variant='circular'
                        width={10}
                        height={10}
                      />
                    ) : (
                      <IconButton
                        color='error'
                        onClick={() => {
                          handleOpen();
                          setId(collection?._id);
                        }}
                        disabled={!user || location.pathname === '/'}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
            );
          })}
      </Box>
      <CustomDeleteModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleDeleteCollection}
      />
      <CreateCollectionModal
        handleSubmit={handleSubmit}
        initialValues={formik.values}
        open={openEditMode}
        mode={editMode}
        handleClose={handleEditModeClose}
        setFile={setFile}
      />
    </Box>
  );
};

export default Collections;
