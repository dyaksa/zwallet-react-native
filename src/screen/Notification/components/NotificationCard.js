import React from "react";
import { View } from "react-native";
import { Card, Title, Subheading } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/currency";

const NotificationCard = ({id,amount,category,sender,receive}) => {
    const { data } = useSelector((s) => s.Auth);

    return (
        <Card style={{marginHorizontal: 10, marginVertical: 10}}> 
            <Card.Content style={{justifyContent: "space-around", flexDirection: "row", alignItems: "center"}}>
                {(data.user.id == id) 
                ? (<Icons name="arrow-up" style={{fontSize: 30, color: "#FF5B37"}}/>) 
                : (<Icons name="arrow-down" style={{fontSize: 30, color: "#4CEDB3"}}/>) }
                <View>
                    <Title style={{fontSize: 14, color: "#7A7A7A"}}>{ data.user.id == id ? `Transfered To ${receive}` : `Transfered From  ${sender}` }</Title>
                    <Subheading style={{fontSize: 18, color: "#43484F", fontWeight: "bold"}}>{`Rp ${formatCurrency(amount)}`}</Subheading>
                </View>
            </Card.Content>
        </Card>
    )
}

export default NotificationCard;