import React  from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Dimensions, StyleSheet, Image, TextInput, BackHandler } from "react-native";
import { Text, Appbar, Card, Title, Subheading, TextInput as Input, Button, HelperText } from "react-native-paper";
import { formatCurrency } from "../../utils/currency";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import { setDefault, setField } from "../../redux/actions/Transaction";
import _ from "lodash";

const Amount = (props) => {
    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.Profile);
    const { success, user, field } = useSelector((s) => s.Transaction);
    const { container } = Styles;
    const [image, setImage] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const { handleSubmit, control, errors } = useForm();

    const backAction = () => {
        dispatch(setDefault());
        return true;
    }

    useFocusEffect(
        React.useCallback(() => {
            let unmounted = false;
            if(!success){
                return props.navigation.navigate("Transfers");
            }
            if(!_.isEmpty(field)){
                return props.navigation.navigate("Confirmation");
            }
            if(!unmounted){
                if(!_.isEmpty(user)){
                    setImage(user[0].photo);
                    setName(`${user[0].firstName} ${user[0].lastName}`);
                    setPhone(`${user[0].phone}`);
                }
            }

            const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
            return () => {
                unmounted = true;
                backHandler.remove();
            }
        },[success, user, field])
    )

    const onSubmit = (result) => {
        dispatch(setField(result));
    }

    return (
        <View style={container}>
            <Appbar style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => dispatch(setDefault())}/>
                <Appbar.Content title="Transfers"/>
            </Appbar>
            <View style={{padding: 10}}>
                <Card style={{padding: 10, marginVertical: 10}}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={{width: 60, height: 60, borderRadius: 10}} source={{uri: image ? image :  "https://i.stack.imgur.com/l60Hf.png" }}/>
                        <Card.Content>
                        <Title style={{color: "#4D4B57", fontWeight: "bold", fontSize:16}}>{name ? name : "default"}</Title>
                        <Subheading style={{color: "#7A7886", fontSize: 14}}>{`+62 ${phone ? phone : "0"}`}</Subheading>
                        </Card.Content>
                    </View>
                </Card>
                <View style={{marginVertical: 25}}>
                <Text style={{textAlign: "center", fontWeight: "bold", color: "#7C7895", fontSize: 16}}>{`Rp ${formatCurrency(data.balance)} Available`}</Text>
                </View>
                <View style={{marginVertical: 35, paddingHorizontal: 70}}>
                    <Controller
                        defaultValue=""
                        name="amount"
                        control={control}
                        rules={{
                            pattern: {value: /^(0|[1-9][0-9]*)$/, message: "Input must contain numbers"},
                            required: {value: true, message: "input must be filled"},
                            validate: value => parseInt(value) < parseInt(data.balance) || "Your balance is not sufficient to make the transfer"
                        }}
                        render={(props) => (
                            <>
                                <TextInput
                                onChangeText={(text) => props.onChange(text)}
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
                        name="note"
                        rules={{
                            pattern: {value: /^[a-zA-Z0-9 ]*$/gm, message: "Must contain letters and numbers"}
                        }}
                        render={(props) => (
                        <>
                            <Input
                                error={errors.note}
                                onChangeText={(text) => props.onChange(text)}
                                placeholder="Add some note" 
                                style={{backgroundColor: "transparent"}}
                                left={
                                    <Input.Icon icon="pencil" color="rgba(169, 169, 169, 0.6)"/>
                                }
                            />
                            <ErrorMessage
                                errors={errors}
                                name="note"
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