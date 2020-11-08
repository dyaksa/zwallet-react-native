import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {Text, Appbar, TextInput, Button, HelperText, Snackbar} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { REGEX_PHONE } from "../../utils/verify";
import { ErrorMessage } from "@hookform/error-message";
import {  updatedData } from "../../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";

const Phone = (props) => {
    const dispatch = useDispatch();
    const Auth = useSelector((s) => s.Auth);
    const { handleSubmit, control, errors } = useForm();
    const [visible, setVisible] = React.useState(false);

    const onSubmit = (result) => {
        dispatch(updatedData(result, Auth.data.accessToken));
        setVisible(!visible);
    }

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={Styles.contaniner}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Add Phone Number"/>
            </Appbar.Header>
            <View style={{padding: 10}}>
                <View style={{marginVertical: 10}}>
                    <Text style={{textAlign: "center", fontSize: 16, lineHeight: 27, color: "#7A7886"}}>
                        Add at least one phone number for the transfer ID so you can start transfering your money to another user.
                    </Text>
                </View>
                <View style={{marginVertical: 10}}>
                    <Controller
                        defaultValue=""
                        name="phone"
                        control={control}
                        rules={{
                            required: {value: true, message: "Phone is required"},
                            pattern: {value: REGEX_PHONE, message: "Invalid phone number"}
                        }}
                        render={(props) => (
                            <>
                            <TextInput 
                                error={errors.phone}
                                onChangeText={(value) => props.onChange(value)}
                                keyboardType="phone-pad" 
                                style={Styles.input} 
                                placeholder="Enter your phone number"
                                left={
                                    <TextInput.Icon name="phone" color="rgba(169, 169, 169, 0.6)"/>
                                }
                            />
                            <ErrorMessage
                                errors={errors}
                                name="phone"
                                render={({message}) => <HelperText type="error">{message}</HelperText> }
                            />
                            </>
                        )}
                    />
                </View>
                <View style={{marginVertical: 10}}>
                    <Button mode="contained" style={Styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text style={Styles.button__title}>
                            Submit
                        </Text>
                    </Button>
                </View>
            </View>
            <Snackbar 
                style={{backgroundColor: "#6379F4"}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: "Ok",
                    onPress: () => {
                        setVisible(false);
                    }
                }}
            >
                Success Update Phone Number
            </Snackbar>
        </View>
    )
}

const Styles = StyleSheet.create({
    contaniner: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
    },

    input : {
        backgroundColor: "transparent"
    },

    button : {
        padding: 10,
        backgroundColor: "#6379F4",
        borderRadius: 10
    },

    button__title: {
        fontSize: 14,
        color: "#fff"
    }
})

export default Phone