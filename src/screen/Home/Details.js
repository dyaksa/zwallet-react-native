import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView} from "react-native";
import { Text, Subheading, Headline, Card, IconButton, Appbar, ActivityIndicator } from "react-native-paper";
import { useSelector } from "react-redux";
import HistoryItem  from "./components/HistoryItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import http from "../../http-common";
import { formatCurrency } from "../../utils/currency";
import TransactionHistory from "./components/TransactionHistory";

const Details = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [expense, setExpense] = React.useState(0);
    const [income, setIncome] = React.useState(0);
    const [loading,setLoading] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            let unmounted = false;
            const fetchAverage = async () => {
                try {
                    const expense = await http.get("/transfer/expense",{headers: {"x-access-token": Auth.data.accessToken}});
                    const income = await http.get("/transfer/income",{headers: {"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setExpense(expense.data.data[0].average);
                        setIncome(income.data.data[0].average);
                        setLoading(false);
                    } 
                }catch(err){
                    throw err;
                }
            }
            fetchAverage();
            return () => {
                unmounted = true;
            }
        },[expense, income, loading])
    )

    return (
        <>
        <View style={Styles.container}>
                <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                    <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                    <Appbar.Content title="Transactions"/>
                </Appbar.Header>
                <View style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 20, marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{alignContent: "flex-start"}}>   
                        <Icon name="arrow-down" size={25} color="#4CEDB3"/>
                        <Headline style={Styles.details__headline}>Income</Headline>
                        <Subheading style={Styles.details__subheading}>{`Rp.${formatCurrency(income)}`}</Subheading>
                    </View>
                    <View style={{alignContent: "flex-start"}}>
                        <Icon name="arrow-up" size={25} color="#FF5B37"/>
                        <Headline style={Styles.details__headline}>Expense</Headline>
                        <Subheading style={Styles.details__subheading}>{`Rp.${formatCurrency(expense)}`}</Subheading>
                    </View>
                </View>
                <View style={{paddingHorizontal: 10, paddingVertical:10,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: "#514F5B"}}>Transaction History</Text> 
                </View>
                <SafeAreaView style={{marginVertical: 10, flex: 1}}>
                    <TransactionHistory token={Auth.data.accessToken}/>
                </SafeAreaView>
        </View>
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("window").width
    },

    details__headline: {
        fontSize: 14, 
        color: "#D0D0D0"
    },

    details__subheading: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#F1F1F1"
    }
})

export default Details;