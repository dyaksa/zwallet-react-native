import React from "react";
import { View } from "react-native"
import { IconButton } from "react-native-paper";

const IconMenu = (props) => {
    return (
        <View style={{justifyContent: "space-between", flexDirection: "row"}}>
            <IconButton icon="menu" color="#4D4B57" onPress={() => props.navigation.openDrawer()}/>
            <IconButton icon="bell" color="#4D4B57" onPress={() => props.navigation.navigate("Notification")}/>
        </View>
    )
}

export default IconMenu