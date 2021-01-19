import React from 'react'
import {AUTH_API, TASKS_API} from "../../api/api";

const go = () => {
    TASKS_API.getTasks().then(res => console.log(res))
}

const create = () => {
    TASKS_API.createTask("tim", "zxc@zxc.zxc", "zxczxc").then(res => console.log(res))
}

const login = () => {
    AUTH_API.login("admin", "123").then(res => console.log(res))
}

export const Test = () => {
    return (
        <>
            <button className="border-2 border-black m-5 rounded-md p-4"
                    onClick={go}
            >
                go
            </button>

            <button className="border-2 border-black m-5 rounded-md p-4"
                    onClick={create}
            >
                create
            </button>

            <button className="border-2 border-black m-5 rounded-md p-4"
                    onClick={login}
            >
                login
            </button>
        </>
    )
}