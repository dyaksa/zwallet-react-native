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
    setField
}