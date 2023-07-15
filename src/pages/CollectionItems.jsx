import { Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CreateCollectionItemModal from '../components/CreateCollectionItemModal';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { selectTag, selectText, selectUser } from '../features/user/userSlice';
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
import { toast } from 'react-toastify';
import Items from '../components/Items';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
const CollectionItems = ({ lang }) => {
  const location = useLocation();
  const tag = useSelector(selectTag);
  const text = useSelector(selectText);
  const user = useSelector(selectUser);
  const collectionId = location.state?.collectionId;
  const searchedItems = location.state?.searchedItems;
  const collectionItemsByTagSearch = location.state?.collectionItems;
  const { refetch: tagRefetch, data: tagData } = useSearchItemsByTagQuery({
    tag: tag,
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
  });

  const formik = useFormik({
    initialValues: {
      name_uz: '',
      name_en: '',
      strings: [],
      dates: [],
    },
    validationSchema,
  });

  const makeEditMode = async (
    { name_uz, name_en, uztags, entags, strings, dates },
    id
  ) => {
    await formik.setValues({
      name_uz,
      name_en,
      uztags,
      entags,
      strings,
      dates,
    });
    setEditMode(id);
    setOpenEditMode(true);
  };

  const handleIsLiked = (id) => {
    likeCollectionItem({
      itemId: id,
      userId: user?._id,
    });
  };

  const handleDislikeItem = (id) => {
    unlikeCollectionItem({
      itemId: id,
      userId: user?._id,
    });
  };

  useEffect(() => {
    if (isCreated) {
      toast.success(createMsg?.message);
    }
    if (isCreatedErr) {
      toast.error(createErrMsg?.message);
    }
  }, [isCreated, isCreatedErr, createMsg, createErrMsg]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(updateMsg?.message);
    }
    if (isUpdatedErr) {
      toast.error(updateErrMsg?.message);
    }
  }, [isUpdated, isUpdatedErr, updateMsg, updateErrMsg]);

  useEffect(() => {
    if (isDeleted) {
      toast.success(deleteMsg?.message);
    }
    if (isDeletedErr) {
      toast.error(deleteErrMsg?.message);
    }
  }, [isDeleted, isDeletedErr, deleteMsg, deleteErrMsg]);

  useEffect(() => {
    if (isItemsByCollIdSuccess) {
      setItemsByCollectionId(collectionItemsByCollectionId);
    }

    if (collectionItemsByTagSearch) {
      tagRefetch();
    }
    if (searchedItems) {
      searchedRefetch();
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
      }}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          to='/user-profile'
          style={{ pointerEvents: `${!user ? 'none' : ''}` }}>
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
              height: '100%',
              width: '100%',
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
