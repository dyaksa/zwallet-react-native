import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import { Text, Subheading, Headline, Button } from "react-native-paper";
import HistoryItem from "./components/HistoryItem";
import IconMenu from "../../components/IconMenu";
import { useSelector } from "react-redux";
import http from "../../http-common";
import { formatCurrency } from "../../utils/currency";

const Dashboard = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await http.get("/user/detail",{headers: {"x-access-token": Auth.data.accessToken}});
                setUser(user.data.data[0]);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[user]);

    useEffect(() => {
        const fetchDataTransactions = async () => {
            try{
                const users = await http.get("/transfer",{headers: {"x-access-token": Auth.data.accessToken}});
                setTransactions(users.data.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchDataTransactions();
    },[transactions])

    const renderItem = ({item}) => (
        <HistoryItem image={item.photo} name={`${item.firstName}.${item.lastName.substr(0,1)}`} category={`Transfer`} total={item.amount}/>
    )

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate("Details")}>
                <View style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 20, marginVertical: 10}}>
                    <Text style={{color: "#fff", marginBottom: 10}}>Balance</Text>
                    <Headline style={{color: "#fff", marginBottom: 10, fontWeight: "bold"}}>{`Rp ${formatCurrency(user.balance)}`}</Headline>
                    <Subheading style={{color: "#fff"}}>{user.phone ? `+62-${user.phone}` : `+62`}</Subheading>
                </View>
            </TouchableOpacity>
                <View style={{flexDirection: "row", padding: 10, justifyContent: "space-between"}}>
                    <Button style={[Styles.dashboard__button, {marginRight: 20}]} icon="arrow-up">Transfer</Button>
                    <Button style={[Styles.dashboard__button]} icon="plus">Topup</Button>
                </View>
                <View style={{paddingHorizontal: 10, paddingVertical:10,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: "#514F5B"}}>Transaction History</Text>
                    <Text style={{fontSize: 14, color: "#6379F4"}}>See All</Text> 
                </View>
                <SafeAreaView style={{marginVertical: 20, flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </SafeAreaView>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("window").width
    },

    dashboard__button: {
        backgroundColor: "#E5E8ED", 
        padding: 10, 
        borderRadius: 10, 
        flex: 1
    }
})

export default Dashboard;