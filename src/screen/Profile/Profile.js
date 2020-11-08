import React, {useEffect} from "react";
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions} from "react-native";
import { Title, IconButton, Switch, Subheading } from "react-native-paper"
import IconMenu from "../../components/IconMenu";
import Button from "./components/Button";
import SwitchButton from "./components/SwitchButton";
import { useSelector } from "react-redux";
import http from "../../http-common";

const Profile = (props) => {

    const Auth = useSelector((s) => s.Auth);
    const [user, setUser] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await http.get("/user/detail",{headers:{"x-access-token": Auth.data.accessToken}});
                setUser(user.data.data[0]);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[user])


    return (
        <View style={Styles.container}>
            {console.log(user)}
            <IconMenu {...props}/>
            <View style={{padding: 10}}>
                <View style={{alignItems: "center", marginVertical: 10}}>
                    <Image style={Styles.profile__image} source={{uri: "https://i.stack.imgur.com/l60Hf.png"}}/>
                    <TouchableOpacity activeOpacity={0.5} style={{flexDirection: "row", alignItems: "center"}}>
                        <IconButton icon="pencil" size={15}/>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <Title style={{fontSize: 24, fontWeight: "bold", color: "#4D4B57", marginVertical: 10}}>{`${user.firstName} ${user.lastName}`}</Title>
                    <Subheading style={{fontSize: 16, color: "#7A7886", marginVertical: 10}}>{(user.phone) ? `+62 ${user.phone}` : "+62"}</Subheading>
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