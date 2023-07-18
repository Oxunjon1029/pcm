import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, TOKEN } from '../../utils/host';
import Cookie from "js-cookie";
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
        headers: {
          "Content-type": 'application/json; charset=utf-8',
          "Accept": 'application/json',
          "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
        },

      }),
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        headers: {
          "Content-type": 'application/json; charset=utf-8',
          "Accept": 'application/json',
          "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
        },

      })
    }),
    changeUserStatus: builder.mutation({
      query(args) {
        return {
          url: `/users/status`,
          method: 'PUT',
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },
          body: args,

        }
      },
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({

      query: (selectedIds) => {
        return {
          url: `/users/delete`,
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },
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
          headers: {
            "Content-type": 'application/json; charset=utf-8',
            "Accept": 'application/json',
            "Authorization": Cookie.get(TOKEN) ? Cookie.get(TOKEN) : ''
          },
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
  useGetUserByIdQuery,
} = usersApi