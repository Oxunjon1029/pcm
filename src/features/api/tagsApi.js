import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['Tag'],
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => ({
        url: 'tags',
        headers
      }),
      providesTags: ['Tag'],
    }),

  })
})

export const {
  useGetAllTagsQuery,
} = tagsApi