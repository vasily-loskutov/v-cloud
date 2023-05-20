import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authApi from "./authApi/authApi";
import { userReducer } from './authApi/user.slice';
import fileApi from './fileApi/fileApi';

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    'user': userReducer,

});
const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware, fileApi.middleware)
})


export default store;
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
