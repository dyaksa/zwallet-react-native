import React, { useEffect, useState } from "react";
import FlashMessage from "../../components/FlashMessage";
import { View, ScrollView, StyleSheet, Text, Dimensions } from "react-native";
import { Title, Headline, Subheading, TextInput, Button, HelperText} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { EMAIL_REGEXP } from "../../utils/verify";
import { useSelector, useDispatch } from "react-redux";
import { ForgotRequest } from "../../redux/actions/Forgot";
import { useFocusEffect } from "@react-navigation/native";


const Email = (props) => {
    const dispatch = useDispatch();
    const { token, loading, message, error } = useSelector((s) => s.Forgot);
    const { handleSubmit, errors, control } = useForm();
    const [email,setEmail] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(token){
            props.navigation.navigate("ForgotPasswordScreen");
        }
    },[token])

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setEmail("");
            }
        },[email])
    )


    const onSubmit = (results) => {
        console.log(results);
        dispatch(ForgotRequest(results));
        if(error){
            setVisible(true);
            setTimeout(() => {
                setVisible(false)
            },2000);
        }
    }

    return (
        <>
        {visible ? <FlashMessage message={message}/>  : null}
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
            <View style={styles.title__container}>
                <Title style={styles.title}>Zwallet</Title>
            </View>
            <View style={styles.row}>
                <Headline style={{fontSize: 24,fontWeight: "bold", color: "#3A3D42", textAlign: "center"}}>Reset Password</Headline>
                <Subheading style={{textAlign: "center", color: "rgba(58, 61, 66, 0.6)", lineHeight: 23, marginBottom: 50, marginTop: 20}}>
                    Enter your Zwallet e-mail so we can send you a password reset link.
                </Subheading>
                <View style={{flex: 1}}>
                    <Controller
                        defaultValue={email}
                        control={control}
                        name="email"
                        rules={{
                            required : {value: true, message: "Email can not be empty"},
                            pattern: {value: EMAIL_REGEXP, message: "Email is not valid"},
                        }}
                        render={(props) => (
                            <>
                                <TextInput
                                    mode="flat"
                                    error={errors.email}
                                    onChangeText={(value) => props.onChange(value)}
                                    style={styles.text__input}
                                    autoCapitalize="none"
                                    placeholder="Enter your email"
                                    returnKeyType="done"
                                    left={
                                        <TextInput.Icon name="email-outline" color="rgba(169, 169, 169, 0.6)" style={styles.input__icon}/>
                                    }
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({message}) => <HelperText type="error">{message}</HelperText>}
                                />
                            </>
                        )}
                    />
                </View>
                <View style={{flex: 1}}>
                    {loading 
                    ? (<Button 
                        loading={true}
                        disabled={true}
                        style={styles.button} mode="contained">Confirm</Button>) 
                    : (<Button 
                        onPress={handleSubmit(onSubmit)} 
                        style={styles.button} mode="contained">Confirm</Button>)}
                </View>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: Dimensions.get("window").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "rgba(99, 121, 244, 0.2)"
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
        fontWeight: "bold",
    },
    row: {
        flex: 1,
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "#fff",
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,
        padding: 20
    },
    text__input: {
        backgroundColor: "transparent"
    },
    input__icon: {
        marginRight: 10
    },
    button: {
        backgroundColor: "#6379F4",
        padding: 10,
        borderRadius: 10
    }, 
})

export default Email;