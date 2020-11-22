import React, {useEffect} from "react";
import { View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Text, Appbar, Card, Title, Subheading, TextInput as Input } from "react-native-paper";
import { useSelector } from "react-redux";
import http from "../../http-common";

const Amount = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const {userId, balance, name, phone, photo} = props.route.params;
    const { container } = Styles;
    const [amount, setAmount] = React.useState(null);

    return (
        <View style={container}>
            <Appbar style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Transfers"/>
            </Appbar>
            <View style={{padding: 10}}>
                <Card style={{padding: 10, marginVertical: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: photo}}/>
                        <Card.Content>
                        <Title style={{color: "#4D4B57", fontWeight: "bold", fontSize:16}}>{name}</Title>
                            <Subheading style={{color: "#7A7886", fontSize: 14}}>+62 813-8492-9994</Subheading>
                        </Card.Content>
                    </View>
                </Card>
                <View style={{marginVertical: 25}}>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "#7C7895", fontSize: 16}}>Rp120.000 Available</Text>
                </View>
                <View style={{marginVertical: 35, paddingHorizontal: 70}}>
                    <TextInput
                        onChangeText={(text) => setAmount(text)}
                        value={amount}
                        placeholder="0.00"
                        placeholderTextColor="#B5BDCC"
                        keyboardType={'number-pad'}
                        style={{backgroundColor: "transparent", textAlign:"center", fontSize: 42, fontWeight:"bold"}}
                    />
                </View> 
                <View style={{marginVertical: 35, paddingHorizontal: 10}}>
                    <Input
                        placeholder="Add some notes" 
                        style={{backgroundColor: "transparent"}}
                        left={
                            <Input.Icon icon="pencil" color="rgba(169, 169, 169, 0.6)"/>
                        }
                    />
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <TouchableOpacity style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 10}} activeOpacity={0.9}>
                        <Text style={{color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "bold"}}>Next Step</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
    }
})

export default Amount;