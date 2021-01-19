import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Page404} from './components/Page404/Page404'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {RootStateType} from "./redux/store"
import {useDispatch, useSelector} from 'react-redux'
import {setNotificationMessageEmptyAC} from './redux/notification-reducer'
import {makeToast} from "./helpers/makeToast"
import {Header} from './components/Header/Header'
import {Tasks} from "./components/Tasks/Tasks"
import {NewTask} from "./components/Task/NewTask"
import {Login} from './components/Login/Login'
import EditTask from './components/Task/EditTask'
import { loadTokenFromLocalStorage } from './api/localStorage/localStorage'
import {setUserTokenAC} from './redux/auth-reducer'

toast.configure()

export const App = () => {
    const {notification} = useSelector((state: RootStateType) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        const token = loadTokenFromLocalStorage()
        dispatch(setUserTokenAC(token))
    })

    // Notifications toast maker
    useEffect(() => {
        if (notification) {
            makeToast(notification.message, notification.type)
            dispatch(setNotificationMessageEmptyAC())
        }
    }, [dispatch, notification])

//----------------------------------------------------------------------------------------------------------------------

    return (
        <div>

            <Header/>

            <div className="container">
                <Switch>
                    <Route exact path={'/tasks'} render={() => <Tasks/>}/>
                    <Route exact path={'/new'} render={() => <NewTask/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                    <Route path={'/edit/:taskId?'} render={() => <EditTask/>}/>

                    <Route path={"/404"} render={() => <Page404/>}/>
                    <Redirect from='*' to="/404"/>
                </Switch>
            </div>
        </div>
    )
}