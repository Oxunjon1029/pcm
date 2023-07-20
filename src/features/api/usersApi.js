import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookie from "js-cookie";
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/v1/`
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => ({
        url: 'users',
        headers: {
          "Content-type": 'application/json; charset=utf-8',
          "Accept": 'application/json',
          "Authorization": Cookie.get(process.env.REACT_APP_TOKEN) ? Cookie.get(process.env.REACT_APP_TOKEN) : ''
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
          "Authorization": Cookie.get(process.env.REACT_APP_TOKEN) ? Cookie.get(process.env.REACT_APP_TOKEN) : ''
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
            "Authorization": Cookie.get(process.env.REACT_APP_TOKEN) ? Cookie.get(process.env.REACT_APP_TOKEN) : ''
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
            "Authorization": Cookie.get(process.env.REACT_APP_TOKEN) ? Cookie.get(process.env.REACT_APP_TOKEN) : ''
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
            "Authorization": Cookie.get(process.env.REACT_APP_TOKEN) ? Cookie.get(process.env.REACT_APP_TOKEN) : ''
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