import React from "react"
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Text, Appbar, Button, Subheading, Snackbar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field"
import { useSelector } from "react-redux";
import http from "../../http-common";

const Pin = ({navigation}) => {
    const Auth = useSelector((s) => s.Auth);
    const [value, setValue] = React.useState("");
    const { handleSubmit, control, errors } = useForm();
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [visible, setVisible] = React.useState(false);

    const onSubmit = () => {
        const updated = async () => {
            try {
                await http.patch("/user",{pin: value},{headers: {'x-access-token': Auth.data.accessToken}});
                setVisible(!visible);
            }catch(err){
                throw err;
            }
        }
        updated();
    }

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => navigation.navigate("Profile")}/>
                <Appbar.Content title="Change Pin"/>
            </Appbar.Header>
            <View style={{padding: 15}}>
                <Subheading style={{color: "#7A7886"}}>
                    Enter your current 6 digits Zwallet PIN below to continue to the next steps.
                </Subheading>
                <SafeAreaView style={{marginVertical: 15}}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
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
                </SafeAreaView>
                <View style={{marginVertical: 10}}>
                    <Button onPress={onSubmit} mode="contained" style={{padding: 10, backgroundColor: "#6379F4", borderRadius: 10}}>
                        <Text style={{color: "#fff", fontWeight: "bold", fontSize: 16}}>Continue</Text>
                    </Button>
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
                Success Update Pin
            </Snackbar>
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