import { Box, Button, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Collections from '../components/Collections';
import Items from '../components/Items';
import { selectUser, setEntag, setUztag } from '../features/user/userSlice';
import { useGetLastestCollectionItemsQuery } from '../features/api/collectionItemsApi';
import { useGetLargestFiveCollectionsQuery } from '../features/api/collectionsApi';
import { useGetAllTagsQuery } from '../features/api/tagsApi';
import { useSearchItemsByTagQuery } from '../features/api/collectionItemsApi';
import { useNavigate } from 'react-router';
import {
  useLikeCollectionItemMutation,
  useUnlikeCollectionItemMutation,
} from '../features/api/collectionItemsApi';
const Home = ({ lang }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tag, setFirstTag] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [likeCollectionItem] = useLikeCollectionItemMutation();
  const [unlikeCollectionItem] = useUnlikeCollectionItemMutation();
  const {
    isSuccess,
    isLoading,
    data,
    refetch: largestRefetch,
  } = useGetLargestFiveCollectionsQuery();
  const {
    data: lastestCollectionItems,
    isSuccess: isLatestItemsSuccess,
    refetch,
  } = useGetLastestCollectionItemsQuery();
  const { data: searchedItemsByTag, isSuccess: tagSuccess } =
    useSearchItemsByTagQuery({ tag: tag, lang: lang });
  const { data: alltags } = useGetAllTagsQuery();
  const [homeCollections, setHomeCollections] = useState([]);
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  useEffect(() => {
    if (isSuccess) {
      setHomeCollections(data);
    }
    largestRefetch();
  }, [isSuccess, data, largestRefetch]);
  useEffect(() => {
    if (tagSuccess) {
      if (searchedItemsByTag.length > 0) {
        navigate('/collection/items', {
          state: {
            collectionItems: searchedItemsByTag,
          },
        });
      }
    }
  }, [tagSuccess, searchedItemsByTag, navigate]);

  const [latestItems, setLatestItems] = useState([]);
  useEffect(() => {
    if (isLatestItemsSuccess) {
      setLatestItems(lastestCollectionItems);
    }
    refetch();
  }, [isLatestItemsSuccess, lastestCollectionItems, latestItems, refetch]);

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
  return (
    <Box
      sx={{
        margin: '100px auto',
        marginBottom: { xs: '20px', lg: '20px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        width: '96%',
        minHeight: '100vh',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
        }}>
        <Typography
          component='div'
          sx={{ fontSize: '20px', fontWeight: '700' }}>
          Collection items
        </Typography>
        <Items
          user={user}
          collectionItems={latestItems}
          lang={lang}
          handleIsLiked={handleIsLiked}
          handleDislikeItem={handleDislikeItem}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <Typography
          component='div'
          sx={{ fontSize: '20px', fontWeight: '700' }}>
          Collections
        </Typography>
        <Collections
          lang={lang}
          collections={homeCollections}
          loading={isLoading}
          open={deleteModalOpen}
          handleClose={handleDeleteModalClose}
          handleOpen={handleDeleteModalOpen}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <Typography
          component='div'
          sx={{ fontSize: '20px', fontWeight: '700' }}>
          Tags
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 1, md: 1, lg: 1 }}>
          {alltags?.map((tag) => (
            <Grid item xs={6} sm={4} md={4} lg={3} xl={3} key={tag?._id}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setFirstTag(tag?.title[lang]);
                  dispatch(setUztag(tag?.title['uz']));
                  dispatch(setEntag(tag?.title['en']));
                }}
                sx={{
                  flex: 1,
                  minWidth: {
                    xs: '180px',
                    sm: '230px',
                    md: '280px',
                    lg: '300px',
                    xl: '350px',
                  },
                  minHeight: '50px',
                  maxWidth: {
                    xs: '280px',
                    sm: '280px',
                    md: '300px',
                    lg: '380px',
                    xl: '400px',
                  },
                }}
                variant='contained'>
                #{tag.title[lang]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
