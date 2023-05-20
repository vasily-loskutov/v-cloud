import { createApi } from "@reduxjs/toolkit/query/react"
import { IError, IUser } from '@models'
import type {
    BaseQueryFn,
    FetchArgs,
} from '@reduxjs/toolkit/query'
import baseQueryWithReauth from "../baseQueryWithReAuth/baseQueryWithReAuth"
type payloadType = {
    id: number
    fileIds: number[]
}
type payloadTypeWithNames = {
    id: number
    fileNames: string[]
}
import { IFile } from "@models"
export const fileApi = createApi({
    reducerPath: "fileApi",
    tagTypes: ['File'],
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, IError, {}>,

    endpoints: builder => ({
        saveFile: builder.mutation<any, any>({
            query: (payload: any) => ({
                url: `/file/save/${payload.id}`,
                method: 'POST',
                body: payload.payload
            }),
            invalidatesTags: ['File']
        }),
        downloadFile: builder.query({
            query: (id: number) => ({
                url: `/file/download/${id}`,
                method: 'GET',

                responseHandler: async (response) => {
                    return window.URL.createObjectURL(await response.blob())
                },
                cache: 'no-cache',
            }),

        }),
        deleteFilesInFileList: builder.mutation<string[], payloadType>({
            query: (payload: any) => ({
                url: `/auth/${payload.id}`,
                method: 'DELETE',
                body: payload
            }),
            invalidatesTags: ['File']
        }),
        removeFromDeleteFiles: builder.mutation<string[], payloadType>({
            query: (payload: payloadType) => ({
                url: `/auth/${payload.id}`,
                method: 'PUT',
                body: payload
            }),

        }),
        emptyTrash: builder.mutation<string[], payloadTypeWithNames>({
            query: (payload: payloadTypeWithNames) => ({
                url: `/file/emptyTrash/${payload.id}`,
                method: 'DELETE',
                body: payload
            }),
            invalidatesTags: ['File']
        }),
        getDeleteFiles: builder.query<IFile[], number>({
            query: (id: number) => ({
                url: `/file/delete/${id}`,
                method: 'GET',

            }),
            providesTags: ['File']
        }),
        removeFromTrash: builder.mutation<string[], payloadType>({
            query: (payload: payloadType) => ({
                url: `/auth/trash/${payload.id}`,
                method: 'DELETE',
                body: payload
            }),
            invalidatesTags: ['File']
        }),
        getFiles: builder.query<IFile[], number>({
            query: (userId: number) => ({
                url: `/file/${userId}`,
                method: 'GET',

            }),
            providesTags: ['File']
        }),
        getUserInfo: builder.query<IUser, number>({
            query: (id: number) => ({
                url: `/auth/getuserinfo/${id}`,
                method: 'GET',

            }),
            providesTags: ['File']
        }),
    })
})
export const { useSaveFileMutation, useLazyDownloadFileQuery, useDeleteFilesInFileListMutation,
    useGetDeleteFilesQuery, useRemoveFromTrashMutation, useEmptyTrashMutation, useLazyGetUserInfoQuery, useGetUserInfoQuery,
    useGetFilesQuery } = fileApi
export default fileApi
