// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: AppStateType = {
    isInitialized: false,
    sortBy: "name",
    sortDirection: "asc"
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type AppStateType = {
    isInitialized: boolean
    sortBy: SortByType
    sortDirection: SortDirectionType
}

export type SortByType = "status" | "name" | "email"
export type SortDirectionType = "asc" | "desc"

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type AppActionTypes =
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setSortByAC>
    | ReturnType<typeof setSortDirectionAC>


// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum APP {
    SET_APP_INITIALIZED = "APP/SET_APP_INITIALIZED",
    SET_SORT_BY = "APP/SET_SORT_BY",
    SET_SORT_DIRECTION = "APP/SET_SORT_DIRECTION"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const appReducer = (state: AppStateType = initialState, action: AppActionTypes): AppStateType => {
    switch (action.type) {
        case APP.SET_APP_INITIALIZED: {
            return {
                ...state,
                isInitialized: action.payload.isInitialized,
            }
        }
        case APP.SET_SORT_BY: {
            return {
                ...state,
                sortBy: action.payload.sortBy,
            }
        }
        case APP.SET_SORT_DIRECTION: {
            return {
                ...state,
                sortDirection: action.payload.sortOrder,
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------

export const setAppInitializedAC = (isInitialized: boolean) =>
    ({type: APP.SET_APP_INITIALIZED, payload: {isInitialized}}) as const

export const setSortByAC = (sortBy: SortByType) =>
    ({type: APP.SET_SORT_BY, payload: {sortBy}}) as const

export const setSortDirectionAC = (sortOrder: SortDirectionType) =>
    ({type: APP.SET_SORT_DIRECTION, payload: {sortOrder}}) as const

// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------------------------------

export default appReducer


