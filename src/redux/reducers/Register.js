const initialState = {
    loading: false,
    error: false,
    success: false
}

const Register = (state = initialState, action={}) => {
    switch(action.type){
        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                success: true,
                error: false,
                loading: false
            }
        case "REGISTER_ERROR":
            return {
                ...state,
                loading: false,
                error: true,
                success: false,
            }
        case "BACK_LOGIN":
            return {
                ...state,
                loading: false,
                error: false,
                success: false
            }
        default: 
            return state
    }
}

export default Register;