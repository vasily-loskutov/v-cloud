import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,


} from '@reduxjs/toolkit/query'

import config from '@config'
import { userActions } from '../authApi/user.slice'
import { IAuthResponse, IError } from '@models'







const baseQuery = fetchBaseQuery({
  baseUrl: config.baseURL, credentials: 'include',
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token

    const refreshResult = await baseQuery({ method: "GET", url: "/auth/refresh" }, api, extraOptions)


    if (refreshResult.data) {
      // store the new token
      localStorage.setItem("token", JSON.stringify(refreshResult.data.accessToken))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(userActions.logOut())
    }
  }
  return result
}
export default baseQueryWithReauth
