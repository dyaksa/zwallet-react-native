import React from "react";
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView} from "react-native";
import { Text, Subheading, Headline, Card, IconButton } from "react-native-paper";
import HistoryItem  from "./components/HistoryItem";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DATA = [
    {id: "1", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "2", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "3", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"},
    {id: "4", image: "https://i.stack.imgur.com/l60Hf.png", name: "Samuel Suhi", category: "Subscription", total: "+Rp50.000"}
]

const Details = (props) => {
    const renderItem = ({item}) => (
        <HistoryItem image={item.image} name={item.name} category={item.category} total={item.total}/>
    )

    return (
        <>
        <View style={Styles.container}>
            <IconButton onPress={() => props.navigation.goBack()} icon="keyboard-backspace"/>
                <View style={{backgroundColor: "#6379F4", padding: 20, borderRadius: 20, marginVertical: 10, flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{alignContent: "flex-start"}}>   
                        <Icon name="arrow-down" size={25} color="#4CEDB3"/>
                        <Headline style={Styles.details__headline}>Income</Headline>
                        <Subheading style={Styles.details__subheading}>Rp2.120.000</Subheading>
                    </View>
                    <View style={{alignContent: "flex-start"}}>
                        <Icon name="arrow-up" size={25} color="#FF5B37"/>
                        <Headline style={Styles.details__headline}>Expense</Headline>
                        <Subheading style={Styles.details__subheading}>Rp1.560.000</Subheading>
                    </View>
                </View>
                <View style={{paddingHorizontal: 10, paddingVertical:10,flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", color: "#514F5B"}}>Transaction History</Text> 
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