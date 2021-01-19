import axios from "axios"
import {SortByType, SortDirectionType} from "../redux/app-reducer"
import {TaskStatusType} from "../redux/task-reducer"
import {md5} from 'pure-md5'
import {encode} from 'uri-utils'

const developer = "tim"

// ---------------------------------------------------------------------------------------------------------------------
// AXIOS API
// ---------------------------------------------------------------------------------------------------------------------

const UXAPI = axios.create({
    baseURL: `https://uxcandy.com/~shapoval/test-task-backend/v2/`,
    headers: {
        'content-type': 'application/json'
    },
})


// ---------------------------------------------------------------------------------------------------------------------
// TASKS API
// ---------------------------------------------------------------------------------------------------------------------

export const TASKS_API = {
    getTasks(page: number = 1, sortBy: SortByType = "name", sortDirection: SortDirectionType = "asc") {
        const endPoint = `?developer=${developer}&page=${page}&sort_field=${sortBy}&sort_direction=${sortDirection}`

        return UXAPI.get(endPoint).then(res => res)
    },

    // TODO Зарефакторить на объект?
    createTask(username: string, email: string, text: string) {
        const endPoint = `create?developer=${developer}`

        const data = new FormData()
        data.append('username', username)
        data.append('email', email)
        data.append('text', text)
        data.append('mimeType', 'multipart/form-data')

        return UXAPI.post(endPoint, data)
            .then(res => res)

    },

    editTask(id: number, status: TaskStatusType, text: string) {
        const endPoint = `edit/${id}?developer=${developer}`
        const signature = md5(`status=${status}&text=${encode(text)}&token=beejee`)

        const data = new FormData()
        data.append("status", status.toString())
        data.append("text", text)
        data.append("token", "beejee")
        data.append("signature", signature)
        data.append("mimeType", "multipart/form-data")

        return UXAPI.post(endPoint, data)
            .then(res => res)
    }
}

export const AUTH_API = {
    login(userName: string, password: string) {
        const endPoint = `login?developer=${developer}`

        const data = new FormData();
        data.append("username", userName);
        data.append("password", password);

        return UXAPI.post(endPoint, data)
            .then(res => res)
    }


//     if (login.status === 'ok') {
//     authDispatch({ type: 'LOGIN', user: userName, token: login.message.token });
//     props.history.push('/');
// } else {
//     setAlert('Неправильные реквизиты доступа!');
//     setDisabled(false);
// }
// }

}

