import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const WebViewUI  = (props) => {
    const { data } = useSelector((s) => s.Payment);
    const [load,setLoad] = useState(false);
    const webviewRef = React.useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            setLoad(true);
            return () => {
                setLoad(false)
            }
        },[load])
    )

    const onBack = () => {
        props.navigation.navigate("Dashboard");
    }

    const runFirst = `
        window.addEventListener('DOMContentLoaded',() => {
            document.body.style.backgroundColor = 'green';
        })
    `

    return (
        <SafeAreaView style={styles.flexContainer}>
            {(load) 
            ? (<WebView
                    source={{
                    html: `<body>
                    <div>
                        <button id='pay-button'>Pay Process</button>
                    </div>
                    <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-aQToZK3m3UkYMgjX"></script> 
                    <script type='text/javascript'>
                        document.getElemen
                    </script>
                    </body>`
                    }}
                    ref={webviewRef}
                    injectedJavaScript={runFirst}
                    onMessage={onBack}
                />) 
            : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    button: {
      fontSize: 24,
    },
    arrow: {
      color: '#ef4771',
    },
    icon: {
      width: 20,
      height: 20,
    },
  });

export {
   WebViewUI
};