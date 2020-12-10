import http from "../../http-common";

const Requested = () => {
    return {
        type: "REQUEST_PROFILE"
    }
}

const RequestSuccess = (data) => {
    return {
        type: "REQUEST_PROFILE_SUCCESS",
        payload: data
    }
}

const RequestError = (err) => {
    return {
        type: "REQUEST_PROFILE_ERROR",
        payload: err
    }
}

const SetDefault = () => {
    return {
        type: "DEFAULT"
    }
}

const getProfile = (token) => {
    return async (dispatch) => {
        try {
            dispatch(Requested());
            const user = await http.get("/user/auth/detail",{headers: {"x-access-token": token}}); 
            dispatch(RequestSuccess(user.data.data[0]));
        }catch(err){
            dispatch(RequestError(err.request.data.message));
        }
    }
}

export {
    getProfile,
    SetDefault
}