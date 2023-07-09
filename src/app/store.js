import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi';
import { usersApi } from '../features/api/usersApi';
import { collectionsApi } from '../features/api/collectionsApi';
import { collectionItemsApi } from '../features/api/collectionItemsApi';
import { searchApi } from '../features/api/searchApi';
import { topicApi } from '../features/api/topicApi';
import { tagsApi } from '../features/api/tagsApi';
import userReducer from '../features/user/userSlice';
import bucketReducer from '../features/bucket/bucketUrlSlice';
import themeReducer from '../features/theme/themeModeSlice'
import langReducer from '../features/lang/langSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    bucket: bucketReducer,
    theme: themeReducer,
    lang: langReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [collectionItemsApi.reducerPath]: collectionItemsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    authApi.middleware,
    usersApi.middleware,
    collectionsApi.middleware,
    collectionItemsApi.middleware,
    searchApi.middleware,
    topicApi.middleware,
    tagsApi.middleware,
  ])
});
