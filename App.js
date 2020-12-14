import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import React, { useEffect } from "react";
import MainNavigator from "./src/navigator";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { PersistGate } from  "redux-persist/integration/react";
import configureStore from "./src/redux/store";
import OneSignal from "react-native-onesignal";

const App = () => {
  const { store, persistor } = configureStore();

  useEffect(() => {
    OneSignal.init("c81aa671-9974-47dc-a7c5-53d5253d42f4", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    SplashScreen.hide();

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  },[OneSignal]);

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      placeholder: "rgba(169, 169, 169, 0.8)",
      text: "#3A3D42"
    }
  }

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
            <MainNavigator/>
        </PersistGate>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App;