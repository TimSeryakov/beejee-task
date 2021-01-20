// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

import {ThunkDispatchType} from "./store";
import {AUTH_API} from "../api/api";
import {NOTIFICATION_MESSAGES, setNotificationMessageAC} from "./notification-reducer";
import {saveTokenToLocalStorage} from "../localStorage/localStorage";

export const initialState: AuthStateType = {
    isAuthorized: false,
    userToken: ""
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type AuthStateType = {
    isAuthorized: boolean
    userToken: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type AuthActionTypes =
    | ReturnType<typeof setUserTokenAC>

// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum AUTH {
    SET_USER_TOKEN = "AUTH/SET_USER_TOKEN"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const authReducer = (state: AuthStateType = initialState, action: AuthActionTypes): AuthStateType => {
    switch (action.type) {
        case AUTH.SET_USER_TOKEN: {
            return {
                ...state,
                userToken: action.userToken,
                isAuthorized: !!action.userToken
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------

export const setUserTokenAC = (userToken: string) =>
    ({type: AUTH.SET_USER_TOKEN, userToken}) as const

// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------

export const loginTC = (email: string, password: string): ThunkDispatchType => (dispatch) => {

    return AUTH_API.login(email, password)
        .then(res => {
            if (res.data.status === "ok" && res.data.message.token) {
                dispatch(setUserTokenAC(res.data.message.token))
                saveTokenToLocalStorage(res.data.message.token) // WARNING Not safe!
                dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.LOGIN_SUCCESS, "info"))
            } else {
                dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.LOGIN_ERROR, "error"))
            }
        })
        .catch(error => {
            dispatch(setNotificationMessageAC(error.message, "error"))
        })
}

// ---------------------------------------------------------------------------------------------------------------------

export default authReducer


