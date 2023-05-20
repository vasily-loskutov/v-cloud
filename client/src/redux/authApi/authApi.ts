import { createApi } from "@reduxjs/toolkit/query/react"
import { IAuthResponse, IUser, ILogInPayload, IRegisterPayload, IError } from '@models'
import type {
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query'
import baseQueryWithReauth from "../baseQueryWithReAuth/baseQueryWithReAuth"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, IError, {}>,
  endpoints: builder => ({

    refresh: builder.query<IAuthResponse, null>({
      query: () => ({
        url: `/auth/refresh`,

      }),


    }),
    logIn: builder.mutation<IAuthResponse, ILogInPayload>({
      query: (payload: ILogInPayload) => ({
        url: `/auth/login`,
        method: 'POST',
        body: payload,
      }),



    }),
    register: builder.mutation<IAuthResponse, IRegisterPayload>({
      query: (payload: IRegisterPayload) => ({
        url: `/auth/registration`,
        method: 'POST',
        body: payload,

      }),


    }),
    logOut: builder.mutation<IAuthResponse, undefined>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',

      }),

    }),

    userUpdate: builder.mutation<IUser, IUser>({
      query: (payload: IUser) => ({
        url: `/auth/user`,
        method: 'PUT',
        body: payload

      }),

    }),
    deleteUser: builder.mutation<number, number>({
      query: (id: number) => ({
        url: `/auth/user/${id}`,
        method: 'DELETE',


      }),

    }),

  })
})
export const { useLogInMutation, useRegisterMutation, useLogOutMutation,
  useRefreshQuery, useUserUpdateMutation, useDeleteUserMutation } = authApi
export default authApi
