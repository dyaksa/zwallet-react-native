import http from "../../http-common";

const RequestDataCatch = () => {
    return {
        type: "REQUEST_DATA"
    }
}

const SuccessDataCatch = (data) => {
    return {
        type: "SUCCESS_DATA_CATCH",
        payload: data
    }
}

const FailedCatchData = () => {
    return {
        type: "FAILED_CATCH_DATA"
    }
}

const UserClear = () => {
    return {
        type: "CLEAR"
    }
}

const getuUserLogin = (token) => {
    return async (dispatch) => {
        try {
            dispatch(RequestDataCatch());
            const user = await http.get("/user/detail",{headers: {"x-access-token": token}});
            if(user.data){
                dispatch(SuccessDataCatch(user.data));
            }else{
                dispatch(FailedCatchData());
            }
        }catch(err){
            dispatch(FailedCatchData());
        }
    }
}

export {
    getuUserLogin,
    UserClear
}