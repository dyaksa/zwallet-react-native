const initialState = {
    loading: false,
    error: false,
    data: []
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
                data: action.payload
            }
        case 'REQUEST_PAYMENT_FAILED':
            return {
                ...state,
                loading: false,
                error: true,
                data: []
            }
        case 'SET_DEFAULT_PAYMENT':
            return {
                ...state,
                loading: false,
                error: false,
                data: [],
                _persist: {
                    rehydrated: true,
                    version: -1
                }
            }
        default: 
            return state;
    }
}

export default Payment;