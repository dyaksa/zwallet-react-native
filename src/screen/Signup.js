import React from "react";
import { View, StyleSheet, ScrollView, Dimensions} from "react-native";
import { Title, Button, TextInput, Headline, Subheading, Text, IconButton, HelperText } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";


const Signup = (props) => {
    const { register, handleSubmit, control, errors } = useForm();
    const [hidePassword, setHidePassword] = React.useState(true);

    const onPressHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    const onSubmit = (result) => {
        console.log(result)
    }

    console.log(errors.firstName);
    return (
        <>
            <ScrollView style={Style.container} keyboardShouldPersistTaps="always">
                <View style={Style.title__container}>
                    <Title style={Style.title}>Zwallet</Title>
                </View>
                <View style={Style.row}>
                    <Headline style={Style.input__title}>Sign Up</Headline>
                    <Subheading style={Style.input__desc}>Create your account to access Zwallet.</Subheading>
                    <Controller
                        defaultValue=""
                        name="firstName"
                        control={control}
                        rules={{
                            required: {value: true, message: "Firstname is required"},
                            pattern: {value: /^[A-Za-z]+$/i,  message: "Firstname must be a letter"}
                        }}
                        render={(props) => (
                            <>
                            <TextInput 
                                {...props}
                                error={errors.firstName}
                                onChangeText={(value) => props.onChange(value)}  
                                autoCapitalize="none" 
                                placeholder="Enter your name" 
                                style={Style.input} 
                                returnKeyType="next"
                                left={
                                    <TextInput.Icon icon="account-outline" color="rgba(169, 169, 169, 0.6)" style={Style.input__icon}/>
                            }/>
                                <HelperText type="error" visible={errors.firstName}>

                                </HelperText>
                            </>
                        )}
                    />
                    {/* <TextInput 
                        onChangeText={text => setEmail(text)} 
                        value={email} 
                        autoCapitalize="none" 
                        placeholder="Enter your e-mail" 
                        style={Style.input} 
                        returnKeyType="next"
                        left={
                            <TextInput.Icon icon="email-outline" color="rgba(169, 169, 169, 0.6)" style={Style.input__icon}/>
                        }/>
                    <TextInput 
                        onChangeText={text => setPassword(text)} 
                        value={password} 
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
                        }/> */}
                    <Button 
                        onPress={handleSubmit(onSubmit)} 
                        mode="contained" 
                        style={Style.login__button}>
                        <Text style={{color: "#fff"}}>Sign Up</Text>
                    </Button>
                    <Text style={{textAlign: "center", fontSize: 16, fontWeight: "normal", color: "rgba(58, 61, 66, 0.8)"}}>Already have an account? Let’s <Link style={{color: "#6379F4"}} to="/Login">Login</Link></Text>
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
        color: "#000",
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

    login__button: {
        marginVertical: 25, 
        fontSize: 18, 
        padding:10, 
        borderRadius: 15,
        backgroundColor: "#6379F4"
    }
})

export default Signup;