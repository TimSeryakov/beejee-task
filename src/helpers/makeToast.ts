import {toast} from "react-toastify"
import {NotificationMessageType} from "../redux/notification-reducer"

export const makeToast = (messageText: string, messageType: NotificationMessageType) => {
    toast(messageText, {
        type: messageType,
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}