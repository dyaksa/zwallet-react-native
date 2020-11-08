import React from "react";
import { Title, IconButton } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View } from "react-native";


const Button = (props) => {

    const handlePress = () => {
        props.navigation.navigate(`${props.to}`)
    }
    return (
        <View>
            <TouchableOpacity onPress={handlePress} activeOpacity={props.opacity} style={Styles.button}>
                <Title style={Styles.button__title}>{props.title}</Title>
                <IconButton icon="arrow-right" color="#7E7D84"/>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    button__title: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#4D4B57"
    },

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
})

export default Button;