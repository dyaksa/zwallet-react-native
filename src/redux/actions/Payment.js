import http from "../../http-common";

const requestPayment = () => {
    return {
        type: 'REQUEST_PAYMENT'
    }
}

const requestPaymentTokenSuccess = (token) => {
    return {
        type: 'REQUEST_PAYMENT_SUCCESS',
        paylod: token
    }
}

const requestPaymentTokenFail = () => {
    return {
        type: 'REQUEST_PAYMENT_FAILED'
    }
}

const postPaymentTopup = (amount, userToken) => {
    return async (dispatch) => {
        try {
            dispatch(requestPayment())
            const data = {amount: amount};
            const result = await http.post("/charge",data,{headers: { "x-access-token": userToken}});
            console.log(result.data.token);
            dispatch(requestPaymentTokenSuccess(result.data.token));
        }catch(err) {
            dispatch(requestPaymentTokenFail());
            console.log(err.request);
        }
    }
}

export {
    postPaymentTopup
}