const initialState = {
    loading: false,
    error: false,
    token: null
}

const Payment = (state = initialState, action={}) => {
    switch(action.type){
        case 'REQUEST_PAYMENT':
            return {
                ...state,
                loading: true
            }
        case 'REQUEST_PAYMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                token: action.payload
            }
        case 'REQUEST_PAYMENT_FAILED':
            return {
                ...state,
                loading: false,
                error: true,
                token: null
            }
        default: 
            return state;
    }
}

export default Payment;