import React, {useCallback, useEffect} from 'react'
import './TasksTable.css'
import {RootStateType} from "../../../redux/store";
import {useDispatch, useSelector} from 'react-redux';
import {setSortByAC, SortDirectionType, toggleSortDirectionAC} from "../../../redux/app-reducer";
import {requestTasksDataTC} from "../../../redux/task-reducer";
import {Preloader} from "../../common/Preloader/Preloader";


export const TasksTable = () => {
    const tasksSelector = useCallback((state: RootStateType) => state.tasks, [])
    const appSelector = useCallback((state: RootStateType) => state.app, [])
    const {tasksData, totalTasksQty, isLoaded, currentPage} = useSelector(tasksSelector)
    const {sortBy, sortDirection} = useSelector(appSelector)
    const dispatch = useDispatch()

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
                                                 title={task.text}
                                                 userName={task.username}
                                                 email={task.email}
                                                 status={task.status}
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
    title: string
    userName: string
    email: string
    status: number
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
            <td>{props.title}</td>
            <td>{props.userName}</td>
            <td>{props.email}</td>
            <td>{props.status === 10 ? <Done/> : <Active/>}</td>
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
                    <svg className="w-6 h-6 inline mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M8 7l4-4m0 0l4 4m-4-4v18">
                        </path>
                    </svg>
                    : // ↓ (down) arrow means -asc- sort direction
                    <svg className="w-6 h-6 inline mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
            <span className="rounded-md px-3 py-2 text-sm bg-green-900 text-green-600">
                Done
            </span>
        </>
    )
}
const Active = () => {
    return (
        <>
            <span className="rounded-md px-3 py-2 text-sm bg-purple-900 text-purple-500">
                Active
            </span>
        </>
    )
}