import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Collections from '../components/Collections';
import CreateCollectionModal from '../components/CreateCollectionModal';
import { useCreateCollectionMutation } from '../features/api/collectionsApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import { selectUrl, setUrl } from '../features/bucket/bucketUrlSlice';
import { useLocation } from 'react-router';
import { useGetAllCollectionsQuery } from '../features/api/collectionsApi';
import Loader from '../components/Loader';
import { useGetS3UrlQuery } from '../features/api/collectionsApi';

const NonAdminUser = ({ lang }) => {
  const { data: s3Url, isSuccess: isUrlSuccess } = useGetS3UrlQuery();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [userCollections, setUserCollections] = useState([]);
  const user = useSelector(selectUser);
  const url = useSelector(selectUrl);
  const [file, setFile] = useState({});
  const location = useLocation();
  const [createCollection, { isLoading: loading }] =
    useCreateCollectionMutation();
  const { isSuccess, data, isError, error, isLoading } =
    useGetAllCollectionsQuery();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
    if (isUrlSuccess) {
      console.log('createMode', s3Url);
      dispatch(setUrl(s3Url));
    }
  };
  const handleClose = () => {
    dispatch(setUrl(null));
    setOpen(false);
  };
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
          let imageUrl = await url?.split('?')[0];
          console.log(imageUrl);
          let description = {
            en: values['description_en'],
            uz: values['description_uz'],
          };
          let topic = {
            en: values['topic_en'],
            uz: values['topic_uz'],
          };
          let name = { en: values['name_en'], uz: values['name_uz'] };
          let data = {
            name,
            description,
            createdBy: location.state ? location.state : user?._id,
            imageUrl,
            topic,
          };
          createCollection(data);
          actions.resetForm();
          handleClose();
        }
      })
      .catch((err) => console.log('imgerr', err));
  };
  const initialValues = {
    name_uz: '',
    name_en: '',
    description_uz: '',
    description_en: '',
    topic_uz: '',
    topic_en: '',
    imageUrl: '',
  };
  useEffect(() => {
    if (isSuccess) {
      let collections = data;
      if (location.state) {
        setUserCollections(
          collections.filter(
            (collection) => collection?.createdBy === location.state
          )
        );
      } else {
        setUserCollections(
          collections.filter(
            (collection) => collection?.createdBy === user?._id
          )
        );
      }
    }
    if (isError) {
      console.log(error);
    }
  }, [location, isSuccess, isError, data, error, user]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '96%',
        margin: '100px auto',
        marginBottom: { xs: '40px', lg: '20px' },
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Button variant='contained' color='secondary' onClick={handleOpen}>
          <AddCircleIcon />
          {lang === 'en' ? 'Create Collection' : 'Yangi kolleksiya yaratish'}
        </Button>

        <CreateCollectionModal
          lang={lang}
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          setFile={setFile}
        />
      </Box>
      {loading && (
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
      )}
      <Collections
        lang={lang}
        loading={isLoading}
        collections={userCollections}
        open={deleteModalOpen}
        handleClose={handleDeleteModalClose}
        handleOpen={handleDeleteModalOpen}
      />
    </Box>
  );
};

export default NonAdminUser;
