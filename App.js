import "react-native-gesture-handler";
import React from "react";
import MainNavigator from "./src/navigator";
import { Provider } from "react-redux";
import { PersistGate } from  "redux-persist/integration/react";
import configureStore from "./src/redux/store";

const App = () => {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <MainNavigator/>
      </PersistGate>
    </Provider>
  )
}

export default App;