import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, TOKEN } from '../../utils/host';
import Cookie from 'js-cookie'
export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['Collection', 'S3Url'],
  endpoints: (builder) => ({
    getAllCollections: builder.query({
      query: () => ({
        url: 'collection',
        headers: {
          "Content-type": 'application/json; charset=utf-8',
          "Accept": 'application/json',
          "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
          
        },
        
      }),
      providesTags: ['Collection'],
    }),
    getCollectionById: builder.query({
      query: (id) => ({
        url: `collection/${id}`,
        headers: {
          "Content-type": 'application/json; charset=utf-8',
          "Accept": 'application/json',
          "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
          
        },
        
      })
    }),
    createCollection: builder.mutation({
      query(data) {
        return {
          url: 'collections/create',
          method: 'POST',
          body: data,
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
            
          },
          
        }
      },
      invalidatesTags: ['Collection', 'S3Url']
    }),
    updateCollections: builder.mutation({
      query(args) {
        const { id, data } = args
        return {
          url: `collections/edit/${id}`,
          method: 'PUT',
          body: data,
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
            
          },

          
        }
      },
      invalidatesTags: ['Collection', 'S3Url']
    }),
    deleteCollection: builder.mutation({
      query(id) {
        return {
          url: `collections/delete/${id}`,
          method: 'DELETE',
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
            
          },
          
        }
      },
      invalidatesTags: ['Collection']
    }),
    getS3Url: builder.query({
      query() {
        return {
          url: 'collections/s3Url',
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : '',
            
          },
        }
      },
      providesTags: ['S3Url']
    }),
    getLargestFiveCollections: builder.query({
      query: () => ({
        url: 'collections/largest',
      })
    })
  })
})

export const {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionsMutation,
  useGetAllCollectionsQuery,
  useGetS3UrlQuery,
  useGetLargestFiveCollectionsQuery,
  useGetCollectionByIdQuery
} = collectionsApi