import React from 'react'
import {TasksTable} from "./TasksTable/TasksTable";
import {Paginator} from "./Paginator/Paginator";

export const TasksList = () => {
    return (
        <>
            <TasksTable/>
            <Paginator/>
        </>
    )
}