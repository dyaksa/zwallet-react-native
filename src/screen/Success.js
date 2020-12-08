import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView} from "react-native";
import { Title, Button, Headline, Subheading, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BackToLogin } from "../redux/actions/Register";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Success = (props) => {
    const dispatch = useDispatch();
    const {success} = useSelector((s) => s.Register);
    
    useFocusEffect(
        React.useCallback(() => {
            return () => dispatch(BackToLogin());
        },[success])
    )
    const handleSubmit = () => {
        props.navigation.navigate("Login");
    }

    return (
        <>
            <ScrollView style={Style.container} keyboardShouldPersistTaps="always">
                <View style={Style.title__container}>
                    <Title style={[Style.title, {color: "#6379F4", fontWeight: "bold"}]}>Zwallet</Title>
                </View>
                <View style={Style.row}>
                    <Icon name="check-circle" size={100} color="#1EC15F" style={{textAlign: "center", marginVertical: 20}}/>
                    <Headline style={Style.input__title}>Pin Successfull Created</Headline>
                    <Subheading style={Style.input__desc}>
                        Create a PIN that’s contain 6 digits number for security purpose in Zwallet.
                    </Subheading>
                    <Button 
                        onPress={handleSubmit} 
                        mode="contained" 
                        style={Style.login__button}>
                        <Text style={{color: "#fff"}}>Login Now</Text>
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
        padding: 20,
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
    }
})

export default Success;