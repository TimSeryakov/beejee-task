// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: AuthStateType = {
    isAuthorized: false,
    userID: ""
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type AuthStateType = {
    isAuthorized: boolean
    userID: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type AuthActionTypes =
    | ReturnType<typeof setUserIDAC>

// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum AUTH {
    SET_USER_ID = "AUTH/SET_USER_ID"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const authReducer = (state: AuthStateType = initialState, action: AuthActionTypes): AuthStateType => {
    switch (action.type) {
        case AUTH.SET_USER_ID: {
            return {
                ...state,
                userID: action.userID,
                isAuthorized: !!action.userID
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------

export const setUserIDAC = (userID: string) =>
    ({type: AUTH.SET_USER_ID, userID}) as const

// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------

// if (res.user) {
//     dispatch(setUserIDAC(res.user.uid))
// }
// export const signinTC = (email: string, password: string): ThunkDispatchType => (dispatch, getState) => {
//
//     dispatch(setAppLoadedAC(false))
//
//     return AUTH_API.signin(email, password)
//         .then(res => {
//             if (res.user) {
//                 dispatch(setUserIDAC(res.user.uid))
//                 dispatch(setServerMessageAC(MESSAGES.LOGIN_SUCCESSFUL, "success"))
//             }
//         })
//         .catch(error => {
//             dispatch(setServerMessageAC(error.message, "error"))
//         })
//         .finally(() => {
//             setAppLoadedAC(true)
//         })
// }

// ---------------------------------------------------------------------------------------------------------------------

export default authReducer


