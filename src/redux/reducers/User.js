const initialState = {
    loading: false,
    error: false,
    data: []
}

const User = (state = initialState, action = {}) => {
    switch(action.type){
        case "REQUEST_DATA":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_DATA_CATCH":
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case "FAILED_CATCH_DATA":
            return {
                ...state,
                loading: false,
                data: []
            }
        case "CLEAR":
            return {
                ...state,
                loading: false,
                error: false,
                data:[],
                _persist: {
                    rehydrated: true,
                    version: -1
                }
            }
        default: 
            return state
    }
}

export default User;