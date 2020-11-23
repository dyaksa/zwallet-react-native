import React  from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Dimensions, StyleSheet, Image, TextInput } from "react-native";
import { Text, Appbar, Card, Title, Subheading, TextInput as Input, Button, HelperText } from "react-native-paper";
import { formatCurrency } from "../../utils/currency";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import http from "../../http-common";
import { useForm, Controller } from "react-hook-form";

const Amount = (props) => {
    const Auth = useSelector((s) => s.Auth);
    const {userId, name, phone, photo} = props.route.params;
    const { container } = Styles;
    const [amount, setAmount] = React.useState(null);
    const [currentAmount, setCurrentAmount] = React.useState(0);
    const [currentPin, setCurrentPin] = React.useState("");
    const { handleSubmit, control, errors } = useForm();

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            const fetchUserLogin = async () => {
                try {
                    const response = await http.get("/user/auth/detail",{headers: {"x-access-token": Auth.data.accessToken}});
                    if(!unmounted){
                        setCurrentAmount(response.data.data[0].balance);
                        setCurrentPin(response.data.data[0].pin);
                    }
                }catch(err){
                    throw err;
                }
            }
            fetchUserLogin();
            return () => {
                unmounted = true;
            }
        },[currentAmount])
    )

    const onSubmit = (result) => {
        const data = {...result, pin: currentPin, balance: currentAmount, ...props.route.params};
        props.navigation.navigate("Confirmation",data);
    }

    return (
        <View style={container}>
            <Appbar style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title="Transfers"/>
            </Appbar>
            <View style={{padding: 10}}>
                <Card style={{padding: 10, marginVertical: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: photo }}/>
                        <Card.Content>
                        <Title style={{color: "#4D4B57", fontWeight: "bold", fontSize:16}}>{name}</Title>
                        <Subheading style={{color: "#7A7886", fontSize: 14}}>{`+62 ${phone}`}</Subheading>
                        </Card.Content>
                    </View>
                </Card>
                <View style={{marginVertical: 25}}>
                <Text style={{textAlign: "center", fontWeight: "bold", color: "#7C7895", fontSize: 16}}>{`Rp ${formatCurrency(currentAmount)} Available`}</Text>
                </View>
                <View style={{marginVertical: 35, paddingHorizontal: 70}}>
                    <Controller
                        defaultValue=""
                        name="amount"
                        control={control}
                        rules={{
                            pattern: {value: /^(0|[1-9][0-9]*)$/, message: "Input must contain numbers"},
                            required: {value: true, message: "input must be filled"},
                            validate: value => parseInt(value) < parseInt(currentAmount) || "Your balance is not sufficient to make the transfer"
                        }}
                        render={(props) => (
                            <>
                                <TextInput
                                onChangeText={(text) => props.onChange(text)}
                                value={amount}
                                placeholder="0.00"
                                placeholderTextColor="#B5BDCC"
                                keyboardType={'number-pad'}
                                style={{backgroundColor: "transparent", textAlign:"center", fontSize: 42, fontWeight:"bold"}}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="amount"
                                    render={({message}) => <HelperText type="error">{message}</HelperText>}
                                />
                            </>
                        )}
                    />
                </View> 
                <View style={{marginVertical: 35, paddingHorizontal: 10}}>
                    <Controller
                        defaultValue=""
                        control={control}
                        name="notes"
                        rules={{
                            pattern: {value: /^[a-zA-Z0-9 ]*$/gm, message: "Must contain letters and numbers"}
                        }}
                        render={(props) => (
                        <>
                            <Input
                                error={errors.notes}
                                onChangeText={(text) => props.onChange(text)}
                                placeholder="Add some notes" 
                                style={{backgroundColor: "transparent"}}
                                left={
                                    <Input.Icon icon="pencil" color="rgba(169, 169, 169, 0.6)"/>
                                }
                            />
                            <ErrorMessage
                                errors={errors}
                                name="notes"
                                render={({message}) => <HelperText type="error">{message}</HelperText>}
                            />
                        </>
                        )}
                    />
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <Button onPress={handleSubmit(onSubmit)} mode="contained" color="#6379F4" style={{borderRadius: 10, padding: 10}}>
                        <Text style={{color: "#fff", fontWeight: "bold"}}>Next Step</Text>
                    </Button>
                </View> 
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: Dimensions.get("screen").width,
        height: "100%"
    }
})

export default Amount;