import React from "react";
import { View, Dimensions, StyleSheet, ScrollView, Image, BackHandler } from "react-native";
import { Title, Button, Text, Card, Headline, Subheading } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatCurrency } from "../../utils/currency";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setDefault } from "../../redux/actions/Transaction";
import moment from "moment";
import _ from "lodash";


const Success = (props) => {
    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.Profile);
    const { user, field } = useSelector((s) => s.Transaction);

    const backAction = () => {
        props.navigation.navigate("Dashboard");
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            console.log(data);
            console.log(user);
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            )
            return () => {
                backHandler.remove();
                dispatch(setDefault());
            }
        },[])
    )

    return (
    <ScrollView>
        <View style={Styles.container}>
            <View style={{padding: 10}}>
                <View style={{alignItems: "center", marginVertical: 15}}>
                    <Icons name="check-circle" style={{fontSize: 100, color: "#1EC15F"}}/>
                    <View style={{marginVertical: 10}}>
                        <Title style={{fontWeight: "bold", color: "#4D4B57", fontSize: 22}}>Transfer Success</Title>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 18, color: "#514F5B", fontWeight: "bold"}}>Details</Text>
                </View>
                <View>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Amount</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{(!_.isEmpty(field)) ? `Rp${formatCurrency(field.amount)}` : null}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Balance Left</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{(!_.isEmpty(field)) ? `Rp${formatCurrency(data.balance - field.amount)}` : null}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Date Time</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{`${moment().format("MMM Do YYYY")}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Notes</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{(!_.isEmpty(field)) ? (field.note == "" ? "-" : field.note) : null}</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color: "#514F5B", fontSize: 18, fontWeight: "bold"}}>Transfer To</Text>
                </View>
                <View>
                    <Card style={{padding: 10}}>
                        <View style={{flexDirection: "row"}}>
                            <Image source={{ uri: (!_.isEmpty(user)) ? user[0].photo : "https://t4.ftcdn.net/jpg/02/22/39/63/360_F_222396357_KlP0TQwV3X1U6rJWzlLcIpJ7ZLpxGcQR.jpg"}} style={{width: 56, height: 56, borderRadius: 10}}/>
                            <View style={{marginHorizontal: 20}}>
                                <Headline style={{fontSize: 16, fontWeight: "bold", color: "#4D4B57"}}>{(!_.isEmpty(user)) ? `${user[0].firstName} ${user[0].lastName}` : null}</Headline>
                                <Subheading style={{fontSize: 14, color: "#7A7886"}}>{(!_.isEmpty(user)) ? `+62 ${user[0].phone}` : null}</Subheading>
                            </View>
                        </View> 
                    </Card>
                </View>
                <View style={{marginVertical: 20}}>
                    <Button onPress={() => props.navigation.navigate("Dashboard")} style={{padding: 10, borderRadius: 10}} color="#6379F4" mode="contained">
                        <Text style={{color: "#fff"}}>Back To Home</Text>
                    </Button>
                </View>
            </View>
        </View>
    </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
    },
})

export default Success;