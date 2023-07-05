import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, TOKEN } from '../../utils/host';
import { setCookie } from '../../utils/cookies';
import { setUser } from '../user/userSlice';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: 'signup',
          method: "POST",
          body: data
        }
      }
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: 'signin',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setUser(data?.user))
          setCookie(TOKEN, data.token)
        } catch (error) { }
      },
    }),
  })
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi