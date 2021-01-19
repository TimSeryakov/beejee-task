import React from 'react'
import {TasksTable} from "./TasksTable/TasksTable";
import {Paginator} from "./Paginator/Paginator";

export const Tasks = () => {
    return (
        <>
            <TasksTable/>
            <Paginator/>
        </>
    )
}