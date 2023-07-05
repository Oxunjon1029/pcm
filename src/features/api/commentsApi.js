import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  endpoints: (builder) => ({
    makeComment: builder.mutation({
      query(args) {
        const { itemId, data } = args
        return {
          url: `collections/items/${itemId}/comments`,
          method: 'POST',
          headers,
          body: data
        }
      },
    })
  })
})

export const {
  useMakeCommentMutation
} = commentsApi