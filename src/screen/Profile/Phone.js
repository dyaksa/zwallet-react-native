import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {Text, Appbar, TextInput, Button} from "react-native-paper";

const Phone = (props) => {
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
                    <TextInput 
                        keyboardType="phone-pad" 
                        style={Styles.input} 
                        placeholder="Enter your phone number"
                        left={
                            <TextInput.Icon name="phone" color="rgba(169, 169, 169, 0.6)"/>
                        }
                    />
                </View>
                <View style={{marginVertical: 10}}>
                    <Button mode="contained" style={Styles.button}>
                        <Text style={Styles.button__title}>
                            Submit
                        </Text>
                    </Button>
                </View>
            </View>
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