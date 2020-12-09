const initialState = {
    loading: false,
    error: false,
    success: false,
    data: [],
    message: null
}

const User = (state = initialState, action = {}) => {
    switch(action.type){
        case "REQUEST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_REQUEST":
            return {
                ...state,
                success: true,
                loading: false,
                error: false,
                data: action.payload
            }
        case "ERROR_REQUEST":
            return {
                ...state,
                success: false,
                loading: false,
                error: true,
                message: action.payload
            }
        case "DEFAULT":
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
                data: []
            }
        default: 
            return state
    }
}

export default User;