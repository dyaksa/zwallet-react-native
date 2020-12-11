const initialState = {
    loading: false,
    success: false,
    transfered: false,
    user: [],
    error: false,
    field: []
}

const Transaction = (state = initialState, action={}) => {
    switch(action.type){
        case "REQUEST_TRANSACTION":
            return {
                ...state,
                loading: true
            }
        case "REQUEST_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                user: action.payload
            }
        case "REQUEST_ERROR":
            return {
                ...state,
                loading: false,
                error: true,
                success: false,
                user: []
            }
        case "SET_FIELD_FILL":
            return {
                ...state,
                success: true,
                field: action.payload
            }
        case "TRANSFER_SUCCESS":
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                transfered: true,
            }
        case "TRANSFER_FAILED":
            return {
                ...state,
                loading: false,
                error: true,
                success: false,
                transfered: false
            }
        case "SET_DEFAULT":
            return {
                ...state,
                loading: false,
                success: false,
                user: [],
                field: [],
                error: false,
                transfered: false,
                _persist: {
                    rehydrated: true,
                    version: -1
                }
            }
        default:
            return state;
    }
}

export default Transaction;