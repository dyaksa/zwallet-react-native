import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, BackHandler } from "react-native";
import { Card, Appbar, Headline,Subheading, Title, Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "../../utils/currency";
import { setDefault } from "../../redux/actions/Transaction";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

const Confirmation = (props) => {
    const dispatch = useDispatch();
    const { user, field, success } = useSelector((s) => s.Transaction);
    const { data } = useSelector((s) => s.Profile);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [image, setImage] = useState(null);

    const backAction = () => {
        dispatch(setDefault());
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
            if(!success){
                return props.navigation.navigate("Transfers");
            }
            if(!unmounted){
                if(!_.isEmpty(user)){
                    setName(`${user[0].firstName} ${user[0].lastName}`);
                    setImage(user[0].photo);
                    setPhone(user[0].phone);
                }
            }
            return () => {
                unmounted = true;
                backHandler.remove();
            }
        },[success])
    )

    const handleOnPress = () => {
        if(!_.isEmpty(field)){
            props.navigation.navigate("TransferPin");
        }
    }
    
    return (
        <ScrollView>
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => dispatch(setDefault())}/>
                <Appbar.Content title="Confirmation"/>
            </Appbar.Header>
            <View style={{padding: 10}}>
                <View style={{padding: 10, marginVertical: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#514F5B"}}>Transfer To</Text>
                </View>
                <Card style={{padding: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <Image source={{ uri: image ? image : "https://i.stack.imgur.com/l60Hf.png"}} style={{width: 56, height: 56, borderRadius: 10}}/>
                        <View style={{marginHorizontal: 20}}>
                            <Headline style={{fontSize: 16, fontWeight: "bold", color: "#4D4B57"}}>{name ? name : "undefined"}</Headline>
                            <Subheading style={{fontSize: 14, color: "#7A7886"}}>{`+62 ${phone ? phone : "-"}`}</Subheading>
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
                            <Text style={Styles.card__text}>{`Rp${(!_.isEmpty(field)) ? formatCurrency(field.amount) : "0"}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Balance Left</Title>
                            <Text style={Styles.card__text}>{`Rp${(!_.isEmpty(field)) ? formatCurrency(data.balance - field.amount) : "0"}`}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Date Time</Title>
                            <Text style={Styles.card__text}>{moment().format("MMM Do YYYY")}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={{marginVertical: 10}}>
                        <Card.Content>
                            <Title style={Styles.card__title}>Notes</Title>
                            <Text style={Styles.card__text}>{(!_.isEmpty(field)) ? field.notes : "-"}</Text>
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