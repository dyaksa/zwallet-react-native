import { combineReducers } from "redux";
import Auth from "./Auth";
import Register from "./Register";
// import User from "./User";
import Forgot from "./Forgot";
import Profile from "./Profile";

const reducers = combineReducers({
    Auth,
    Register,
    Forgot,
    Profile
})

export default reducers;