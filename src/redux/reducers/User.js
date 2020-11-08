const initialState = {
    loading: false,
    error: false,
    success: false,
    data: []
}

const User = (state = initialState, action = {}) => {
    switch(action.type){
        case "REQUEST":
            return {
                ...state,
                loading: true
            }
        case "SUCCESS_PATCH":
            return {
                ...state,
                success: true,
                loading: false,
                data: action.payload
            }
        case "ERROR_PATCH":
            return {
                ...state,
                success: false,
                loading: false,
                data: action.payload
            }
        case "END_REQUEST":
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