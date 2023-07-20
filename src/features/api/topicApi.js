import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BASE_URL } from '../../utils/host'

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}/api/v1/`
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