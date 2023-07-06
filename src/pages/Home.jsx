import { Box, Button, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Collections from '../components/Collections';
import Items from '../components/Items';
import { selectUser } from '../features/user/userSlice';
import { useGetLastestCollectionItemsQuery } from '../features/api/collectionItemsApi';
import { useGetLargestFiveCollectionsQuery } from '../features/api/collectionsApi';
import { useGetAllTagsQuery } from '../features/api/tagsApi';
import { useSearchItemsByTagQuery } from '../features/api/searchApi';
import { useNavigate } from 'react-router';
const Home = ({ lang }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tag, setTag] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { isSuccess, isLoading, data } = useGetLargestFiveCollectionsQuery();
  const { data: lastestCollectionItems } = useGetLastestCollectionItemsQuery();
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
  }, [isSuccess, data]);
  useEffect(() => {
    if (tagSuccess && searchedItemsByTag.length > 0) {
      navigate('/collection/items', {
        state: { collectionItems: searchedItemsByTag },
      });
    }
  }, [tagSuccess, searchedItemsByTag, navigate, lang]);

 
  return (
    <Box
      sx={{
        margin: '100px auto',
        marginBottom: { xs: '20px', lg: '20px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        width: '96%',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
        <Typography
          component='div'
          sx={{ fontSize: '20px', fontWeight: '700' }}>
          Collection items
        </Typography>
        <Items
          user={user}
          collectionItems={lastestCollectionItems}
          lang={lang}
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
                onClick={() => setTag(tag?.title[lang])}
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
