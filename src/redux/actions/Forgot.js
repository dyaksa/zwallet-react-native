import http from "../../http-common";

const Request = () => {
    return {
        type: "REQUEST_FORGOT"
    }
}

const NotFound = (error) => {
    return {
        type: "FORGOT_EMAIL_NOT_FOUND",
        payload: error
    }
}

const Founded = (token) => {
    return {
        type: "FORGOT_EMAIL_FOUNDED",
        payload: token
    }
}

const successUpdatePassword = () => {
    return {
        type: "SUCCESS_UPDATED_PASSWORD"
    }
}

const failedUpdatePassword = (err) => {
    return {
        type: "ERROR_UPDATED_PASSWORD",
        payload: err
    }
}

const setDefault = () => {
    return {
        type: "DEFAULT"
    }
}

const UpdatedPassword = (fields,token) => {
    return async (dispatch) => {
        try {
            dispatch(Request());
            const result = await http.patch("/auth/update",fields,{headers: {"x-access-token": token}});
            if(result.data.success){
                dispatch(successUpdatePassword());
                console.log("success");
            }
            
        }catch(err){
            dispatch(failedUpdatePassword(err.response.data.message));
        }
    }
}

const ForgotRequest = (fields) => {
    return async (dispatch) => {
        try {
            dispatch(Request());
            const results = await http.post("/auth/forgot",fields);
            dispatch(Founded(results.data.accessToken));
        }catch(err){
            dispatch(NotFound(err.response.data.message));
        }
    }
}

export {
    ForgotRequest,
    setDefault,
    UpdatedPassword
}