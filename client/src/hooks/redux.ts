import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from "@reduxjs/toolkit";
import type { RootState } from '@redux'
import { userActions } from "@redux";
const actions = {
    ...userActions,

}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
