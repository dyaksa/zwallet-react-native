import React from "react";
import { Card, Headline, Subheading } from "react-native-paper";
import { TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {  fetchReceiveTransaction } from "../../../redux/actions/Transaction";


const VerticalItem = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const dispatch = useDispatch();
    const { id } = props

    const onSubmit = () => {
        dispatch(fetchReceiveTransaction(id,Auth.data.accessToken));
    }

    return (
        <TouchableOpacity 
            onPress={onSubmit} 
            style={{marginVertical: 10}} activeOpacity={0.9}>
            <View style={{flexDirection: "row", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5}}>
                <Card style={{width: "100%"}}>
                    <Card.Content style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image style={{width: 56, height: 56, borderRadius: 10, marginRight: 10}} source={{uri: props.image}}/>
                            <View>
                                <Headline style={{fontSize: 16, color: "#4D4B57", fontWeight: "bold"}}>{props.name}</Headline>
                                <Subheading style={{fontSize: 14, color: "#7A7886"}}>{props.phone}</Subheading>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalItem;