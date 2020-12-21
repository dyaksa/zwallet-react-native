import { combineReducers } from "redux";
import Auth from "./Auth";
import Register from "./Register";
import Forgot from "./Forgot";
import Profile from "./Profile";
import Transaction from "./Transaction";
import Notification from "./Notification";
import Payment from "./Payment";

const reducers = combineReducers({
    Auth,
    Register,
    Forgot,
    Profile,
    Transaction,
    Notification,
    Payment
})

export default reducers;