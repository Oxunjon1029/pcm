import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

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
        headers
      }),
      providesTags: ['Collection'],
    }),
    getCollectionById: builder.query({
      query: (id) => ({
        url: `collection/${id}`,
        headers,
      })
    }),
    createCollection: builder.mutation({
      query(data) {
        return {
          url: 'collections/create',
          method: 'POST',
          body: data,
          headers
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
          headers
        }
      },
      invalidatesTags: ['Collection', 'S3Url']
    }),
    deleteCollection: builder.mutation({
      query(id) {
        return {
          url: `collections/delete/${id}`,
          method: 'DELETE',
          headers
        }
      },
      invalidatesTags: ['Collection']
    }),
    getS3Url: builder.query({
      query() {
        return {
          url: 'collections/s3Url',
          headers
        }
      },
      providesTags: ['S3Url']
    }),
    getLargestFiveCollections: builder.query({
      query: () => ({
        url: 'collections/largest',
        headers,
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