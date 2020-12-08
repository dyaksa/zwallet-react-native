import React from "react";
import { View, StyleSheet, Dimensions, SafeAreaView, FlatList, Image } from "react-native";
import { Appbar, Text, Card, Title, Subheading } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native"
import http from "../../http-common";
import {useSelector} from "react-redux";
import HistoryItem from "./components/HistoryItem";

const History = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [transactionsMonth, setTransactionsMonth] = React.useState([]);
    const [transactionsWeek, setTransactionsWeek] = React.useState([]);
    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const fetchData = async () => {
                try {
                    const month = await http.get("/transfer/month",{headers: {"x-access-token": Auth.data.accessToken}});
                    const week = await http.get("/transfer/week",{headers: {"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setTransactionsMonth(month.data.data);
                        setTransactionsWeek(week.data.data);
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

    const renderItem = ({item}) => (
        <HistoryItem
            receive_id={item.receive_id} 
            imagereceiver={item.receive_photo} 
            namereceiver={`${item.receive_firstname}.${item.receive_lastname.substr(0,1)}`} 
            imagesender={item.sender_photo} 
            namesender={`${item.sender_firstname}.${item.sender_lastname.substr(0,1)}`} 
            total={item.amount} 
            status={item.category}
        />
    )

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="History"/>
            </Appbar.Header>
            <SafeAreaView style={{marginVertical: 10, flex: 1}}>
                <View style={{padding: 10}}>
                    <Text style={{color: "#7A7886", fontSize: 16, fontWeight: "bold"}}>This Week</Text>
                </View>
                <FlatList
                    data={transactionsWeek}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item,index) => index.toString()}
                />
                <View style={{padding: 10}}>
                    <Text style={{color: "#7A7886", fontSize: 16, fontWeight: "bold"}}>This Month</Text>
                </View>
                <FlatList
                    data={transactionsMonth}
                    renderItem={renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        padding: 10,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("window").width
    }
})

export default History;