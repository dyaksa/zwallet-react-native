import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

const WebViewUI  = (props) => {
    const webviewRef = React.useRef(null);

    const onBack = () => {
        props.navigation.navigate("Dashboard");
    }

    return (
        <SafeAreaView>
            <WebView
                ref={webviewRef}
            />
        </SafeAreaView>
    )
}

export {
   WebViewUI
};