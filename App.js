import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import React, { useEffect } from "react";
import MainNavigator from "./src/navigator";
import { Provider } from "react-redux";
import { PersistGate } from  "redux-persist/integration/react";
import configureStore from "./src/redux/store";

const App = () => {
  const { store, persistor } = configureStore();

  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <MainNavigator/>
      </PersistGate>
    </Provider>
  )
}

export default App;