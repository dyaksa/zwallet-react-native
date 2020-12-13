import React from "react";
import { Title } from "react-native-paper";
import { View, Image } from "react-native";

const EmptyData = () => {
    return (
        <View style={{justifyContent: "center", flexDirection: "column", marginVertical: 150}}>
            <Image style={{height: 200, width: 200, alignSelf: "center", opacity: 0.5}} source={{uri: "https://res.cloudinary.com/dyaksaa/image/upload/v1607748262/Data_Not_Found_fu9mcg.ico"}}/>
            <Title style={{textAlign: "center", color:"#7A7A7A"}}>Data Not Found</Title>
        </View>
    )
}

export default EmptyData;