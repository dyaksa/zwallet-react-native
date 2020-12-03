const initialState = {
    loading: false,
    error: false,
    data: []
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
                data: action.payload
            }
        case 'REQUEST_PROFILE_ERROR':
            return {
                ...state,
                loading: false,
                data: [],
                error: true,
                message: action.payload
            }
    }
}

export default Profile;