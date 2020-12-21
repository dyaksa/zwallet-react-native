import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Card, Title, Subheading, Portal, Modal, Button } from "react-native-paper";
import IconMenu from "../../components/IconMenu";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import http from "../../http-common";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { postPaymentTopup } from "../../redux/actions/Payment";
import { formatCurrency } from "../../utils/currency";
import _ from "lodash";

const Topup = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const { data } = useSelector((s) => s.Payment);
    const dispatch = useDispatch();
    const [list,setList] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [amount, setAmount] = React.useState(0);

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            setAmount(0);
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

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const chargeAmountData = [
        { id: 1, amount: 10000 },
        { id: 1, amount: 20000 },
        { id: 1, amount: 30000 },
        { id: 1, amount: 60000 },
        { id: 1, amount: 100000 },
        { id: 1, amount: 200000 }
    ]


    const renderChargeCard = ({item}) => {
        const onHandleCharge = () => {
            dispatch(postPaymentTopup(item.amount, Auth.data.accessToken));
            setAmount(item.amount);
        }

        return (
            <TouchableOpacity style={{flex: 1, flexDirection: "column", borderRadius: 5, margin: 10, borderStyle: "solid", borderWidth: 1, borderColor: "blue"}} onPress={onHandleCharge}>
                <Card style={{elevation: 0}}>
                    <Card.Content>
                        <Title style={{textAlign: "center", fontWeight: "bold"}}>{formatCurrency(item.amount)}</Title>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    const handleNext = () => {
        setVisible(false);
        props.navigation.navigate('Payment');
    }

    return (
        <>
        <View style={Styles.container}>
            <IconMenu {...props}/>
            <View style={{padding: 10, flexDirection: "column"}}>
                <Card onPress={showModal}>
                    <Card.Content style={{flexDirection: "row"}}>
                        <Card style={{padding: 15, backgroundColor: "#EBEEF2", marginRight: 25}}>
                            <Icons name="plus" style={{fontSize: 30, color: "#6379F4"}}/>
                        </Card>
                        <View>
                            <Title style={{fontSize: 14, color: "#7A7886"}}>Virtual Account Number</Title>
                            <Subheading style={{fontSize: 16, color: "#4D4B57", fontWeight: "bold"}}>2389 081393877946</Subheading>
                        </View>
                    </Card.Content>
                </Card>
                <View>
                    <Text style={{padding: 10, fontSize: 16, lineHeight: 27, color: "#7A7886", textAlign: "center"}}>
                        We provide you virtual account number for top up via nearest ATM.
                    </Text>
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold",color: "#514F5B"}}>How To Topup</Text>
                    </View>
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
        <Portal>
            <Modal onDismiss={hideModal} visible={visible} contentContainerStyle={{backgroundColor: "white", padding: 20, margin: 20, borderRadius: 5}}>
                <Title style={{textAlign: "center"}}>Charge</Title>
                <View style={{padding: 10}}>
                    <Text style={{color: "rgba(58, 61, 66, 0.6)", fontSize: 14,  fontWeight: "bold"}}>Your Reload</Text>
                    <View style={{marginVertical: 10}}>
                        <Title style={{fontSize: 26, fontWeight: "bold"}}>{`Rp.${formatCurrency(amount)}`}</Title>
                    </View>
                </View>
                <SafeAreaView style={{marginVertical: 10}}>  
                    <FlatList
                        data={chargeAmountData}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={renderChargeCard}
                        numColumns={2}
                    />
                </SafeAreaView>
                <View style={{marginVertical: 10}}>
                    {(_.isEmpty(data)) 
                    ? (<Button disabled={true} mode="contained" style={{padding: 10, elevation: 0, backgroundColor: "#DADADA"}}>Confirm</Button>) 
                    : (<Button mode="contained" style={{padding: 10, elevation: 0, backgroundColor: "#6379F4"}} onPress={handleNext}>Confirm</Button>) }
                </View>
            </Modal>
        </Portal>
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        padding: 10,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "#fff"
    },

    modal_content: {
        marginVertical: 20
    }
})

export default Topup