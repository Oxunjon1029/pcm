import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

export const collectionItemsApi = createApi({
  reducerPath: 'collectionItemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['CollectionItem', 'Likes', 'Dislikes'],

  endpoints: (builder) => ({
    getAllCollectionItems: builder.query({
      query: () => ({
        url: 'collections/items',
        headers
      })
    }),
    getAllCollectionItemsByCollectionId: builder.query({
      query: (collectionId) => ({
        url: `collections/byCollectionId/items?collectionId=${collectionId}`,
        headers
      }),
      providesTags: ['CollectionItem']
    }),
    createCollectionItem: builder.mutation({
      query(args) {
        const { collectionId, data } = args
        return {
          url: `collections/${collectionId}/items/create`,
          method: 'POST',
          headers,
          body: data
        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    updatedCollectionItem: builder.mutation({
      query(args) {
        const { itemId, data } = args
        return {
          url: `collections/items/update/${itemId}`,
          method: 'PUT',
          headers,
          body: data
        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    deleteCollectionItem: builder.mutation({
      query(itemId) {
        return {
          url: `collections/items/delete/${itemId}`,
          method: 'DELETE',
          headers,
        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    likeCollectionItem: builder.mutation({
      query(args) {
        const { itemId, userId } = args
        return {
          url: `collections/items/${itemId}/like`,
          method: 'POST',
          headers,
          body: { userId: userId }
        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    unlikeCollectionItem: builder.mutation({
      query(args) {
        const { itemId, userId } = args
        return {
          url: `collections/items/${itemId}/unlike`,
          method: 'POST',
          headers,
          body: { userId: userId }
        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    getLastestCollectionItems: builder.query({
      query: () => ({
        url: 'collections/items/lastest',
        headers
      })
    })
  })
})

export const {
  useGetAllCollectionItemsByCollectionIdQuery,
  useCreateCollectionItemMutation,
  useUpdatedCollectionItemMutation,
  useDeleteCollectionItemMutation,
  useLikeCollectionItemMutation,
  useUnlikeCollectionItemMutation,
  useGetAllCollectionItemsQuery,
  useGetLastestCollectionItemsQuery
} = collectionItemsApi