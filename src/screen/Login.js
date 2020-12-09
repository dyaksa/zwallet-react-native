import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from "react-native";
import { Title, Button, TextInput, Headline, Subheading, Text, HelperText } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from "../redux/actions/Auth";
import FlashMessage from "../components/FlashMessage";
import { useFocusEffect } from "@react-navigation/native"
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

const Login = (props) => {
    const dispatch = useDispatch();
    const Auth = useSelector((s) => s.Auth);
    const [email,setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [hidePassword, setHidePassword] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const { handleSubmit, errors, control} = useForm();

    const onPressHidePassword = () => {
        (hidePassword) ? setHidePassword(false) : setHidePassword(true);
    }
    

    const onSubmit = (results) => {
        dispatch(AuthLogin(results));
    }

    return (
        <>
            <ScrollView style={Style.container} keyboardShouldPersistTaps="always">
                <View style={Style.title__container}>
                    <Title style={Style.title}>Zwallet</Title>
                </View>
                <View style={Style.row}>
                    <Headline style={Style.input__title}>Login</Headline>
                    <Subheading style={Style.input__desc}>Login to your existing account to access
                        all the features in Zwallet.</Subheading>
                    <Controller 
                        name="email"
                        defaultValue={email}
                        control={control}
                        rules={{
                            required : {value: true, message: "Email is required"}
                        }}
                        render={(props) => (
                            <>
                            <TextInput 
                            error={errors.email}
                            onChangeText={(value) => props.onChange(value)} 
                            underlineColor="rgba(169, 169, 169, 0.6)"
                            autoCapitalize="none" 
                            placeholder="Enter your e-mail" 
                            style={Style.input} 
                            returnKeyType="next"
                            left={
                                <TextInput.Icon icon="email-outline" color="rgba(169, 169, 169, 0.6)" style={Style.input__icon}/>
                            }/>
                            <ErrorMessage
                            name="email"
                            errors={errors}
                            render={({message}) => errors.email ? <HelperText type="error">{message}</HelperText> : null}
                            />
                            </>
                        )}
                    />
                    <Controller
                    name="password"
                    defaultValue={password}
                    control={control}
                    rules={{
                        required: {value: true, message: "Password is required"}
                    }}
                    render={(props) => (
                    <>
                    <TextInput 
                    error={errors.password}
                    onChangeText={value => props.onChange(value)} 
                    underlineColor="rgba(169, 169, 169, 0.6)"
                    autoCapitalize="none" 
                    placeholder="Enter your password" 
                    style={Style.input} 
                    returnKeyType="done" 
                    secureTextEntry={hidePassword}
                    left={
                        <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Style.input__icon}/>
                    }
                    right={
                        <TextInput.Icon onPress={onPressHidePassword} name={hidePassword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                    }/>
                    <ErrorMessage
                    name="password"
                    errors={errors}
                    render={({message}) => errors.password ? <HelperText type="error">{message}</HelperText> : null}
                    />
                    </>
                    )}
                    />
                        <TouchableOpacity onPress={() => props.navigation.navigate("ForgotEmailScreen")}>
                            <Text style={Style.input__forgot}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    <Button 
                        loading={Auth.loading}
                        onPress={handleSubmit(onSubmit)} 
                        mode="contained" 
                        style={Style.login__button}>
                        <Text style={{color: "#fff"}}>{(Auth.loading) ? "Loading" : "Login"}</Text>
                    </Button>
                    <Text style={{textAlign: "center", fontSize: 16, fontWeight: "normal", color: "rgba(58, 61, 66, 0.8)"}}>Don’t have an account? Let’s <Link style={{color: "#6379F4"}} to="/Signup">Sign up</Link></Text>
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
        color: "#6379F4",
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
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#6379F4"
    }
})

export default Login;