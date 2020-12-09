const initialState = {
    loading: false,
    error: false,
    data: [],
    message: null
}

const Profile = (state = initialState, action={}) => {
    switch(action.type){
        case 'REQUEST_PROFILE':
            return {
                ...state,
                loading: true
            }
        case 'REQUEST_PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload,
                messag: null
            }
        case 'REQUEST_PROFILE_ERROR':
            return {
                ...state,
                loading: false,
                data: [],
                error: true,
                message: action.payload
            }
        case 'DEFAULT':
            return {
                ...state,
                loading: false,
                data: [],
                error: false,
                message: null
            }
        default:
            return state;
    }
}

export default Profile;