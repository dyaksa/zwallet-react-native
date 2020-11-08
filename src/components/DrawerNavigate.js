import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Image } from "react-native";
import { AuthLogout } from "../redux/actions/Auth";
import { useDispatch } from "react-redux";
import { Drawer, Subheading, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerNavigate = (props) => {
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(AuthLogout());
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={Style.drawer__content}>
                    <View>
                        <View style={{paddingVertical: 25, paddingHorizontal: 10 ,flexDirection: "row"}}>
                            <Image style={{width: 52, height: 52, borderRadius: 10, marginRight: 20}} source={{uri: "https://i.stack.imgur.com/l60Hf.png"}}/>
                        <View >
                            <Subheading style={{fontSize: 15, color: "#646464"}}>Hello</Subheading>
                            <Text style={{fontSize: 18, color: "#646464"}}>Rober Chandler</Text>
                    </View>
                </View>
                    </View>
                    <Drawer.Section style={Style.bottom__drawerSection}>
                        <DrawerItem
                            icon={({color,size}) => (
                                <Icon 
                                    name="view-dashboard-outline"
                                    color={color}
                                    size={size}
                                />
                            )} 
                            label="Dashboard"
                            onPress={() => props.navigation.navigate("Dashboard")}
                        />
                        <DrawerItem
                            icon={({color,size}) => (
                                <Icon
                                    name="arrow-up"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Transfers"
                            onPress={() => props.navigation.navigate("Transfers")}
                        />
                        <DrawerItem
                            icon={({color,size}) => (
                                <Icon
                                    name="plus"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Topup"
                            onPress={() => props.navigation.navigate("Topup")}
                        />
                        <DrawerItem
                            icon={({color,size}) => (
                                <Icon
                                    name="account"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => props.navigation.navigate("Profile")}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={Style.bottom__drawerSection}>
                <DrawerItem
                    icon={({color,size}) => (
                        <Icon 
                            name="exit-to-app" 
                            color={color} 
                            size={size}
                                />
                        )} 
                        label="Sign Out"
                        onPress={handleLogout}
                    />
                </Drawer.Section>
        </View>
    )
}

const Style = StyleSheet.create({
    drawer__content: {
        flex: 1
    },

    drawer__section: {
        marginTop: 15
    },
    bottom__drawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    }
})

export default DrawerNavigate;