import React, { useEffect } from "react";
import  { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, FlatList, Image, BackHandler, ToastAndroid } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";
import IconMenu from "../../components/IconMenu";
import http from "../../http-common";
import { useSelector } from "react-redux";
import VerticalItem from "./components/VerticalItem"; 
import HorizontalItem from "./components/HorizontalItem";

const Transfers = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const [ horizontalData, setHorizontalData] = React.useState([]);
    const [ verticalData, setVerticalData ] = React.useState([]);
    const [exitApp, setExitApp] = React.useState(0);
    const [pageCurrent, setPageCurrent] = React.useState(1);
    const [loading,setLoading] = React.useState(false);

    const backAction = () => {
        setTimeout(() => {
            setExitApp(0);
        },2000)

        if(exitApp === 0){
            setExitApp(exitApp + 1);
            ToastAndroid.show("Press Back Again, to exit.", ToastAndroid.SHORT)
        }else if(exitApp === 1){
            BackHandler.exitApp();
        }
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            let unmounted = false;
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            const fetchData = async () => {
                try {
                    const horizontal = await http.get("/user?page=1&limit=3", {headers: {"x-access-token": Auth.data.accessToken}});
                    const vertical = await http.get(`/user?page${pageCurrent}`, {headers: {"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setHorizontalData(horizontal.data.data);
                        setVerticalData(vertical.data.data);
                        setLoading(false);
                    }
                }catch(err){
                    throw err;
                }
            }
            if(!unmounted){
                fetchData();
            }
            return () => {
                backHandler.remove();
                unmounted = true;
            }
        },[exitApp])
    )

    const handleChange = async (text) => {
        try{
            const res = await http.get(`/user?name=${text}`, {headers: {"x-access-token": Auth.data.accessToken}});
            setVerticalData(res.data.data);
        }catch(err){
            console.log(err);
        }
    }

    const renderHorizontal = ({item}) => (
        <HorizontalItem image={(item.photo) ? item.photo : "https://i.stack.imgur.com/l60Hf.png"} name={`${item.firstName} ${item.lastName.substr(0,2)}..`}/>
    )

    const renderFooter = () => {
        return (
            loading ? 
                <View style={{marginVertical: 15, alignItems: "center"}}>
                     <ActivityIndicator color="#6379F4" size="small"/>
                </View> : null
        )
    }

    const handleLoadMore = () => {
        setPageCurrent(pageCurrent + 1);
        setLoading(true);
    }

    return (
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <Searchbar
                onChangeText={handleChange}
                placeholder="Search receiver here"
                style={{borderRadius: 12, marginVertical: 10, elevation: 0, backgroundColor: "rgba(58, 61, 66, 0.1)"}}
            />
            <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight:"bold", color: "#514F5B"}}>Quick Access</Text>
                <SafeAreaView style={{marginVertical: 10}}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={horizontalData}
                        renderItem={renderHorizontal}
                        keyExtractor={(item) => item.id.toString()} 
                    />
                </SafeAreaView>
            </View>
            <View style={{padding: 10}}>
                <Text style={{fontSize: 18, fontWeight:"bold", color: "#514F5B"}}>All Contact</Text>
            </View>
            <SafeAreaView style={{flex: 1}}>
                {verticalData.length ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={verticalData}
                        renderItem={({item}) =>  <VerticalItem navigation={props.navigation} balance={item.balance}  id={item.id} name={`${item.firstName} ${item.lastName}`} image={item.photo ? item.photo : "https://i.stack.imgur.com/l60Hf.png"} phone={item.phone}/>}
                        keyExtractor={(item,index) => index.toString()}
                    />
                ) : (
                    <View>
                        <Image style={{width: "100%", height: "100%"}} source={{uri: "https://cdn.dribbble.com/users/1053528/screenshots/4341024/not-found.jpg"}}/>
                    </View>
                )}
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