import {ThunkDispatchType} from "./store"
import {MESSAGES, setServerMessageAC} from "./err-reducer"

// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: TasksStateType = {
    isLoaded: false,
    totalTasksQty: 5,
    tasksPerPage: 3,
    currentPage: 1,
    tasksData: [] as TaskDataType[],
    currentTaskData: {} as TaskDataType
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------

export type TasksStateType = {
    isLoaded: boolean
    totalTasksQty: number
    tasksPerPage: number
    currentPage: number
    tasksData: TaskDataType[],
    currentTaskData: TaskDataType
}

export type TaskDataType = {
    id: number
    username: string
    email: string
    text: string
    status: number
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type TasksActionTypes =
    | ReturnType<typeof setTasksDataLoadedAC>
    | ReturnType<typeof setTasksDataAC>
    | ReturnType<typeof setCurrentTaskDataAC>


// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum TASKS {
    SET_TASKS_LOADED = "TASKS/SET_LOADED",
    SET_TASKS_DATA = "TASKS/SET_TASKS_DATA",
    SET_CURRENT_TASK_DATA = "TASKS/SET_CURRENT_TASK_DATA"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const taskReducer = (state: TasksStateType = initialState, action: TasksActionTypes): TasksStateType => {
    switch (action.type) {
        case TASKS.SET_TASKS_LOADED: {
            return {
                ...state,
                isLoaded: action.isLoaded,
            }
        }
        case TASKS.SET_TASKS_DATA: {
            return {
                ...state,
                tasksData: action.tasksData,
            }
        }
        case TASKS.SET_CURRENT_TASK_DATA: {
            return {
                ...state,
                currentTaskData: action.taskData,
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------

export const setTasksDataLoadedAC = (isLoaded: boolean) =>
    ({type: TASKS.SET_TASKS_LOADED, isLoaded}) as const

export const setTasksDataAC = (tasksData: TaskDataType[]) =>
    ({type: TASKS.SET_TASKS_DATA, tasksData}) as const

export const setCurrentTaskDataAC = (taskData: TaskDataType) =>
    ({type: TASKS.SET_CURRENT_TASK_DATA, taskData}) as const


// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------

// export const requestTasksDataTC = (): ThunkDispatchType => (dispatch, getState) => {
//     const {searchQuery} = getState().app
//     const {sortBy} = getState().app
//     const {sortDirection} = getState().app
//
//     dispatch(setTasksDataLoadedAC(false))
//
//     return TASKS_API.get(searchQuery, sortBy, sortDirection)
//         .then(data => {
//             dispatch(setTasksDataAC(data))
//         })
//         .catch(error => {
//             dispatch(setServerMessageAC(error.message, "error"))
//         })
//         .finally(() => {
//             setTasksDataLoadedAC(true)
//         })
// }
//
// export const createTaskTC = (): ThunkDispatchType => (dispatch, getState) => {
//     const {currentTaskData} = getState().tasks
//     const {userID} = getState().auth
//
//     dispatch(setTasksDataLoadedAC(false))
//
//     return TASKS_API.add(userID, currentTaskData)
//         .then(() => { // TODO проверять res
//             dispatch(setServerMessageAC(MESSAGES.ADD_TASK_SUCCESS, "info"))
//         })
//         .catch(error => {
//             dispatch(setServerMessageAC(error.message, "error"))
//         })
//         .finally(() => {
//             setTasksDataLoadedAC(true)
//         })
// }

// ---------------------------------------------------------------------------------------------------------------------

export default taskReducer


