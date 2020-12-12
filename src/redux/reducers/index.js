import { combineReducers } from "redux";
import Auth from "./Auth";
import Register from "./Register";
import Forgot from "./Forgot";
import Profile from "./Profile";
import Transaction from "./Transaction";
import Notification from "./Notification";

const reducers = combineReducers({
    Auth,
    Register,
    Forgot,
    Profile,
    Transaction,
    Notification
})

export default reducers;