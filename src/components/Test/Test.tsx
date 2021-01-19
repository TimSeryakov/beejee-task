import React from 'react'
import {AUTH_API, TASKS_API} from "../../api/api";

const go = () => {
    TASKS_API.getTasks().then(res => console.log(res))
}

const create = () => {
    TASKS_API.createTask("Jackie",
        "jackie@mail.com",
        "The ash of stellar alchemy extraplanetary brain is the seed of intelligence a very small stage in a vast cosmic arena light years finite but unbounded?")
        .then(res => console.log(res))
}

const login = () => {
    AUTH_API.login("admin", "123").then(res => console.log(res))
}


const edit = () => {
    TASKS_API.editTask(21954, 10, "Hearts of the stars tingling of the spine shores of the cosmic ocean tingling of the spine at the edge of forever the only home we've ever known. ").then(res => console.log(res))
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
            <button className="border-2 border-black m-5 rounded-md p-4"
                    onClick={edit}
            >
                edit
            </button>
        </>
    )
}