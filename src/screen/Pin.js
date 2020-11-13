import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView} from "react-native";
import { Title, Button, Headline, Subheading, Text } from "react-native-paper";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field"
import { useDispatch, useSelector } from "react-redux";
import { PinFilled, Registered } from "../redux/actions/Register";
import http from "../http-common";

const Pin = ({navigation}) => {
    const dispatch = useDispatch();
    const {step, fields, pin} = useSelector((s) => s.Register);
    const [value, setValue] = React.useState("");
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        if(!step){
            navigation.navigate("Signup");
        }
    },[]);

    const handleSubmit = () => {
        dispatch(PinFilled(value));
        const data = {...fields, pin:pin, balance: "0"};
        dispatch(Registered(data));
        navigation.navigate("Success");
    }

    return (
        <>
            <ScrollView style={Style.container} keyboardShouldPersistTaps="always">
                <View style={Style.title__container}>
                    <Title style={[Style.title, {color: "#6379F4", fontWeight: "bold"}]}>Zwallet</Title>
                </View>
                <View style={Style.row}>
                    <Headline style={Style.input__title}>Create Security Pin</Headline>
                    <Subheading style={Style.input__desc}>
                        Create a PIN that’s contain 6 digits number for security purpose in Zwallet.
                    </Subheading>
                    <SafeAreaView style={{marginVertical: 15}}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={6}
                            rootStyle={Style.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[Style.cell, isFocused && Style.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                            )}
                        />
                    </SafeAreaView>
                    <Button 
                        onPress={handleSubmit} 
                        mode="contained" 
                        style={Style.login__button}>
                        <Text style={{color: "#fff"}}>Confirm</Text>
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}

const Style = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "rgba(99, 121, 244, 0.2)"
    },

    row: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height,
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,
        padding: 20
    },

    title__container: {
        flex: 1,
        marginVertical: 50,
        alignItems: "center"
    },

    title: {
        textAlign:"center",
        fontSize: 26,
        fontWeight: "bold"
    },

    input: {
        marginVertical: 20,
        backgroundColor: "transparent",
        fontSize: 16,
        fontWeight: "normal",
        color: "#0000"
    },

    input__icon: {
        marginRight: 10,
    },

    input__title: {
        color: '#3A3D42', 
        fontSize: 24, 
        textAlign: "center", 
        fontWeight: "bold", 
        marginBottom:20
    },

    input__desc: {
        textAlign: "center", 
        color:"rgba(58, 61, 66, 0.6)", 
        fontSize:16, 
        lineHeight: 23
    },

    input__forgot: {
        textAlign:"right", 
        fontSize: 14, 
        color:"#3A3D42"
    },

    login__button: {
        marginVertical: 25, 
        fontSize: 18, 
        padding:10, 
        borderRadius: 15,
        backgroundColor: "#6379F4"
    },

    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 45,
        height: 50,
        borderRadius: 10,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: 'rgba(169, 169, 169, 0.6)',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#6379F4',
    },
})

export default Pin;