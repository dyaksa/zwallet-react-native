import { combineReducers } from "redux";
import Auth from "./Auth";
import Register from "./Register";
import Forgot from "./Forgot";
import Profile from "./Profile";
import Transaction from "./Transaction";

const reducers = combineReducers({
    Auth,
    Register,
    Forgot,
    Profile,
    Transaction
})

export default reducers;