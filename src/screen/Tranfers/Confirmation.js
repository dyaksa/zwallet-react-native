import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Card, Appbar, Headline,Subheading, Title, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "../../utils/currency";
import moment from "moment";

const Confirmation = (props) => {

    const { amount, balance, name, notes, photo, phone } = props.route.params;

    useFocusEffect(
        React.useCallback(() => {
            moment.locale('id');
        },[])
    )

    const handleOnPress = () => {
        const data = {...props.route.params, date: moment().format("lll")};
        props.navigation.navigate("TransferPin", data);
    }
    
    return (
        <ScrollView>
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Confirmation"/>
            </Appbar.Header>
            <View style={{padding: 10}}>
                <View style={{padding: 10, marginVertical: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#514F5B"}}>Transfer To</Text>
                </View>
                <Card style={{padding: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <Image source={{ uri: photo}} style={{width: 56, height: 56, borderRadius: 10}}/>
                        <View style={{marginHorizontal: 20}}>
                            <Headline style={{fontSize: 16, fontWeight: "bold", color: "#4D4B57"}}>{name}</Headline>
                            <Subheading style={{fontSize: 14, color: "#7A7886"}}>{`+62 ${phone}`}</Subheading>
                        </View>
                    </View> 
                </Card>
                <View style={{padding: 10, marginVertical: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#514F5B"}}>Details</Text>
                </View>
                <View>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Amount</Title>
                            <Text style={Styles.card__text}>{`Rp${formatCurrency(amount)}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Balance Left</Title>
                            <Text style={Styles.card__text}>{`Rp${formatCurrency(balance - amount)}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Date Time</Title>
                            <Text style={Styles.card__text}>{moment().format("lll")}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Notes</Title>
                            <Text style={Styles.card__text}>{(notes != "") ? notes : "-"}</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{marginVertical: 10}}>
                    <Button {...props} onPress={handleOnPress} style={{padding: 10, borderRadius: 10}} color="#6379F4" mode="contained">
                        <Text style={{color: "#fff"}}>Continue</Text>
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

    card__title: {
        fontSize: 16,
        color: "#7A7886"
    },

    card__text: {
        color: "#514F5B",
        fontWeight: "bold",
        fontSize: 22
    }
})

export default Confirmation;