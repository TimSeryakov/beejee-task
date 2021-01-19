// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: ErrStateType = {
    serverMessage: null
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type ErrStateType = {
    serverMessage: { messageText: string, messageType: ServerMessageType } | null
}

export type ServerMessageType = "info" | "success" | "warning" | "error" | "default"


// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type ErrActionTypes =
    | ReturnType<typeof setServerMessageAC>
    | ReturnType<typeof setServerMessageEmptyAC>

// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum ERR {
    SET_SERVER_MESSAGE = "ERR/SET_SERVER_MESSAGE",
    SET_SERVER_MESSAGE_EMPTY = "ERR/SET_SERVER_MESSAGE_EMPTY",
}

//
export enum MESSAGES {
    ADD_ADVERT_SUCCESS = "Advert successfully added",
    ADD_ADVERT_ERROR = "Error while adding advert",
    LOGIN_SUCCESSFUL = "Logged in successfully"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const errReducer = (state: ErrStateType = initialState, action: ErrActionTypes): ErrStateType => {
    switch (action.type) {
        case ERR.SET_SERVER_MESSAGE: {
            return {
                ...state,
                serverMessage: {messageText: action.messageText, messageType: action.messageType},
            }
        }
        case ERR.SET_SERVER_MESSAGE_EMPTY: {
            return {
                ...state,
                serverMessage: null,
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------

export const setServerMessageAC = (messageText: string, messageType: ServerMessageType) =>
    ({type: ERR.SET_SERVER_MESSAGE, messageText, messageType}) as const

export const setServerMessageEmptyAC = () =>
    ({type: ERR.SET_SERVER_MESSAGE_EMPTY}) as const

// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------

export default errReducer


