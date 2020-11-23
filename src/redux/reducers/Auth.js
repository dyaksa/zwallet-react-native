const initialState = {
    data:[],
    loading: false,
    error: false
}

const Auth = (state = initialState, action={}) => {
    switch(action.type){
        case "AUTH_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                loading: false,
                isLogin: true,
                error: false,
                data: action.payload
            }
        case "REQUEST_ERROR":
            return {
                ...state,
                isLogin: false,
                loading: false,
                error: true
            }
        case "LOGOUT":
            return {
                ...state,
                error: false,
                loading: false,
                isLogin: false,
                data: [],
                _persist: {
                  rehydrated: true,
                  version: -1
                }
            }
        default:
            return state
    }
}

export default Auth;