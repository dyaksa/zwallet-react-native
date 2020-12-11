import http from "../../http-common";

const requestTransaction = () => {
    return {
        type: "REQUEST_TRANSACTION"
    }
}

const requestSuccess = (data) => {
    return {
        type: "REQUEST_SUCCESS",
        payload: data
    }
}

const requestError = () => {
    return {
        type: "REQUEST_ERROR"
    }
}

const setDefault = () => {
    return {
        type: "SET_DEFAULT"
    }
}

const setField = (data) => {
    return {
        type: "SET_FIELD_FILL",
        payload: data
    }
}

const transferSuccess = () => {
    return {
        type: "TRANSFER_SUCCESS"
    }
}

const transferFailed = () => {
    return {
        type: "TRANSFER_FAILED"
    }
}

const postTransfer = (id,field,token) => {
    return async (dispatch) => {
        try {
            dispatch(requestTransaction());
            await http.post(`/transfer/${id}`,field,{headers: {"x-access-token": token}});
            dispatch(transferSuccess());
        }catch(err){
            if(err){
                dispatch(transferFailed());
            }
        }
    }
}

const fetchReceiveTransaction = (id,token) => {
    return async (dispatch) => {
        try {
            dispatch(requestTransaction());
            const user = await http.get(`/user/${id}`,{headers: {"x-access-token": token}});
            dispatch(requestSuccess(user.data.data));
        }catch(err){
            dispatch(requestError());
        }
    }
}

export {
    fetchReceiveTransaction,
    setDefault,
    setField,
    postTransfer
}