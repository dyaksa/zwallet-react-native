const initialState = {
    error: false,
    loading: false,
    token: null
}

const Forgot = (state = initialState, action={}) => {
    switch(action.type){
        case "REQUEST_FORGOT":
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default Forgot;