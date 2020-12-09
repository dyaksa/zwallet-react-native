const initialState = {
    error: false,
    loading: false,
    token: null,
    message: null,
    success: false
}

const Forgot = (state = initialState, action={}) => {
    switch(action.type){
        case "REQUEST_FORGOT":
            return {
                ...state,
                loading: true
            }
        case "FORGOT_EMAIL_FOUNDED":
            return {
                ...state,
                loading: false,
                error: false,
                token: action.payload
            }
        case "SUCCESS_UPDATED_PASSWORD":
            return {
                ...state,
                loading: false,
                error: false,
                token: null,
                message: null,
                success: true
            }
        case "ERROR_UPDATED_PASSWORD":
            return {
                ...state,
                loading: false,
                error: true,
                token: null,
                message: action.payload
            }
        case "FORGOT_EMAIL_NOT_FOUND":
            return {
                ...state,
                loading: false,
                token: null,
                error: true,
                message: action.payload
            }
        case "DEFAULT":
            return {
                ...state,
                loading: false,
                error: false,
                token: null,
                message: null
            }
        default:
            return state;
    }
}

export default Forgot;