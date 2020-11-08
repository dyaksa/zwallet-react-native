import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Subheading, Appbar, Text } from "react-native-paper";

const Password = (props) => {
    const [currentPassword, setCurrentPassword] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState(null);
    const [repeatPassword, setRepeatPassword] = React.useState(null);

    return (
        <View style={Styles.container}>
            <Appbar.Header style={{backgroundColor: "transparent", elevation: 0}}>
                <Appbar.BackAction onPress={() => props.navigation.navigate("Profile")}/>
                <Appbar.Content title="Change Password"></Appbar.Content>
            </Appbar.Header>
            <View style={{padding: 15}}>
                <Subheading style={{color: "#7A7886"}}>You must enter your current password and then type your new password twice.</Subheading>
                <View style={{marginVertical: 10}}>
                    <TextInput 
                        onChangeText={text => setCurrentPassword(text)} 
                        underlineColor="rgba(169, 169, 169, 0.6)"
                        value={currentPassword} 
                        autoCapitalize="none" 
                        placeholder="Current Password" 
                        style={Styles.input} 
                        returnKeyType="next" 
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                        }
                        right={
                            <TextInput.Icon onPress={() => console.log("hello")} name={true ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                        }/>

                    <TextInput 
                        onChangeText={text => setNewPassword(text)} 
                        underlineColor="rgba(169, 169, 169, 0.6)"
                        value={newPassword} 
                        autoCapitalize="none" 
                        placeholder="New Password" 
                        style={Styles.input} 
                        returnKeyType="next"
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                        }
                        right={
                            <TextInput.Icon onPress={() => console.log("hello")} name={true ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                    }/>

                    <TextInput 
                        onChangeText={text => setRepeatPassword(text)} 
                        underlineColor="rgba(169, 169, 169, 0.6)"
                        value={repeatPassword} 
                        autoCapitalize="none" 
                        placeholder="Repeat Password" 
                        style={Styles.input} 
                        returnKeyType="next"
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon name="lock-outline" color="rgba(169, 169, 169, 0.6)" style={Styles.input__icon}/>
                        }
                        right={
                            <TextInput.Icon onPress={() => console.log("hello")} name={true ? "eye-off-outline" : "eye-outline"} color="rgba(169, 169, 169, 0.6)"/>
                    }/>
                </View>
                <View>
                    <Button style={{backgroundColor: "#6379F4", padding: 10, borderRadius: 10}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", color: "#fff"}}>Change Password</Text>
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
    },

    input: {
        marginVertical: 20,
        backgroundColor: "transparent",
        fontSize: 16,
        fontWeight: "normal",
        color: "#0000"
    },

    input__icon: {
        marginRight: 10,
    }
})
export default Password;