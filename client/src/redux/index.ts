import store from "./store";
import type { RootState } from "./store"
import type { AppDispatch } from "./store"
import {
    useLogInMutation, useRegisterMutation, useLogOutMutation,
    useRefreshQuery, useUserUpdateMutation, useDeleteUserMutation


} from "./authApi/authApi"
import { userActions } from "./authApi/user.slice"
import {
    useSaveFileMutation, useLazyDownloadFileQuery, useDeleteFilesInFileListMutation,
    useGetDeleteFilesQuery, useRemoveFromTrashMutation, useGetFilesQuery, useEmptyTrashMutation, useLazyGetUserInfoQuery, useGetUserInfoQuery
} from "./fileApi/fileApi";

export {
    store, RootState, AppDispatch, useLogInMutation, useRegisterMutation, useLogOutMutation,
    useRefreshQuery, useUserUpdateMutation, useDeleteUserMutation, userActions, useSaveFileMutation,
    useLazyGetUserInfoQuery, useLazyDownloadFileQuery, useDeleteFilesInFileListMutation,
    useGetDeleteFilesQuery, useRemoveFromTrashMutation, useGetUserInfoQuery, useGetFilesQuery, useEmptyTrashMutation
}
