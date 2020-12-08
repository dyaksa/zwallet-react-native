import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, Dimensions } from "react-native";
import { Title, Headline, Subheading, TextInput, Button } from "react-native-paper";


const Password = (props) => {
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPasword, setSecureConfirmPassword ] = useState(true);

    return (
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
                    <TextInput
                        mode="flat"
                        style={styles.text__input}
                        placeholder="Create new Password"
                        returnKeyType="next"
                        secureTextEntry={securePassword}
                        left={
                            <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={styles.input__icon}/>
                        }
                        right={
                            <TextInput.Icon onPress={() => setSecurePassword(!securePassword)} name={securePassword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                        }
                    />
                    <TextInput
                        mode="flat"
                        style={styles.text__input}
                        placeholder="Confirm new password"
                        returnKeyType="done"
                        secureTextEntry={secureConfirmPasword}
                        left={
                            <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={styles.input__icon}/>
                        }
                        right={
                            <TextInput.Icon onPress={() => setSecureConfirmPassword(!secureConfirmPasword)} name={secureConfirmPasword ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                        }
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button style={styles.button} mode="contained">Reset Password</Button>
                </View>
            </View>
        </ScrollView>
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
        backgroundColor: "transparent",
        marginBottom: 30
    },
    input__icon: {
        marginRight: 10
    },
    button: {
        backgroundColor: "#6379F4",
        padding: 10,
        borderRadius: 10
    }
})

export default Password;