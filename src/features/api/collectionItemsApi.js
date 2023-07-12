import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, TOKEN } from '../../utils/host';
import Cookie from 'js-cookie'
export const collectionItemsApi = createApi({
  reducerPath: 'collectionItemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['CollectionItem', 'Likes', 'Dislikes'],

  endpoints: (builder) => ({
    getAllCollectionItemsByCollectionId: builder.query({
      query: (collectionId) => ({
        url: `collections/byCollectionId/items?collectionId=${collectionId}`,
      }),
      providesTags: ['CollectionItem'],
    }),
    createCollectionItem: builder.mutation({
      query(args) {
        const { collectionId, data } = args
        return {
          url: `collections/${collectionId}/items/create`,
          method: 'POST',
          body: data,
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },
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
          body: data,
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },

        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    deleteCollectionItem: builder.mutation({
      query(itemId) {
        return {
          url: `collections/items/delete/${itemId}`,
          method: 'DELETE',
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },

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
          body: { userId: userId },
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },

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
          body: { userId: userId },
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },

        }
      },
      invalidatesTags: ['CollectionItem']
    }),
    getLastestCollectionItems: builder.query({
      query: () => ({
        url: 'collections/items/lastest',
      }),

      providesTags: ['CollectionItem'],
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
  useGetLastestCollectionItemsQuery
} = collectionItemsApi