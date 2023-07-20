import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_BASE_URL } from '../../utils/host'


export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_BASE_URL}/api/v1/`
  }),
  endpoints: (builder) => ({
    searchFullText: builder.query({
      query: (text) => ({
        url: `/itemOrComment/search?text=${text}`,
        headers: {
          "Accept": '*/*'
        }
      })
    }),
    searchItemsByTag: builder.query({
      query: ({ tag, lang }) => ({
        url: `itemsByTag/search?tag=${tag}&lang=${lang}`,
        headers: {
          "Accept": '*/*'
        }
      })
    })
  })
})

export const {
  useSearchFullTextQuery,
  useSearchItemsByTagQuery
} = searchApi