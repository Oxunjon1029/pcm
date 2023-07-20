import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Collections from '../components/Collections';
import CreateCollectionModal from '../components/CreateCollectionModal';
import { useCreateCollectionMutation } from '../features/api/collectionsApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrl, setUrl } from '../features/bucket/bucketUrlSlice';
import { useLocation } from 'react-router';
import { useGetAllCollectionsQuery } from '../features/api/collectionsApi';
import Loader from '../components/Loader';
import { useGetS3UrlQuery } from '../features/api/collectionsApi';
import { selectUser } from '../features/user/userSlice';

const NonAdminUser = ({ lang }) => {
  const { data: s3Url, isSuccess: isUrlSuccess } = useGetS3UrlQuery();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [userCollections, setUserCollections] = useState([]);
  const user = useSelector(selectUser)
  const url = useSelector(selectUrl);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const [createCollection, { isLoading: loading }] =
    useCreateCollectionMutation();
  const { isSuccess, data, isError, error, isLoading, refetch } =
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
            imageUrl: file ? imageUrl : '',
            topic,
            customFields: {
              strings: values?.strings,
              multilineTexts: values?.multilineTexts,
              integers: values?.integers,
              dates: values?.dates,
              booleans: values?.booleans,
            },
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
    strings: [],
    multilineTexts: [],
    integers: [],
    dates: [],
    booleans: [],
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
    refetch();
  }, [location, isSuccess, isError, data, error, user, refetch]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '96%',
        margin: '100px auto',
        marginBottom: { xs: '40px', lg: '20px' },
        minHeight: '100vh',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Button variant='contained' color='secondary' onClick={handleOpen}>
          <AddCircleIcon sx={{ marginRight: '5px' }} />
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
