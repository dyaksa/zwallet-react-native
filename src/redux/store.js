import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk,logger));
    let persistor = persistStore(store);
    return {store, persistor};
}