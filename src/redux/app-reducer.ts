// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: AppStateType = {
    isInitialized: false,
    sortBy: "name",
    sortDirection: "asc",
    currentURL: ""
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type AppStateType = {
    isInitialized: boolean
    sortBy: SortByType
    sortDirection: SortDirectionType
    currentURL: string
}

export type SortByType = "status" | "name" | "email"
export type SortDirectionType = "asc" | "desc"

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type AppActionTypes =
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof setSortByAC>
    | ReturnType<typeof toggleSortDirectionAC>
    | ReturnType<typeof setCurrentUrlAC>


// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum APP {
    SET_APP_INITIALIZED = "APP/SET_APP_INITIALIZED",
    SET_SORT_BY = "APP/SET_SORT_BY",
    TOGGLE_SORT_DIRECTION = "APP/TOGGLE_SORT_DIRECTION",
    SET_CURRENT_URL = "APP/SET_CURRENT_URL"
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
        case APP.TOGGLE_SORT_DIRECTION: {
            return {
                ...state,
                sortDirection: state.sortDirection === "asc" ? "desc" : "asc"
            }
        }
        case APP.SET_CURRENT_URL: {
            return {
                ...state,
                currentURL: action.payload.currentUrl
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

export const toggleSortDirectionAC = () =>
    ({type: APP.TOGGLE_SORT_DIRECTION}) as const

export const setCurrentUrlAC = (currentUrl: string) =>
    ({type: APP.SET_CURRENT_URL, payload: {currentUrl}}) as const

// ---------------------------------------------------------------------------------------------------------------------

export default appReducer


