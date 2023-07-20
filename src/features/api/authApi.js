import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCookie } from '../../utils/cookies';
import { setUser } from '../user/userSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/`
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
          // await localStorage.setItem('currentUser', JSON.stringify(data?.user))
          setCookie(process.env.REACT_APP_TOKEN, data?.token)
        } catch (error) { }
      },
    }),
  })
})

export const {
  useLoginUserMutation,
  useRegisterUserMutation
} = authApi