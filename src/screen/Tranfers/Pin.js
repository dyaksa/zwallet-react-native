import React from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Text, Button, Appbar, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { postTransfer } from "../../redux/actions/Transaction";
import _ from "lodash";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";

const Pin = ({navigation}) => {
    const dispatch = useDispatch();
    const Auth = useSelector((s) => s.Auth);
    const { data } = useSelector((s) => s.Profile);
    const { transfered, user, field } = useSelector((s) => s.Transaction);
    const { handleSubmit, control, errors } = useForm();
    const [value, setValue] = React.useState("");
    const [pin, setPin] = React.useState(null);
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useFocusEffect(
        React.useCallback(() => {
            if(transfered){
                return navigation.navigate("TransferSuccess");
            }
            if(!_.isEmpty(data)){
                setPin(data.pin);
            }
        },[transfered])
    )

    const onSubmit = () => {
        if(!_.isEmpty(user) && !_.isEmpty(field)){
            dispatch(postTransfer(user[0].id,field,Auth.data.accessToken));
        }
    }

    return (
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Enter Your Pin"/>
            </Appbar.Header>
            <View style={{padding: 15}}>
                <Text style={{color: "#7A7886",fontSize: 16, lineHeight: 27}}>Enter your 6 digits PIN for confirmation to continue transferring money.</Text>
            </View>
            <SafeAreaView style={{padding: 15}}>
                <Controller
                    defaultValue={value}
                    control={control}
                    name="pin"
                    rules={{
                        required: {value: true, message: "Pin cannot empty"},
                        validate: value => parseInt(value) == parseInt(pin) || "Pin not match"
                    }}
                    render={(props) => (
                        <>
                        <CodeField
                            ref={ref}
                            {...props}
                            onChangeText={(text) => props.onChange(text)}
                            cellCount={6}
                            rootStyle={Styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[Styles.cell, isFocused && Styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                            )}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="pin"
                            render={({message}) => <HelperText style={{textAlign: "center", marginTop: 15}} type="error">{message}</HelperText>}
                        />
                        </>
                    )}
                />
            </SafeAreaView>
            <View style={{padding: 15}}>
                <Button onPress={handleSubmit(onSubmit)} mode="contained" color="#6379F4" style={{padding: 10, borderRadius: 10}}>
                    <Text style={{color: "#fff"}}>Transfer Now</Text>
                </Button>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
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