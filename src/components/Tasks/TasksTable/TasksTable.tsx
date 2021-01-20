import React, {useCallback, useEffect} from 'react'
import './TasksTable.css'
import {RootStateType} from "../../../redux/store"
import {useDispatch, useSelector} from 'react-redux'
import {setSortByAC, SortDirectionType, toggleSortDirectionAC} from "../../../redux/app-reducer"
import {requestTasksDataTC, setCurrentPageAC} from "../../../redux/task-reducer"
import {Preloader} from "../../common/Preloader/Preloader"
import {Link} from 'react-router-dom'


export const TasksTable = () => {
    const tasksSelector = useCallback((state: RootStateType) => state.tasks, [])
    const appSelector = useCallback((state: RootStateType) => state.app, [])
    const authSelector = useCallback((state: RootStateType) => state.auth, [])
    const {tasksData, totalTasksQty, isLoaded, currentPage} = useSelector(tasksSelector)
    const {sortBy, sortDirection} = useSelector(appSelector)
    const {isAuthorized} = useSelector(authSelector)
    const dispatch = useDispatch()

    // Reset page to 1
    useEffect(() => {
        dispatch(setCurrentPageAC(1))
    }, [dispatch])

    useEffect(() => {
        dispatch(requestTasksDataTC())
    }, [dispatch, sortBy, sortDirection, currentPage])

    const setSortByName = () => {
        dispatch(setSortByAC("name"))
        dispatch(toggleSortDirectionAC())
    }
    const setSortByEmail = () => {
        dispatch(setSortByAC("email"))
        dispatch(toggleSortDirectionAC())

    }
    const setSortByStatus = () => {
        dispatch(setSortByAC("status"))
        dispatch(toggleSortDirectionAC())
    }

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header found={totalTasksQty}/>

            <section className="mx-auto bg-gb-dark-medium rounded-2xl py-5 text-gb-text text-xl">


                {isLoaded
                    ?
                    <table className="table-auto mx-auto">
                        <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                <SmartColumnHeader title="User"
                                                   direction={sortDirection}
                                                   showArrow={sortBy === "name"}
                                                   onClick={setSortByName}/>
                            </th>
                            <th>
                                <SmartColumnHeader title="E-mail"
                                                   direction={sortDirection}
                                                   showArrow={sortBy === "email"}
                                                   onClick={setSortByEmail}/>
                            </th>
                            <th>
                                <SmartColumnHeader title="Status"
                                                   direction={sortDirection}
                                                   showArrow={sortBy === "status"}
                                                   onClick={setSortByStatus}/>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            tasksData.map((task) => {
                                return <TableRow key={task.id}
                                                 id={task.id}
                                                 title={task.text}
                                                 userName={task.username}
                                                 email={task.email}
                                                 status={task.status}
                                                 isAdmin={isAuthorized}
                                />
                            })
                        }
                        </tbody>
                    </table>


                    :
                    <div className="h-96 py-72">
                        <Preloader message="Loading tasks..."/>
                    </div>

                }

            </section>
        </>
    )
}

// Built-in components
//----------------------------------------------------------------------------------------------------------------------

type SmartColumnHeaderPropsType = {
    title: string
    direction: SortDirectionType
    onClick: () => void
    showArrow: boolean
}
type TableRowPropsType = {
    id: number
    title: string
    userName: string
    email: string
    status: number
    isAdmin: boolean
}

const SmartColumnHeader = (props: SmartColumnHeaderPropsType) => {
    return (
        <span onClick={props.onClick}
              className={`p-1 cursor-pointer whitespace-nowrap ${props.showArrow && "text-gb-light"}`}>
            {props.title}
            {props.showArrow && <Arrow direction={props.direction}/>}
        </span>
    )
}

const TableRow = (props: TableRowPropsType) => {
    return (
        <tr>
            <td className="restricted relative">
                {props.title}
                {
                    props.title.slice(-1) === "᠎" &&
                    <span className="bg-blue-900 text-blue-500 text-xs px-3 py-1 rounded-br-md absolute top-0 left-0">
                        Edited
                    </span>
                }
            </td>
            <td>{props.userName}</td>
            <td>{props.email}</td>
            <td className="">
                {props.status === 10 ? <Done/> : <Active/>}
                <EditLink taskId={props.id} isAuthorized={props.isAdmin}/>
            </td>
        </tr>
    )
}


const Header = (props: { found: number }) => {
    return (
        <h2 className="text-gb-text text-3xl p-5 flex items-center">

            <svg className="w-10 h-10 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2
                      2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                </path>
            </svg>
            Tasks {!!props.found && `found: ${props.found}`}
        </h2>
    )
}

const Arrow = (props: { direction: SortDirectionType }) => {
    return (
        <>
            {
                props.direction === "desc"
                    ? // ↑ (up) arrow means -asc- sort direction
                    <svg className="w-6 h-6 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M8 7l4-4m0 0l4 4m-4-4v18">
                        </path>
                    </svg>
                    : // ↓ (down) arrow means -asc- sort direction
                    <svg className="w-6 h-6 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M16 17l-4 4m0 0l-4-4m4 4V3">
                        </path>
                    </svg>
            }
        </>
    )
}

const Done = () => {
    return (
        <>
            <span className="rounded-md px-3 py-2 text-sm bg-green-900 text-green-600 cursor-default">
                Done
            </span>
        </>
    )
}
const Active = () => {
    return (
        <>
            <span className="rounded-md px-3 py-2 text-sm bg-purple-900 text-purple-500 cursor-default">
                Active
            </span>
        </>
    )
}

const EditLink = (props: { taskId: number, isAuthorized: boolean }) => {
    if (props.isAuthorized) {
        return (
            <Link to={`/edit/${props.taskId}`}>
                <svg className="w-10 h-10 mt-5 mx-auto text-indigo-500 hover:opacity-70"
                     fill="none" stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                    </path>
                </svg>
            </Link>
        )
    }
    return null
}
