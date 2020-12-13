import http from "../../http-common";

const requestNotification = () => {
    return {
        type: "REQUEST_NOTIFICATION"
    }
}

const requestNotificationSuccess = (data) => {
    return {
        type: "REQUEST_NOTIFICATION_SUCCESS",
        payload: data
    }
}

const requestNotificationFailed = () => {
    return {
        type: "REQUEST_NOTIFICATION_ERROR"
    }
}

const setDefaultNotification = () => {
    return {
        type: "SET_DEFAULT"
    }
}

const getNotificationData = (token) => {
    return async (dispatch) => {
        try {
            dispatch(requestNotification());
            const notification = await http.get("/transfer/today",{headers: {"x-access-token": token}});
            dispatch(requestNotificationSuccess(notification.data.data));
        }catch(err){
            dispatch(requestNotificationFailed());
        }
    }
}

export {
    getNotificationData,
    setDefaultNotification,
}