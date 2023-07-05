import { Box, Button, Typography } from '@mui/material';
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
  const { isSuccess: isLastestSuccess, data: lastestCollectionItems } =
    useGetLastestCollectionItemsQuery();
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
  }, [tagSuccess, searchedItemsByTag, navigate]);
  useEffect(() => {
    if (isLastestSuccess) {
      console.log(lastestCollectionItems);
    }
  }, [isLastestSuccess, lastestCollectionItems]);
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
        <Typography component='div' sx={{ fonSize: '20px', fonWeight: '500' }}>
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
        <Typography component='div' sx={{ fonSize: '20px', fonWeight: '500' }}>
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
        <Typography component='div' sx={{ fonSize: '20px', fonWeight: '500' }}>
          Tags
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {alltags?.map((tag) => (
            <Button
              onClick={() => setTag(tag?.title[lang])}
              sx={{
                flex: 1,
                minWidth: '300px',
                minHeight: '50px',
                maxWidth: '400px  ',
              }}
              variant='contained'>
              #{tag.title[lang]}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
