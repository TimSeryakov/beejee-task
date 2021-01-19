import {ThunkDispatchType} from "./store"
import {TASKS_API} from "../api/api"
import {NOTIFICATION_MESSAGES, setNotificationMessageAC} from "./notification-reducer"
import {booleanAsStatusCode} from "../helpers/statusCodeConverter";

// ---------------------------------------------------------------------------------------------------------------------
// Init State
// ---------------------------------------------------------------------------------------------------------------------

export const initialState: TasksStateType = {
    isLoaded: false,
    totalTasksQty: 0,
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
    status: TaskStatusType
}

export type NewTaskDataType = {
    username: string
    email: string
    text: string
}

export type TaskStatusType = 0 | 10

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators Types
// ---------------------------------------------------------------------------------------------------------------------

export type TasksActionTypes =
    | ReturnType<typeof setTasksDataLoadedAC>
    | ReturnType<typeof setTotalTasksQtyAC>
    | ReturnType<typeof setTasksDataAC>
    | ReturnType<typeof setCurrentTaskDataAC>
    | ReturnType<typeof setCurrentPageAC>


// ---------------------------------------------------------------------------------------------------------------------
// Enum as const
// ---------------------------------------------------------------------------------------------------------------------

enum TASKS {
    SET_TASKS_LOADED = "TASKS/SET_LOADED",
    SET_TOTAL_TASKS_QTY = "TASKS/SET_TOTAL_TASKS_QTY",
    SET_TASKS_DATA = "TASKS/SET_TASKS_DATA",
    SET_CURRENT_TASK_DATA = "TASKS/SET_CURRENT_TASK_DATA",
    SET_CURRENT_PAGE = "TASKS/SET_CURRENT_PAGE"
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------

const taskReducer = (state: TasksStateType = initialState, action: TasksActionTypes): TasksStateType => {
    switch (action.type) {
        case TASKS.SET_TASKS_LOADED: {
            return {
                ...state,
                isLoaded: action.payload.isLoaded,
            }
        }
        case TASKS.SET_TOTAL_TASKS_QTY: {
            return {
                ...state,
                totalTasksQty: +action.payload.totalTasksQty,
            }
        }
        case TASKS.SET_TASKS_DATA: {
            return {
                ...state,
                tasksData: action.payload.tasksData,
            }
        }
        case TASKS.SET_CURRENT_TASK_DATA: {
            return {
                ...state,
                currentTaskData: action.payload.taskData,
            }
        }
        case TASKS.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload.pageNumber,
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
    ({type: TASKS.SET_TASKS_LOADED, payload: {isLoaded}}) as const

export const setTotalTasksQtyAC = (totalTasksQty: number) =>
    ({type: TASKS.SET_TOTAL_TASKS_QTY, payload: {totalTasksQty}}) as const

export const setTasksDataAC = (tasksData: TaskDataType[]) =>
    ({type: TASKS.SET_TASKS_DATA, payload: {tasksData}}) as const

export const setCurrentTaskDataAC = (taskData: TaskDataType) =>
    ({type: TASKS.SET_CURRENT_TASK_DATA, payload: {taskData}}) as const

export const setCurrentPageAC = (pageNumber: number) =>
    ({type: TASKS.SET_CURRENT_PAGE, payload: {pageNumber}}) as const


// ---------------------------------------------------------------------------------------------------------------------
// Thunk Creators
// ---------------------------------------------------------------------------------------------------------------------

export const requestTasksDataTC = (): ThunkDispatchType => (dispatch, getState) => {
    const {currentPage} = getState().tasks
    const {sortBy} = getState().app
    const {sortDirection} = getState().app

    dispatch(setTasksDataLoadedAC(false))

    return TASKS_API.getTasks(currentPage, sortBy, sortDirection)
        .then(res => {
            if (res.status === +200) {
                dispatch(setTotalTasksQtyAC(res.data.message.total_task_count))
                dispatch(setTasksDataAC(res.data.message.tasks))
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.GET_TASKS_ERROR, "error"))
        })
        .finally(() => {
            dispatch(setTasksDataLoadedAC(true))
        })
}

export const createTasksTC = (username: string, email: string, text: string): ThunkDispatchType => (dispatch) => {

    dispatch(setTasksDataLoadedAC(false))

    return TASKS_API.createTask(username, email, text)
        .then(res => {
            if (res.status === +200) {
                dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.ADD_SUCCESS, "info"))
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.GET_TASKS_ERROR, "error"))
        })
        .finally(() => {
            dispatch(setTasksDataLoadedAC(true))
        })
}

export const editTasksTC = (id: number, status: boolean, text: string): ThunkDispatchType => (dispatch, getState) => {
    const token = getState().auth.userToken

    const statusCode = booleanAsStatusCode(status)

    dispatch(setTasksDataLoadedAC(false))

    return TASKS_API.editTask(id, statusCode, text, token)
        .then(res => {
            if (res.status === +200) {
                dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.EDIT_SUCCESS, "info"))
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.EDIT_TASKS_ERROR, "error"))
        })
        .finally(() => {
            dispatch(setTasksDataLoadedAC(true))
        })
}


// ---------------------------------------------------------------------------------------------------------------------

export default taskReducer


