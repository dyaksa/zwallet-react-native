import http from "../../http-common";

const RegisterRequest = () => {
    return {
        type: "REGISTER_REQUEST"
    }
}

const RegisterFilled = (data) => {
    return {
        type: "REGISTER_FILLED",
        payload: data
    }
}

const PinFilled = (pin) => {
    return {
        type: "PIN_FILLED",
        payload: pin
    }
}

const RegisterSuccess = () => {
    return {
        type: "REGISTER_SUCCESS",
    }
}

const RegisterError = () => {
    return {
        type: "REGISTER_ERROR"
    }
}

const onBack = () => {
    return {
        type: "USER_BACK"
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
    RegisterFilled,
    PinFilled,
    Registered, 
    onBack
}