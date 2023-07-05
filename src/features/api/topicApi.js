import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['Topic'],
  endpoints: (builder) => ({
    getAllTopics: builder.query({
      query: () => ({
        url: 'topic',
        headers
      }),
      providesTags: ['Topic']
    }),

  })
})

export const {
  useGetAllTopicsQuery,
} = topicApi