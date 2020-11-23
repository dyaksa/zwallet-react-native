import React from "react";
import { View, Dimensions, StyleSheet, ScrollView, Image } from "react-native";
import { Title, Button, Text, Card, Headline, Subheading } from "react-native-paper";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatCurrency } from "../../utils/currency";

const Success = (props) => {
    const { amount, balance, date, name, notes, phone, photo } = props.route.params;
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
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{`Rp${formatCurrency(amount)}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Balance Left</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{`Rp${formatCurrency(parseInt(balance) - parseInt(amount))}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Date Time</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{date}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={{color: "#7A7886", fontSize:16}}>Notes</Title>
                            <Text style={{color: "#514F5B", fontSize: 22, fontWeight: "bold"}}>{notes ? notes : "-"}</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{padding: 10}}>
                    <Text style={{color: "#514F5B", fontSize: 18, fontWeight: "bold"}}>Transfer To</Text>
                </View>
                <View>
                    <Card style={{padding: 10}}>
                        <View style={{flexDirection: "row"}}>
                            <Image source={{ uri: photo}} style={{width: 56, height: 56, borderRadius: 10}}/>
                            <View style={{marginHorizontal: 20}}>
                                <Headline style={{fontSize: 16, fontWeight: "bold", color: "#4D4B57"}}>{name}</Headline>
                                <Subheading style={{fontSize: 14, color: "#7A7886"}}>{`+62 ${phone}`}</Subheading>
                            </View>
                        </View> 
                    </Card>
                </View>
                <View style={{marginVertical: 20}}>
                    <Button onPress={() => props.navigation.navigate("Transfers")} style={{padding: 10, borderRadius: 10}} color="#6379F4" mode="contained">
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