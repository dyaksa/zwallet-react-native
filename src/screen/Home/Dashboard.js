import React from "react";
import { View, StyleSheet, Image, Dimensions, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import { Text, Subheading, Headline, Button, Card } from "react-native-paper";
import HistoryItem from "./components/HistoryItem";
import IconMenu from "../../components/IconMenu";

const DATA = [
    {id: "1", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "2", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "3", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "4", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"}
]

const Dashboard = (props) => {
    const renderItem = ({item}) => (
        <HistoryItem image={item.image} name={item.name} category={item.category} total={item.total}/>
    )

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate("Details")}>
                <View style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 20, marginVertical: 10}}>
                    <Text style={{color: "#fff", marginBottom: 10}}>Balance</Text>
                    <Headline style={{color: "#fff", marginBottom: 10, fontWeight: "bold"}}>Rp120.000</Headline>
                    <Subheading style={{color: "#fff"}}>+62 813-9387-7946</Subheading>
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
                <SafeAreaView style={{marginVertical: 10, flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
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