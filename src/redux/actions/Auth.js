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

const AuthRequestError = () => {
    return {
        type: "REQUEST_ERROR"
    }
}

const AuthUserLogout = () => {
    return {
        type: "USER_LOGOUT"
    }
}

const AuthLogin = (fields) => {
    return async (dispatch) => {
        try{
            dispatch(AuthRequest());
            const user = await http.post("/auth/login",fields);
            if(user.data){
                dispatch(AuthLoginSuccess(user.data));
            }else{
                dispatch(AuthRequestError());
            }
        }catch(err){
            dispatch(AuthRequestError());
        }
    }
}

const AuthLogout = () => {
    return (dispatch) => {
        dispatch(AuthUserLogout());
    }
}

export {AuthLogin, AuthLogout};