import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import appReducer, {AppActionTypes, AppStateType} from "./app-reducer"
import tasksReducer, {TasksActionTypes, TasksStateType} from "./task-reducer"
import authReducer, {AuthActionTypes, AuthStateType} from "./auth-reducer"
import notificationReducer, {NotificationActionTypes, NotificationStateType} from "./notification-reducer"

export type RootStateType = {
    app: AppStateType
    auth: AuthStateType
    notification: NotificationStateType
    tasks: TasksStateType
}

export type ThunkDispatchType = ThunkAction<void | Promise<void>, RootStateType, unknown, RootActionsTypes>

export type RootActionsTypes =
    | AppActionTypes
    | TasksActionTypes
    | NotificationActionTypes
    | AuthActionTypes

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    notification: notificationReducer,
    tasks: tasksReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware/*, logger*/))

export default store