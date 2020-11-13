import React, {useEffect} from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { Text, Appbar, Card, Title, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import http from "../../http-common";

const Information = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [user, setUser] = React.useState([]);

    useEffect(() => {
        const fetchUserLogin = async () => {
            try {
                const user = await http.get("/user/detail",{headers: {"x-access-token": Auth.data.accessToken}});
                setUser(user.data.data[0]);
            }catch(err){
                console.log(err);
            }
        }
        fetchUserLogin();
    },[user]);

    return (
        <View style={Styles.container}>
            <Appbar style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Personal Information"/>
            </Appbar>
            <View style={{padding: 10}}>
                <View style={{marginVertical: 10}}>
                    <Text style={{fontSize: 16, lineHeight: 27, color: "#7A7886"}}>
                        We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.
                    </Text>
                </View>
                <View>
                    <Card style={Styles.card}>
                        <Card.Content>
                            <Text style={Styles.card__text}>First Name</Text>
                            <Title style={Styles.card__title}>{user.firstName}</Title>
                        </Card.Content>
                    </Card>
                    <Card style={Styles.card}>
                        <Card.Content>
                            <Text style={Styles.card__text}>Last Name</Text>
                            <Title style={Styles.card__title}>{user.lastName}</Title>
                        </Card.Content>
                    </Card>
                    <Card style={Styles.card}>
                        <Card.Content>
                            <Text style={Styles.card__text}>Verified Email</Text>
                            <Title style={Styles.card__title}>{user.email}</Title>
                        </Card.Content>
                    </Card>
                    {user.phone ? (
                        <Card style={Styles.card}>
                            <Card.Content>
                                <Text style={Styles.card__text}>Phone Number</Text>
                                <Title style={Styles.card__title}>{`+62 ${user.phone}`}</Title>
                            </Card.Content>
                        </Card>
                    ) : (
                        <Card style={Styles.card}>
                            <Card.Content>
                                <Text style={Styles.card__text}>Phone Number</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate("Phone")}>
                                    <Title style={{color: "#6379F4", fontSize: 22, fontWeight: "bold"}}>Add Phone Number</Title>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    )}
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
    },

    card: {
        marginVertical: 10
    },  

    card__text: {
        fontSize: 16,
        color: "#7A7886"
    },

    card__title: {
        fontSize: 22,
        color: "#514F5B",
        fontWeight: "bold"
    }
})

export default Information;