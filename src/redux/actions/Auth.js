import http from "../../http-common";

const AuthRequest = () => {
    return {
        type: "AUTH_REQUEST"
    }
}

const AuthLoginSuccess = (data) => {
    return {
        type: "AUTH_SUCCESS",
        payload: data
    }
}

const AuthRequestError = (err) => {
    return {
        type: "REQUEST_ERROR",
        payload: err
    }
}

const AuthUserLogout = () => {
    return {
        type: "LOGOUT"
    }
}

const AuthLogin = (fields) => {
    return async (dispatch) => {
        try{
            dispatch(AuthRequest());
            const user = await http.post("/auth/login",fields);
            console.log(user.data.user.uuid);
            if(user.data){
                dispatch(AuthLoginSuccess(user.data));
            }
        }catch(err){
            dispatch(AuthRequestError(err.response.data.message));
        }
    }
}

export {AuthLogin, AuthUserLogout};