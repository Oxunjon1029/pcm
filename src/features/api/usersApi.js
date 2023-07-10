import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, headers } from '../../utils/host';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1/`
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: 'users',
        headers,
      }),
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        headers,
      })
    }),
    changeUserStatus: builder.mutation({
      query(args) {
        return {
          url: `/users/status`,
          method: 'PUT',
          headers,
          body: args,
        }
      },
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({

      query: (selectedIds) => {
        return {
          url: `/users/delete`,
          headers,
          method: 'DELETE',
          body: { selectedIds: selectedIds },
        }
      },

      invalidatesTags: ['User'],
    }),

    addOrRemoveUserAsAdmin: builder.mutation({
      query(args) {
        return {
          url: 'users/role',
          method: 'PUT',
          headers,
          body: args,
        }
      },
      invalidatesTags: ['User'],
    })
  })
})

export const {
  useAddOrRemoveUserAsAdminMutation,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery
} = usersApi