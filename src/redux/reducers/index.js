import { combineReducers } from "redux";
import Auth from "./Auth";
import Register from "./Register";
import User from "./User";

const reducers = combineReducers({
    Auth,
    Register,
    User
})

export default reducers;