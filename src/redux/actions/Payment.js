import http from "../../http-common";

const requestPayment = () => {
    return {
        type: 'REQUEST_PAYMENT'
    }
}

const requestPaymentTokenSuccess = (data) => {
    return {
        type: 'REQUEST_PAYMENT_SUCCESS',
        payload: data
    }
}

const requestPaymentTokenFail = () => {
    return {
        type: 'REQUEST_PAYMENT_FAILED'
    }
}

const setDefaultPayment = () => {
    return {
        type: 'SET_DEFAULT_PAYMENT'
    }
}

const postPaymentTopup = (amount, userToken) => {
    return async (dispatch) => {
        try {
            dispatch(requestPayment())
            const data = {amount: amount};
            const result = await http.post("/charge",data,{headers: { "x-access-token": userToken}});
            dispatch(requestPaymentTokenSuccess(result.data));
        }catch(err) {
            dispatch(requestPaymentTokenFail());
            console.log(err.request);
        }
    }
}

export {
    postPaymentTopup,
    setDefaultPayment
}