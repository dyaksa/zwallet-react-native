import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {View, Image} from "react-native";
import { Card, Headline, Subheading, Text } from "react-native-paper";
import { formatCurrency } from "../../../utils/currency";
import {useSelector} from "react-redux";

const HistoryItem = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [userId, setUserId] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
            setUserId(Auth.data.user.id);
            return () => {
               setUserId(0);
            }
        },[userId])
    )
    return (
        <View style={{flexDirection: "row", flexDirection: "row", justifyContent: "space-between", marginVertical: 10, paddingHorizontal: 10}}>
        <Card style={{width: "100%",  overflow: "hidden"}}>
            <Card.Content style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image style={{width: 56, height: 56, borderRadius: 10, marginRight: 10}} source={{uri: (props.image) ? props.image : "https://i.stack.imgur.com/l60Hf.png"}}/>
                    <View>
                        <Headline style={{fontSize: 16, color: "#4D4B57", fontWeight: "bold"}}>{props.name}</Headline>
                        <Subheading style={{fontSize: 14, color: "#7A7886"}}>{props.category}</Subheading>
                    </View>
                </View>
                {(props.status == 1 && userId == props.receive_id) ? 
                    (<Text style={{fontWeight: "bold", fontSize: 18, color: "#1EC15F"}}>{`+Rp ${formatCurrency(props.total)}`}</Text>) 
                    : 
                    (<Text style={{fontWeight: "bold", fontSize: 18, color: "#FF5B37"}}>{`-Rp ${formatCurrency(props.total)}`}</Text>)}
            </Card.Content>
        </Card>
    </View>
    )
}

export default HistoryItem;