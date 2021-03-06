const initialState = {
    loading: false,
    error: false,
    success: false,
    data: []
}

const Notification = (state = initialState, action={}) => {
    switch(action.type){
        case "REQUEST_NOTIFICATION":
            return {
                ...state,
                loading: true,
            }
        case "REQUEST_NOTIFICATION_SUCCESS":
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: action.payload
            }
        case "REQUEST_NOTIFICATION_ERROR":
            return {
                ...state,
                loading: false,
                success: false,
                error: true, 
                data: []
            }
        case "SET_DEFAULT":
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
                data: [],
                _persist: {
                    rehydrated: true,
                    version: -1
                }
            }
        default:
            return state;
    }
}

export default Notification;