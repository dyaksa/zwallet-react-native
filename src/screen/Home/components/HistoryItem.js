import React from "react";
import {View, Image} from "react-native";
import { Card, Headline, Subheading, Text } from "react-native-paper";

const HistoryItem = (props) => {
    return (
        <View style={{flexDirection: "row", flexDirection: "row", justifyContent: "space-between", marginVertical: 10, paddingHorizontal: 10}}>
        <Card style={{width: "100%"}}>
            <Card.Content style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image style={{width: 56, height: 56, borderRadius: 10, marginRight: 10}} source={{uri: props.image}}/>
                    <View>
                        <Headline style={{fontSize: 16, color: "#4D4B57", fontWeight: "bold"}}>{props.name}</Headline>
                        <Subheading style={{fontSize: 14, color: "#7A7886"}}>{props.category}</Subheading>
                    </View>
                </View>
                <Text style={{fontWeight: "bold", fontSize: 18, color: "#1EC15F"}}>{props.total}</Text>
            </Card.Content>
        </Card>
    </View>
    )
}

export default HistoryItem;