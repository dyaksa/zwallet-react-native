import React from "react";
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions} from "react-native";
import { Title, IconButton, Switch, Subheading } from "react-native-paper"
import IconMenu from "../../components/IconMenu";
import Button from "./components/Button";
import SwitchButton from "./components/SwitchButton";
import { useSelector } from "react-redux";

const Profile = (props) => {

    const User = useSelector((s) => s.User);
    const { firstName, lastName, phone, photo } = User.data.data[0]; 

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <View style={{padding: 10}}>
                <View style={{alignItems: "center", marginVertical: 10}}>
                    <Image style={Styles.profile__image} source={{uri: "https://i.stack.imgur.com/l60Hf.png"}}/>
                    <TouchableOpacity activeOpacity={0.5} style={{flexDirection: "row", alignItems: "center"}}>
                        <IconButton icon="pencil" size={15}/>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <Title style={{fontSize: 24, fontWeight: "bold", color: "#4D4B57", marginVertical: 10}}>{`${firstName} ${lastName}`}</Title>
                    <Subheading style={{fontSize: 16, color: "#7A7886", marginVertical: 10}}>{(phone) ? `+62 ${phone}` : "+62"}</Subheading>
                </View>
                <View style={{padding: 10}}>
                    <Button {...props} title="Personal Information" opacity={0.8} to="Information"/>
                    <Button {...props} title="Change Password" opacity={0.8} to="Password"/>
                    <Button {...props} title="Change Pin" opacity={0.8} to="Pin"/>
                    <SwitchButton/>
                    <TouchableOpacity activeOpacity={0.8} style={Styles.button}>
                            <Title style={Styles.button__title}>Logout</Title>
                            <IconButton icon="arrow-right" color="#7E7D84"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: "100%",
        backgroundColor: "#fff"
    },

    profile__image: {
        width: 80, 
        height: 80, 
        borderRadius: 10,
        marginVertical: 10
    },

    button: {
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#E5E8ED", 
        borderRadius: 10, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },

    button__title: {
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#4D4B57"
    }
})

export default Profile;