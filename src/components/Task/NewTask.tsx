import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {createTasksTC, NewTaskDataType} from "../../redux/task-reducer"
import {RootStateType} from "../../redux/store"
import {Redirect} from "react-router-dom"


export const NewTask = () => {
    const {register, handleSubmit, errors} = useForm<NewTaskDataType>()
    const {notification} = useSelector((state: RootStateType) => state.notification)
    const dispatch = useDispatch()


    if (notification && notification.type === "info") {
        return <Redirect to="/tasks"/>
    }

    const onSubmit: SubmitHandler<NewTaskDataType> = data => {
        dispatch(createTasksTC(data.username, data.email, data.text))
    }

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header/>
            <section className="mx-auto bg-gb-dark-medium rounded-2xl py-10 text-gb-text text-xl">

                <div className="w-72 mx-auto">
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
                            <label className={`${errors.email ? "text-red-400" : "text-gb-text"} text-xl pl-3`}>
                                {(!errors.email) && "Email"}
                                {(errors.email && errors.email.type === "required") && errors.email.message}
                                {(errors.email && errors.email.type === "pattern") && errors.email.message}
                            </label>
                            <input name="email"
                                   ref={register({
                                       required: "Email is required",
                                       pattern: {value: EMAIL_REGEX, message: "Provide a valid email"}
                                   })}
                                   aria-invalid={errors.email ? "true" : "false"}
                                   className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                              bg-gb-dark-hard px-3 py-1 rounded-md"
                            />
                        </label>

                        <label className="block mt-7">
                            <label className={`${!errors.text ? "text-gb-text" : "text-red-400"} text-xl pl-3`}>
                                {(!errors.text) && "Task text"}
                                {(errors.text && errors.text.type === "required") && "Task text is required"}
                                {(errors.text && errors.text.type === "maxLength") && "Your input exceed max length"}
                            </label>
                            <textarea name="text"
                                      ref={register({required: true,  maxLength: 280})}
                                      aria-invalid={errors.text ? "true" : "false"}
                                      rows={10}
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
                                Create
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">

                </path>
            </svg>
            Create new task
        </h2>
    )
}