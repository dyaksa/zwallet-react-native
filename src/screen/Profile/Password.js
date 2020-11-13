import React, {useEffect} from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextInput, Button, Subheading, Appbar, Text, HelperText, Snackbar } from "react-native-paper";
import { PASS_REGEXP } from "../../utils/verify";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { updatedData } from "../../redux/actions/User";
import { useSelector, useDispatch } from "react-redux";

const Password = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const dispatch = useDispatch();
    const { control, handleSubmit, errors, watch, reset, formState: {isSubmitSuccessful} } = useForm();
    const [hidePassword, setHidePassword] = React.useState(true);
    const [visible,setVisible] = React.useState(false);
    const [submitedData, setSubmitedData] = React.useState({});


    const onSubmit = (result) => {
        const data = {
            password: result.newPassword
        }
        setSubmitedData(result);
        dispatch(updatedData(data, Auth.data.accessToken));
        setVisible(true);
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({...submitedData});
        }
    },[isSubmitSuccessful, submitedData, reset])

    const onHidePassword = () => {
        setHidePassword(!hidePassword);
    }

    const onDismissSnackBar = () => setVisible(!visible);

    return (
    <ScrollView keyboardShouldPersistTaps="always">
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.navigate("Profile")}/>
                <Appbar.Content title="Change Password"></Appbar.Content>
            </Appbar.Header>
            <View style={{padding: 15}}>
                <Subheading style={{color: "#7A7886"}}>You must enter your current password and then type your new password twice.</Subheading>
                <View style={{marginVertical: 10}}>
                    <Controller
                        defaultValue=""
                        name="password"
                        control={control}
                        rules={{
                            required: {value: true, message: "Password is required"},
                            pattern: {value : PASS_REGEXP, message: "Password must be character"},
                        }}
                        render={(props) => (
                            <>
                            <TextInput 
                            error={errors.password}
                            onChangeText={text => props.onChange(text)} 
                            underlineColor="rgba(169, 169, 169, 0.6)"
                            autoCapitalize="none" 
                            placeholder="Current Password" 
                            style={Styles.input} 
                            returnKeyType="next" 
                            secureTextEntry={hidePassword}
                            left={
                                <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                            }
                            right={
                                <TextInput.Icon onPress={onHidePassword} name={hidePassword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                            }/>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({message}) => <HelperText type="error">{message}</HelperText>}
                            />
                            </>
                        )}
                    />

                    <Controller
                        defaultValue=""
                        name="newPassword"
                        control={control}
                        rules={{
                            required: {value: true, message: "Password is required"},
                            pattern: {value: PASS_REGEXP, message: "Password must be character"}
                        }}
                        render={(props) => (
                            <>
                                <TextInput 
                                    error={errors.newPassword}
                                    onChangeText={text => props.onChange(text)} 
                                    underlineColor="rgba(169, 169, 169, 0.6)"
                                    autoCapitalize="none" 
                                    placeholder="New Password" 
                                    style={Styles.input} 
                                    returnKeyType="next"
                                    secureTextEntry={hidePassword}
                                    left={
                                        <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                                    }
                                    right={
                                        <TextInput.Icon onPress={onHidePassword} name={hidePassword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                                }/>
                                <ErrorMessage
                                    errors={errors}
                                    name="newPassword"
                                    render={({message}) => <HelperText type="error">{message}</HelperText>}
                                />
                            </>
                        )}
                    />

                    <Controller
                        defaultValue=""
                        name="repeatPassword"
                        control={control}
                        rules={{
                            required: {value: true, message: "Password is required"},
                            pattern: {value: PASS_REGEXP, message: "Password must be character"},
                            validate: value => value === watch("newPassword") || "The password do not match" 
                        }}
                        render={(props) => (
                            <>
                            <TextInput 
                                error={errors.repeatPassword}
                                onChangeText={text => props.onChange(text)} 
                                underlineColor="rgba(169, 169, 169, 0.6)"
                                autoCapitalize="none" 
                                placeholder="Repeat Password" 
                                style={Styles.input} 
                                returnKeyType="next"
                                secureTextEntry={hidePassword}
                                left={
                                    <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                                }
                                right={
                                    <TextInput.Icon onPress={onHidePassword} name={hidePassword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                            }/>
                            <ErrorMessage
                                errors={errors}
                                name="repeatPassword"
                                render={({message}) => <HelperText type="error">{message}</HelperText>}
                            />
                            </>
                        )}
                    />
                </View>
                <View>
                    <Button onPress={handleSubmit(onSubmit)} style={{backgroundColor: "#6379F4", padding: 10, borderRadius: 10}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", color: "#fff"}}>Change Password</Text>
                    </Button>
                </View>
            </View>
        </View>
        <Snackbar
                style={{backgroundColor: "#6379F4"}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: "Ok",
                    onPress: () => {
                        setVisible(false)
                    }
                }}
            >
                Passoword Updated Success
        </Snackbar>
    </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
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
    }
})
export default Password;