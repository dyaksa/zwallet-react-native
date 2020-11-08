import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList, Image } from "react-native";
import { Searchbar, Card, Headline, Subheading } from "react-native-paper";
import IconMenu from "../../components/IconMenu";

const HORIZONTALDATA = [
    {id: "1", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "2", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "3", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
]

const VERTICALDATA = [
    {id: "1", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "2", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "3", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "4", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "5", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"},
    {id: "6", name: "Samuel Suhi", phone: "+62 813-8492-9994", image: "https://i.stack.imgur.com/l60Hf.png"}
]

const HorizontalItem = (props) => (
    <Card style={{marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 5, paddingVertical: 5 ,alignContent: "center"}}>
        <Card.Cover style={{height: 56, marginVertical: 10}} source={{uri: props.image}}/>
        <Text style={{fontSize: 14, color:"#4D4B57", fontWeight: "bold"}}>{props.name}</Text>
    </Card>
)

const VerticalItem = (props) => (
    <View style={{flexDirection: "row", flexDirection: "row", justifyContent: "space-between", marginVertical: 10, paddingHorizontal: 5}}>
    <Card style={{width: "100%"}}>
        <Card.Content style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image style={{width: 56, height: 56, borderRadius: 10, marginRight: 10}} source={{uri: props.image}}/>
                <View>
                    <Headline style={{fontSize: 16, color: "#4D4B57", fontWeight: "bold"}}>{props.name}</Headline>
                    <Subheading style={{fontSize: 14, color: "#7A7886"}}>{props.phone}</Subheading>
                </View>
            </View>
        </Card.Content>
    </Card>
</View>
)

const Transfers = (props) => {
    const renderHorizontal = ({item}) => (
        <HorizontalItem image={item.image} name={item.name}/>
    )

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <Searchbar
                placeholder="Search receiver here"
                style={{borderRadius: 12, marginVertical: 10, elevation: 0, backgroundColor: "rgba(58, 61, 66, 0.1)"}}
            />
            <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight:"bold", color: "#514F5B"}}>Quick Access</Text>
                <SafeAreaView style={{marginVertical: 10}}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={HORIZONTALDATA}
                        renderItem={renderHorizontal}
                        keyExtractor={(item) => item.id} 
                    />
                </SafeAreaView>
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight:"bold", color: "#514F5B"}}>All Contact</Text>
            </View>
            <SafeAreaView style={{flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={VERTICALDATA}
                        renderItem={({item}) => <VerticalItem name={item.name} image={item.image} phone={item.phone}/>}
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
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height
    },

    transfers__boxshadow: {
        shadowColor: "#0000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})

export default Transfers;