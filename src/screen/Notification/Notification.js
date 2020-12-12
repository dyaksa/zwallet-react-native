import React from "react";
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import NotificationCard from "./components/NotificationCard";
import EmptyData from "../../components/EmptyData";

const data = [
    {
        id: 1,
        name: "Winandi"
    }
]

const renderItem = ({item}) => {
    return (
        <NotificationCard id={item.id} name={item.name} />
    )
}


const Notification = (props) => {
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Notification"/>
            </Appbar.Header>
            <SafeAreaView style={{flex: 1, marginVertical: 20}} >  
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListEmptyComponent={<EmptyData/>}
                    keyExtractor={(item,index) => index.toString()}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("window").width
    }
})

export default Notification;