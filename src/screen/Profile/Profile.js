import React, {useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, ToastAndroid, BackHandler} from "react-native";
import { Title, IconButton, Subheading } from "react-native-paper"
import IconMenu from "../../components/IconMenu";
import Button from "./components/Button";
import SwitchButton from "./components/SwitchButton";
import { useSelector } from "react-redux";
import http from "../../http-common";
import ImagePicker from "react-native-image-picker";

const Profile = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [user, setUser] = React.useState([]);
    const [exitApp, setExitApp] = React.useState(0);

    const backAction = () => {
        setTimeout(() => {
            setExitApp(0);
        },2000)

        if(exitApp === 0){
            setExitApp(exitApp + 1);
            ToastAndroid.show("Press Back Again, to exit.", ToastAndroid.SHORT)
        }else if(exitApp === 1){
            BackHandler.exitApp();
        }
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
            const fetchData = async () => {
                try {
                    const user = await http.get("/user/auth/detail",{headers:{"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setUser(user.data.data[0]);
                    }
                }catch(err){
                    throw err;
                }
            }
            fetchData();
            return () => {
                unmounted = true;
                backHandler.remove();
            }

        },[user, exitApp])
    )

    const pickImage = () => {
        ImagePicker.showImagePicker({
            title: "select avatar",
            storageOptions: {
                skipBackup: true,
                path: "images"
            }
        },(response) => {
            if(response.didCancel){
                console.log("user canceled image picker")
            }else if(response.error){
                console.log("image picker error");
            }else{
                const data = {
                    type: response.type,
                    uri: response.uri,
                    name: response.fileName || response.uri.substr(response.uri.lastIndexOf("/") + 1)
                }
                uploadImage(data);
            }
        })
    }

    const uploadImage = async (data) => {
        try {
            let uploadData = new FormData();
            uploadData.append('photo',data);
            const res = await http.post("/upload/images",uploadData, {
                headers: {
                "x-access-token": Auth.data.accessToken, 
                "Content-Type": "multipart/form-data"
                }
            });
        }catch(err){
            throw err;
        }
    }

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <View style={{padding: 10}}>
                <View style={{alignItems: "center", marginVertical: 10}}>
                    <Image style={Styles.profile__image} source={{uri: (user.photo) ? user.photo : "https://i.stack.imgur.com/l60Hf.png"}}/>
                    <TouchableOpacity onPress={pickImage}  activeOpacity={0.5} style={{flexDirection: "row", alignItems: "center"}}>
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