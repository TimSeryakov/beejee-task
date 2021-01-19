import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {Redirect} from "react-router-dom"
import {loginTC} from "../../redux/auth-reducer";

export type LoginFormData = {
    username: string
    password: string
}

export const Login = () => {
    const {register, handleSubmit, errors} = useForm<LoginFormData>()
    const {isAuthorized} = useSelector((state: RootStateType) => state.auth)
    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<LoginFormData> = data => {
        dispatch(loginTC(data.username, data.password))
    }

    if (isAuthorized) {
        return <Redirect to="/tasks"/>
    }


//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header/>

            <section className="mx-auto bg-gb-dark-medium rounded-2xl py-10 text-gb-text text-xl">
                <div className="w-56 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="block mt-5">
                            <label className={`${!errors.username ? "text-gb-text" : "text-red-400"} text-xl pl-3`}>
                                {!errors.username ? "Username" : "Username is required"}
                            </label>
                            <input name="username"
                                   type="username"
                                   ref={register({required: true})}
                                   aria-invalid={errors.username ? "true" : "false"}
                                   className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                              bg-gb-dark-hard px-3 py-1 rounded-md"
                            />
                        </label>

                        <label className="block mt-7">
                            <label className={`${errors.password ? "text-red-400" : "text-gb-text"} text-xl pl-3`}>
                                {(!errors.password) && "Password"}
                                {(errors.password && errors.password.type === "required") && errors.password.message}
                            </label>
                            <input name="password"
                                   type="password"
                                   ref={register({
                                       required: "Password is required"
                                   })}
                                   aria-invalid={errors.password ? "true" : "false"}
                                   className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                              bg-gb-dark-hard px-3 py-1 rounded-md"
                            />
                        </label>

                        <div className="mt-10 flex">
                            <button
                                className="px-4 py-2 text-gb-light rounded-md bg-gb-text
                                           focus:outline-none focus:shadow-outline mx-auto
                                           hover:bg-theme-accent-alternative-hover
                                           hover:border-theme-accent-alternative opacity-70 hover:opacity-100"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

// Built-in components
//----------------------------------------------------------------------------------------------------------------------

const Header = () => {
    return (
        <h2 className="text-gb-text text-3xl p-5 flex items-center">
            <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                </path>
            </svg>
            Login
        </h2>
    )
}