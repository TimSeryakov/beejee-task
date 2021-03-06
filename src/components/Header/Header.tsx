import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {saveTokenToLocalStorage} from "../../localStorage/localStorage";
import {setUserTokenAC} from "../../redux/auth-reducer";
import {NOTIFICATION_MESSAGES, setNotificationMessageAC} from "../../redux/notification-reducer";

export const Header = () => {
    const {isAuthorized} = useSelector((state: RootStateType) => state.auth)
    const dispatch = useDispatch()

    const logout = () => {
        saveTokenToLocalStorage("")
        dispatch(setUserTokenAC(""))
        dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.LOGOUT_SUCCESS, "info"))

    }

//----------------------------------------------------------------------------------------------------------------------

    return (
        <header className="container mb-5">
            <nav className="mx-auto h-20 bg-gb-dark-medium rounded-b-2xl flex items-center px-3">
                <ul className="text-gb-text flex items-center text-xl w-full">

                    <Logo/>

                    <li className="px-5"><Link to="/tasks" className="hover:text-gb-light">Tasks</Link></li>
                    <li className="px-5"><Link to="/new" className="hover:text-gb-light">New Task</Link></li>

                    {
                        isAuthorized ?
                            <Logout onClick={logout}/>
                            :
                            <Login/>
                    }

                </ul>
            </nav>
        </header>
    )
}

// Built-in components
//----------------------------------------------------------------------------------------------------------------------

const Logo = () => {
    return (
        <li className="mx-3">
            <Link to="/">
                <svg className="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0
                      001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42
                      3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438
                      0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0
                      010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                    </path>
                </svg>
            </Link>
        </li>
    )
}


const Logout = (props: {onClick: () => void}) => {
    return (
        <>
            <li className="px-5 ml-auto">
                [Logged as Admin]
            </li>
            <li className="px-5 ml-auto">
                <button className="flex items-center hover:text-gb-light"
                        onClick={props.onClick}>
                    Signout
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0
                          01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                        </path>
                    </svg>
                </button>
            </li>
        </>
    )
}

const Login = () => {
    return (
        <>
            <li className="px-3 ml-auto">
                <Link className="hover:text-gb-light flex items-center" to="/login">
                    Login
                    <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                        </path>
                    </svg>
                </Link>
            </li>
        </>
    )
}