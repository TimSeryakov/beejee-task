import {toast} from "react-toastify"
import {NotificationMessageType} from "../redux/notification-reducer"

export const makeToast = (messageText: string, messageType: NotificationMessageType) => {
    toast(messageText, {
        type: messageType,
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}