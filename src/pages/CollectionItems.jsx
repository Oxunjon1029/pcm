import { Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CreateCollectionItemModal from '../components/CreateCollectionItemModal';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import {
  selectEntag,
  selectText,
  selectUser,
  selectUztag,
} from '../features/user/userSlice';
import {
  useGetAllCollectionItemsByCollectionIdQuery,
  useCreateCollectionItemMutation,
  useUpdatedCollectionItemMutation,
  useDeleteCollectionItemMutation,
  useLikeCollectionItemMutation,
  useUnlikeCollectionItemMutation,
  useSearchItemsByTagQuery,
  useSearchFullTextQuery,
} from '../features/api/collectionItemsApi';
import { useGetCollectionByIdQuery } from '../features/api/collectionsApi';
import { toast } from 'react-toastify';
import Items from '../components/Items';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { deleteCookie } from '../utils/cookies';
import { REACT_APP_TOKEN } from '../utils/host';
const CollectionItems = ({ lang }) => {
  const location = useLocation();
  const uztag = useSelector(selectUztag);
  const entag = useSelector(selectEntag);
  const text = useSelector(selectText);
  const user = useSelector(selectUser);
  const navigator = useNavigate();
  const collectionId = location.state?.collectionId;
  const { refetch: collectionRefetch } =
    useGetCollectionByIdQuery(collectionId);
  const searchedItems = location.state?.searchedItems;
  const collectionItemsByTagSearch = location.state?.collectionItems;
  const { refetch: tagRefetch, data: tagData } = useSearchItemsByTagQuery({
    tag: lang === 'uz' ? uztag : entag,
    lang: lang,
  });
  const { refetch: searchedRefetch, data: textData } =
    useSearchFullTextQuery(text);
  const [itemsByCollectionId, setItemsByCollectionId] = useState([]);
  const {
    data: collectionItemsByCollectionId,
    isLoading,
    isSuccess: isItemsByCollIdSuccess,
    refetch,
  } = useGetAllCollectionItemsByCollectionIdQuery(collectionId);

  const [
    createCollectionItem,
    {
      isSuccess: isCreated,
      isError: isCreatedErr,
      data: createMsg,
      error: createErrMsg,
      isLoading: createLoading,
    },
  ] = useCreateCollectionItemMutation();
  const [
    updateCollectionItem,
    {
      isSuccess: isUpdated,
      isError: isUpdatedErr,
      data: updateMsg,
      error: updateErrMsg,
      isLoading: updateLoading,
    },
  ] = useUpdatedCollectionItemMutation();
  const [
    deleteCollectionItem,
    {
      isSuccess: isDeleted,
      isError: isDeletedErr,
      data: deleteMsg,
      error: deleteErrMsg,
      isLoading: deleteLoading,
    },
  ] = useDeleteCollectionItemMutation();
  const [likeCollectionItem] = useLikeCollectionItemMutation();
  const [unlikeCollectionItem] = useUnlikeCollectionItemMutation();

  const [editMode, setEditMode] = useState('');
  const [open, setOpen] = useState(false);
  const [openEditMode, setOpenEditMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditModeClose = () => {
    setEditMode('');
    setOpenEditMode(false);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const validationSchema = yup.object({
    name_uz: yup.string().required(),
    name_en: yup.string().required(),
    strings: yup.array().of(
      yup.object({
        name: yup.string().required(),
        value: yup.string(),
      })
    ),
    dates: yup.array().of(
      yup.object({
        name: yup.string().required(),
        value: yup.string(),
      })
    ),
    integers: yup.array().of(
      yup.object({
        name: yup.string().required(),
        value: yup.number(),
      })
    ),
    multilineTexts: yup.array().of(
      yup.object({
        name: yup.string().required(),
        value: yup.string(),
      })
    ),
    booleans: yup.array().of(
      yup.object({
        name: yup.string().required(),
        value: yup.boolean(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      name_uz: '',
      name_en: '',
      strings: [],
      dates: [],
      multilineTexts: [],
      integers: [],
      booleans: [],
    },
    validationSchema,
  });

  const makeEditMode = async (
    {
      name_uz,
      name_en,
      uztags,
      entags,
      strings,
      dates,
      integers,
      multilineTexts,
      booleans,
    },
    id
  ) => {
    
    await formik.setValues({
      name_uz,
      name_en,
      uztags,
      entags,
      strings,
      dates,
      multilineTexts,
      integers,
      booleans,
    });
    setEditMode(id);
    setOpenEditMode(true);
  };

  const handleIsLiked = (id) => {
    likeCollectionItem({
      itemId: id,
      userId: user?._id,
    }).catch((err) => {
      if (err?.status === 401) {
        deleteCookie(REACT_APP_TOKEN);
        navigator('/login');
      }
    });
  };

  const handleDislikeItem = (id) => {
    unlikeCollectionItem({
      itemId: id,
      userId: user?._id,
    }).catch((err) => {
      if (err?.status === 401) {
        deleteCookie(REACT_APP_TOKEN);
        navigator('/login');
      }
    });
  };

  useEffect(() => {
    if (isCreated) {
      toast.success(createMsg?.message);
    }
    if (isCreatedErr) {
      if (createErrMsg?.status === 401) {
        deleteCookie(REACT_APP_TOKEN);
        navigator('/login');
      }
    }
  }, [isCreated, isCreatedErr, createMsg, createErrMsg, navigator]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(updateMsg?.message);
    }
    if (isUpdatedErr) {
      if (updateErrMsg?.status === 401) {
        deleteCookie(REACT_APP_TOKEN);
        navigator('/login');
      }
    }
  }, [isUpdated, isUpdatedErr, updateMsg, updateErrMsg, navigator]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(deleteMsg?.message);
    }
    if (isDeletedErr) {
      if (deleteErrMsg?.status === 401) {
        deleteCookie(REACT_APP_TOKEN);
        navigator('/login');
      }
    }
  }, [isDeleted, isDeletedErr, deleteMsg, deleteErrMsg, navigator]);

  useEffect(() => {
    if (isItemsByCollIdSuccess) {
      setItemsByCollectionId(collectionItemsByCollectionId);
      collectionRefetch();
    }

    if (!searchedItems && !collectionItemsByTagSearch) {
      refetch();
    }
    if (collectionItemsByTagSearch?.length > 0) {
      tagRefetch();
    }
    if (searchedItems?.length > 0) {
      searchedRefetch();
    }
  }, [
    isItemsByCollIdSuccess,
    collectionItemsByCollectionId,
    itemsByCollectionId,
    searchedItems,
    collectionItemsByTagSearch,
    collectionId,
    refetch,
    tagRefetch,
    searchedRefetch,
    collectionRefetch,
  ]);

  return (
    <Box
      sx={{
        width: '98%',
        margin: '100px  auto',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '100vh',
      }}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          to='/user-profile'
          style={{ pointerEvents: `${!user || !collectionId ? 'none' : ''}` }}>
          {lang === 'en' ? 'Collections' : 'Kolleksiyalar'}
        </Link>
        <Typography color='text.primary'>
          {lang === 'en' ? 'Collection items' : 'Kolleksiya elementlari'}
        </Typography>
      </Breadcrumbs>
      <Box>
        <Button
          size='medium'
          disabled={
            !user ||
            (user.role === 'user' && user._id !== location.state?.userId)
          }
          variant='contained'
          color='secondary'
          onClick={handleOpen}>
          <AddCircleIcon sx={{ marginRight: '5px' }} />
          {lang === 'en' ? 'Create item' : 'Yangi element yaratish'}
        </Button>
      </Box>
      <CreateCollectionItemModal
        open={!editMode ? open : openEditMode}
        handleClose={!editMode ? handleClose : handleEditModeClose}
        initialValues={!editMode ? formik.initialValues : formik.values}
        mode={editMode}
        createCollectionItem={createCollectionItem}
        updateCollectionItem={updateCollectionItem}
        setEditMode={setEditMode}
        collectionId={collectionId}
        validationSchema={validationSchema}
        formik={formik}
      />
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: { sm: 'center', xl: 'flex-start' },
          alignItems: { sm: 'center' },
          width: '100%',
        }}>
        {isLoading || createLoading || updateLoading || deleteLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '50vh',
            }}>
            <Loader />
          </Box>
        ) : (
          <Items
            user={user}
            lang={lang}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            deleteCollectionItem={deleteCollectionItem}
            editMode={editMode}
            makeEditMode={makeEditMode}
            handleDeleteClose={handleDeleteClose}
            collectionItems={
              itemsByCollectionId.length === 0 && !searchedItems
                ? tagData
                : searchedItems
                ? textData
                : itemsByCollectionId
            }
            handleIsLiked={handleIsLiked}
            handleDislikeItem={handleDislikeItem}
          />
        )}
      </Box>
    </Box>
  );
};

export default CollectionItems;
