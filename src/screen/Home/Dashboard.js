import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView, TouchableOpacity, ToastAndroid, BackHandler} from "react-native";
import { Text, Subheading, Headline, Button } from "react-native-paper";
import HistoryItem from "./components/HistoryItem";
import IconMenu from "../../components/IconMenu";
import { useSelector } from "react-redux";
import http from "../../http-common";
import { formatCurrency } from "../../utils/currency";
import OneSignal from "react-native-onesignal";

const Dashboard = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(null);
    const [phone, setPhone] = useState(null);
    const [exitApp, setExitApp] = useState(0);
    const [loading, setLoading] = useState(true);

    const backAction = () => {
        setTimeout(() => {
            setExitApp(0);
        },2000);

        if(exitApp === 0){
            setExitApp(exitApp + 1);
            ToastAndroid.show("Press Back Again, to exit.",ToastAndroid.SHORT);
        }else if(exitApp === 1){
            BackHandler.exitApp();
        }
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            const fetchData = async () => {
                try {
                    const user = await http.get("/user/auth/detail",{headers: {"x-access-token": Auth.data.accessToken}});
                    const transactions = await http.get("/transfer",{headers: {"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setPhone(user.data.data[0].phone);
                        setBalance(user.data.data[0].balance);
                        setTransactions(transactions.data.data);
                    }
                }catch(err){
                    throw err;
                }
            };
            fetchData();
            return () => {
                unmounted = true;
                backHandler.remove();
            }
        },[balance,phone,transactions,exitApp])
    )

    useEffect(() => {
        OneSignal.setEmail(Auth.data.email,null,(err) => {
            if(!err){
                console.log("registered")
            }else{
                throw err;
            }
        })
    },[]);

    const renderItem = ({item}) => (
        <HistoryItem receive_id={item.receive_id} image={item.photo} name={`${item.firstName}.${item.lastName.substr(0,1)}`} category={`Transfer`} total={item.amount} status={item.category}/>
    )

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate("Details")}>
                <View style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 20, marginVertical: 10}}>
                    <Text style={{color: "#fff", marginBottom: 10}}>Balance</Text>
                    <Headline style={{color: "#fff", marginBottom: 10, fontWeight: "bold"}}>{balance ? `Rp ${formatCurrency(balance)}` : `Rp 0`}</Headline>
                    <Subheading style={{color: "#fff"}}>{phone ? `+62-${phone}` : `+62`}</Subheading>
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
                {(transactions.length != 0) ? 
                (<SafeAreaView style={{marginVertical: 20, flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.t_id.toString()}
                    />
                </SafeAreaView>) : 
                (
                    <View>
                        <Text>not transactions</Text>
                    </View>
                )}
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