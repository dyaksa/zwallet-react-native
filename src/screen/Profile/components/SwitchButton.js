import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Title, Switch } from "react-native-paper";

const SwitchButton = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={1} style={Styles.button}>
                <Title style={Styles.button__title}>Notification</Title>
                <Switch color="#6379F4" onValueChange={onToggleSwitch} value={isSwitchOn} style={{padding: 10}}/>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    button: {
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#E5E8ED", 
        borderRadius: 10, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },

    button__title: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#4D4B57"
    }
})

export default SwitchButton