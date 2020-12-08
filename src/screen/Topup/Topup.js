import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView } from "react-native";
import { Card, Title } from "react-native-paper";
import IconMenu from "../../components/IconMenu";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import http from "../../http-common";

const Topup = (props) => {
    const [list,setList] = React.useState([]);
    const Auth = useSelector((s) => s.Auth);

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const fetchData = async () => {
                try {
                    const topup = await http.get("/topup",{headers: {'x-access-token': Auth.data.accessToken}});
                    if(!unmounted){
                        setList(topup.data.data);
                    }
                }catch(err){
                    throw err;
                }
            }
            fetchData();
            return () => {
                unmounted = true;
            }
        },[])
    )

    const renderData = (item) => (
            <Card style={{marginVertical:10}}>
                <Card.Content>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", color: "#6379F4"}}>
                            {item.index + 1}
                        </Text>
                        <Title style={{marginHorizontal: 15, fontSize: 16, lineHeight: 27, color: "#7A7886"}}>
                            {item.item.title}
                        </Title>
                    </View>
                </Card.Content>
            </Card>
    )

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <View style={{padding: 10}}>
                <Card>
                    <Card.Content>

                    </Card.Content>
                </Card>
                <Text style={{padding: 10, fontSize: 16, lineHeight: 27, color: "#7A7886", textAlign: "center"}}>
                    We provide you virtual account number for top up via nearest ATM.
                </Text>
                <View style={{padding: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold",color: "#514F5B"}}>How To Topup</Text>
                </View>
                <SafeAreaView>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={list}
                        renderItem={renderData}
                        keyExtractor={(item,index) => index.toString()}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        height: "100%",
        width: Dimensions.get("screen").width,
        backgroundColor: "#fff"
    }
})

export default Topup