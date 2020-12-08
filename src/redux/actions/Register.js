import http from "../../http-common";

const RegisterRequest = () => {
    return {
        type: "REGISTER_REQUEST"
    }
}


const RegisterSuccess = () => {
    return {
        type: "REGISTER_SUCCESS",
    }
}

const RegisterError = () => {
    return {
        type: "REGISTER_ERROR",
    }
}

const BackToLogin = () => {
    return {
        type: "BACK_LOGIN"
    }
}

const Registered = (fields) => {
    return async (dispatch) => {
        try {
            dispatch(RegisterRequest());
            await http.post("/auth/register", fields);
            dispatch(RegisterSuccess());
        }catch(err){
            dispatch(RegisterError());
        }
    }
}

export {
    Registered, 
    BackToLogin
}