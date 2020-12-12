import React from "react";
import { View } from "react-native";
import { Card, Title, Subheading } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const NotificationCard = () => {
    return (
        <Card style={{marginHorizontal: 10, marginVertical: 10}}> 
            <Card.Content style={{justifyContent: "space-around", flexDirection: "row", alignItems: "center"}}>
                <Icons name="arrow-up" style={{fontSize: 30, color: "#4CEDB3"}}/>
                <View>
                    <Title style={{fontSize: 14, color: "#7A7A7A"}}>Transfered from Joshua Lee</Title>
                    <Subheading style={{fontSize: 18, color: "#43484F", fontWeight: "bold"}}>Rp220.000</Subheading>
                </View>
            </Card.Content>
        </Card>
    )
}

export default NotificationCard;