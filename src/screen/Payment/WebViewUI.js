import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setDefaultPayment } from "../../redux/actions/Payment";

const WebViewUI  = (props) => {
    const dispatch = useDispatch();
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

    const onBack = (data) => {
        // dispatch(setDefaultPayment());
        const { order_id } = JSON.parse(data.nativeEvent.data);
        console.log(JSON.parse(data.nativeEvent.data));
        props.navigation.navigate("Dashboard");
    }

    return (
        <SafeAreaView style={styles.flexContainer}>
            {(load) 
            ? (<WebView
                    automaticallyAdjustContentInsets={false}
                    source={{
                    html: `
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <script type="text/javascript"
                            src="https://app.sandbox.midtrans.com/snap/snap.js"
                            data-client-key="SB-Mid-client-aQToZK3m3UkYMgjX"></script>
                    </head>
                    <body>
                    <script type="text/javascript">
                    window.onload = () => {
                        snap.pay('${data.token}', {
                            onSuccess: function(result){
                                window.ReactNativeWebView.postMessage(JSON.stringify(result))
                            },
                            onPending: function(result){
                                window.ReactNativeWebView.postMessage(JSON.stringify(result))
                            },
                            onError: function(result){
                                window.ReactNativeWebView.postMessage(JSON.stringify(result))
                            }
                        });
                    }
                    </script> 
                    </body>`
                    }}
                    ref={webviewRef}
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