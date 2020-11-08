const initialState = {
    loading: false,
    error: false,
    step : false,
    success: false
}

const Register = (state = initialState, action={}) => {
    switch(action.type){
        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "REGISTER_FILLED":
            return {
                ...state,
                fields: action.payload,
                step: true
            }
        case "PIN_FILLED":
            return {
                ...state,
                pin: action.payload,
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                step: false,
                success: true
            }
        case "REGISTER_ERROR":
            return {
                ...state,
                loading: false,
                error: true
            }
        case "USER_BACK":
            return {
                ...state,
                success: false
            }
        default: 
            return state
    }
}

export default Register;