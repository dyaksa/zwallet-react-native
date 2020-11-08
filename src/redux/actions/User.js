import http from "../../http-common";

const Request = () => {
    return {
        type: "REQUEST"
    }
}

const Success = (data) => {
    return {
        type: "SUCCESS_PATCH",
        payload: data
    }
}

const Error = (data) => {
    return {
        type: "ERROR_PATCH",
        payload: data
    }
}

const End = () => {
    return {
        type: "END_REQUEST"
    }
}

const updatedData = (fields, token) => {
    return (dispatch) => {
        dispatch(Request());
        http.patch("/user",fields,{headers:{"x-access-token": token}})
        .then(res => {
            dispatch(Success(res.message))
        }).catch(err => {
            dispatch(Error(err.message));
        })
        dispatch(End());
    }
}


export {
    updatedData,
}