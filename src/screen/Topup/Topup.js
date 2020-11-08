import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconMenu from "../../components/IconMenu";

const Topup = (props) => {
    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <Text>Topup Page</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default Topup