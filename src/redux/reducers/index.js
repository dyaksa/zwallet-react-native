import { combineReducers } from "redux";
import Auth from "./Auth";

const reducers = combineReducers({
    Auth,
})

const rootReducers = (state, action) => {
    if(action.type == "USER_LOGOUT"){
        state = undefined;
    }
    return reducers(state, action)
}

export default rootReducers;