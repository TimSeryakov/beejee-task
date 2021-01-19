import React, {useCallback} from 'react'
import './TasksTable.css'
import {RootStateType} from "../../../redux/store";
import {useSelector} from 'react-redux';
import {SortDirectionType} from "../../../redux/app-reducer";


export const TasksTable = () => {
    const tasksSelector = useCallback((state: RootStateType) => state.tasks, [])
    const appSelector = useCallback((state: RootStateType) => state.app, [])
    const {tasksData, totalTasksQty} = useSelector(tasksSelector)
    const {sortBy, sortDirection} = useSelector(appSelector)

//----------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Header found={totalTasksQty}/>

            <section className="mx-auto bg-gb-dark-medium rounded-2xl py-5 text-gb-text text-xl">

                <table className="table-auto mx-auto">
                    <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            <SmartColumnHeader title="User" direction={sortDirection} showArrow={true} onClick={() => {}}/>
                        </th>
                        <th>
                            <SmartColumnHeader title="E-mail" direction={sortDirection} showArrow={false} onClick={() => {}}/>
                        </th>
                        <th>
                            <SmartColumnHeader title="Status" direction={sortDirection} showArrow={false} onClick={() => {}}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Intro to CSS</td>
                        <td>Adam</td>
                        <td>858</td>
                        <td>858</td>
                    </tr>
                    <tr>
                        <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design
                        </td>
                        <td>Adam</td>
                        <td>112</td>
                        <td>112</td>
                    </tr>
                    <tr>
                        <td>Intro to JavaScript</td>
                        <td>Chris</td>
                        <td>1,280</td>
                        <td>1,280</td>
                    </tr>
                    </tbody>
                </table>

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

const SmartColumnHeader = (props: SmartColumnHeaderPropsType) => {
    return (
        <span onClick={props.onClick} className={`p-1 cursor-pointer ${props.showArrow && "text-gb-light"}`}>
            {props.title}
            {props.showArrow && <Arrow direction={props.direction}/>}
        </span>
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