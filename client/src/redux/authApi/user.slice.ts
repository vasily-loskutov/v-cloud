import { IUser, IAuthResponse } from "@models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { localStorageService } from "@services"

type stateTypes = {
    user: IUser;
    isAuth: boolean
}
const USER_KEY = "user-key"
const STATUS_KEY = "status"

const initialState: stateTypes = {
    user: localStorageService.getElemByKey(USER_KEY) || undefined,
    isAuth: localStorageService.getElemByKey(STATUS_KEY) === null ? false : localStorageService.getElemByKey(STATUS_KEY)

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logIn(state, action: PayloadAction<IAuthResponse>) {

            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);

        },
        registration(state, action: PayloadAction<IAuthResponse>) {
            console.log(action)
            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);
        },
        updateUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            localStorageService.saveState(USER_KEY, state.user);
        },
        checkAuth(state, action: PayloadAction<IAuthResponse>) {
            state.user = action.payload.user;
            localStorageService.saveState('token', action.payload.accessToken);
            localStorageService.saveState(USER_KEY, state.user);
            state.isAuth = true;
            localStorageService.saveState("status", state.isAuth);
        },

        logOut(state) {
            state.user = {} as IUser;
            localStorageService.removeElement("token")
            state.isAuth = false;

            localStorageService.saveState(USER_KEY, state.user);
            localStorageService.saveState("status", state.isAuth);
        },
        removeFileList(state, action: PayloadAction<string[]>) {
            for (let file of action.payload) {
                if (state.user?.files.includes(file)) {

                    state.user.files = state.user?.files.filter((elem) => elem !== file);
                    localStorageService.saveState(USER_KEY, state.user);
                } else {
                    state.user?.deleteFiles.push(file)
                }

            }
        },
        removedBasketItem(state, action: PayloadAction<string[]>) {
            for (let file of action.payload) {
                if (state.user?.deleteFiles.includes(file)) {

                    state.user.deleteFiles = state.user?.deleteFiles.filter((elem) => elem !== file);
                    localStorageService.saveState(USER_KEY, state.user);
                } else {
                    state.user?.files.push(file)
                }

            }
        },
        addDeleteFiles(state, action: PayloadAction<string[] | string>) {
            for (let file of action.payload) {
                if (!state.user?.deleteFiles.includes(file)) {
                    state.user?.deleteFiles.push(file)
                }
            }
            localStorageService.saveState(USER_KEY, state.user);

        },


    }
})
export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
