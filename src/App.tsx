import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Page404} from "./components/Page404/Page404";
import {Test} from "./components/Test/Test";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {RootStateType} from "./redux/store";
import {useDispatch, useSelector} from 'react-redux';
import {setNotificationMessageEmptyAC} from "./redux/notification-reducer";
import {makeToast} from "./helpers/makeToast";
import {Header} from './components/Header/Header';
import {TasksList} from "./components/TasksList/TasksList";

toast.configure()

export const App = () => {
    const {notification} = useSelector((state: RootStateType) => state.notification)
    const dispatch = useDispatch()

    // Notifications toast maker
    useEffect(() => {
        if (notification) {
            makeToast(notification.message, notification.type)
            dispatch(setNotificationMessageEmptyAC())
        }
    }, [dispatch, notification])


    return (
        <div>

            <Header/>

            <div className="container">
                <Switch>
                    <Route exact path={'/test'} render={() => <Test/>}/>
                    <Route exact path={'/tasks'} render={() => <TasksList/>}/>

                    <Route path={"/404"} render={() => <Page404/>}/>
                    <Redirect from='*' to="/404"/>
                </Switch>
            </div>
        </div>
    )
}