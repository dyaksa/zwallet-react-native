import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setDefaultPayment } from "../../redux/actions/Payment";
import axios from "axios";
import http from "../../http-common";

const WebViewUI  = (props) => {
    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.Payment);
    const Auth = useSelector((s) => s.Auth);
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

    const onBack = async (data) => {
        try{
            dispatch(setDefaultPayment());
            const { order_id } = JSON.parse(data.nativeEvent.data);
            const status = await axios.get(`https://api.sandbox.midtrans.com/v2/${order_id}/status`,{headers:{'Authorization': 'Basic U0ItTWlkLXNlcnZlci1HU1FXVThfclp2VVNnZ0VLUm5NbFNZUS0='}});
            if(status.data.transaction_status === "settlement"){
                dispatch(setDefaultPayment());
                const { gross_amount } = status.data;
                const updated = await http.patch(`/charge/accepted?gross_amount=${gross_amount}`,{},{headers:{
                    'x-access-token': Auth.data.accessToken
                }});
                if(updated.data.success){
                    alert("Successfully topup");
                    props.navigation.navigate("Dashboard");
                }else{
                    alert("Failed topup");
                    props.navigation.navigate("Dashboard");
                }
            }else{
                alert("Topup pending. please completed topup");
                props.navigation.navigate("Dashboard");
            }
        }catch(err){
            alert("Error Transaction");
            props.navigation.navigate("Dashboard");
        }
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