import React from "react";
import { View, ScrollView, StyleSheet, Text, Dimensions } from "react-native";
import { Title, Headline, Subheading, TextInput, Button } from "react-native-paper";


const Email = (props) => {
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
                        placeholder="Enter your email"
                        returnKeyType="done"
                        left={
                            <TextInput.Icon name="email-outline" color="rgba(169, 169, 169, 0.6)" style={styles.input__icon}/>
                        }
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button onPress={() => props.navigation.navigate("ForgotPasswordScreen")} style={styles.button} mode="contained">Confirm</Button>
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
        backgroundColor: "transparent"
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

export default Email;