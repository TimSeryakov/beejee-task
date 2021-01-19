import React, {useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import {editTasksTC} from "../../redux/task-reducer"
import {RootStateType} from "../../redux/store"
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom"
import {compose} from "redux"
import {NOTIFICATION_MESSAGES, setNotificationMessageAC} from "../../redux/notification-reducer"
import {statusCodeAsBoolean} from '../../helpers/statusCodeConverter'

type PathParamsType = {
    taskId: string
}

type EditTaskFormType = {
    username: string
    email: string
    text: string
    status: boolean
}

type EditTaskPropsType = RouteComponentProps<PathParamsType>

const EditTask = (props: EditTaskPropsType) => {

    const {register, handleSubmit, errors} = useForm<EditTaskFormType>()
    const {notification} = useSelector((state: RootStateType) => state.notification)
    const {isAuthorized} = useSelector((state: RootStateType) => state.auth)
    const {tasksData} = useSelector((state: RootStateType) => state.tasks)
    const dispatch = useDispatch()

    // Get task from -state- by -taskId- which we take from the -URL-
    let task = tasksData.find((task) => task.id === +props.match.params.taskId)
    if (!task) { // Anyway user will be redirected
        task = {id: 0, text: "", status: 0, email: "", username: ""}
    }

    // We may change -task status-
    const [taskDone, setTaskDone] = useState<boolean>(statusCodeAsBoolean(task.status))

    // We may change -task text-
    const [taskText, setTaskText] = useState<string>(task.text)


    const onSubmit: SubmitHandler<EditTaskFormType> = () => {
        // Add 'Mongolian Vowel Separator' ("᠎") at the line end (invisible symbol)
        // to know whether the task was edited (this field is not provided by the backend API)
        dispatch(editTasksTC(+props.match.params.taskId, taskDone, taskText + "᠎"))
    }

// Redirections
//----------------------------------------------------------------------------------------------------------------------

    if (notification && notification.type === "info") {
        return <Redirect to="/tasks"/>
    }

    if (task.id === 0) {
        dispatch(setNotificationMessageAC(NOTIFICATION_MESSAGES.TASK_ID_ERROR, "error"))
        return <Redirect to="/tasks"/>
    }

    if (!isAuthorized) {
        return <Redirect to="/login"/>
    }

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header/>
            <section className="mx-auto bg-gb-dark-medium rounded-2xl py-10 text-gb-text text-xl">

                <div className="w-full md:w-4/12 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className="block mt-5">
                            <label className={`text-gb-text text-xl pl-3 opacity-50`}>
                                Username
                            </label>
                            <input name="username"
                                   type="username"
                                   value={task.username}
                                   ref={register({required: true})}
                                   aria-invalid={errors.username ? "true" : "false"}
                                   className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                              bg-gb-dark-hard px-3 py-1 rounded-md opacity-50"
                                   disabled
                            />
                        </label>

                        <label className="block mt-7">
                            <label className={`text-gb-text text-xl pl-3 opacity-50`}>
                                Email
                            </label>
                            <input name="email"
                                   value={task.email}
                                   ref={register()}
                                   aria-invalid={errors.email ? "true" : "false"}
                                   className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                              bg-gb-dark-hard px-3 py-1 rounded-md opacity-50"
                                   disabled
                            />
                        </label>

                        <label className="block mt-7">
                            <label className={`text-gb-text text-xl pl-3`}>
                                Task text
                            </label>
                            <textarea name="text"
                                      value={taskText}
                                      rows={10}
                                      onChange={(e) => setTaskText(e.currentTarget.value)}
                                      ref={register({required: true,  maxLength: 280})}
                                      aria-invalid={errors.text ? "true" : "false"}
                                      className="form-input mt-1 block w-full border-2 border-gb-dark-soft focus:outline-none
                                                 bg-gb-dark-hard px-3 py-1 rounded-md"
                            />
                        </label>

                        <label className="block mt-7 text-center">
                            <input name="status"
                                   checked={taskDone}
                                   onChange={(e) => setTaskDone(e.currentTarget.checked)}
                                   type="checkbox"
                                   ref={register()}
                                   aria-invalid={errors.status ? "true" : "false"}
                            />

                            <label className={`mt-7 text-gb-text text-xl pl-3`}
                                    htmlFor="status"
                            >
                                Done
                            </label>

                        </label>

                        <div className="mt-10 flex">
                            <button
                                className="px-4 py-2 text-gb-light rounded-md bg-gb-text
                                           focus:outline-none focus:shadow-outline mx-auto
                                           hover:bg-theme-accent-alternative-hover
                                           hover:border-theme-accent-alternative opacity-70 hover:opacity-100"
                            >
                                Save
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828
                      2.828L11.828 15H9v-2.828l8.586-8.586z">
                </path>
            </svg>
            Edit task
        </h2>
    )
}

// Export
//----------------------------------------------------------------------------------------------------------------------

export default compose<React.ComponentType>(
    withRouter
)(EditTask)