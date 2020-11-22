import React from "react";
import {  Card, Text } from "react-native-paper";

const HorizontalItem = (props) => {
    return (
        <Card style={{marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 5, paddingVertical: 5 ,alignContent: "center"}}>
            <Card.Cover style={{height: 56, marginVertical: 10}} source={{uri: props.image}}/>
            <Text style={{fontSize: 14, color:"#4D4B57", fontWeight: "bold"}}>{props.name}</Text>
        </Card>
    )
}

export default HorizontalItem;