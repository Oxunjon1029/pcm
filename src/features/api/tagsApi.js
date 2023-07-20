import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BASE_URL } from '../../utils/host'

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}/api/v1/`
  }),
  tagTypes: ['Tag'],
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => ({
        url: 'tags',
      }),
      providesTags: ['Tag'],
    }),

  })
})

export const {
  useGetAllTagsQuery,
} = tagsApi