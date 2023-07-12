import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/host';

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
      }),
      providesTags: ['Topic']
    }),

  })
})

export const {
  useGetAllTopicsQuery,
} = topicApi