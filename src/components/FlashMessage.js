import React from "react";
import {View, Text, StyleSheet} from "react-native";

const FlashMessage = (props) => {
    return (
        <View style={styles.flashMessage}>
            <Text style={{color: "#fff"}}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    flashMessage: {
        position: "absolute",
        backgroundColor:'#C70039', 
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center',           
        height:40, 
        top:0
    }
})

export default FlashMessage;