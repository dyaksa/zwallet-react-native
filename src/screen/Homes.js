import React from "react";
import DrawerNavigate from "../components/DrawerNavigate";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dashboard, Details, History } from "./Home";
import { Transfers, Amount, Confirmation, Pin as TransferPin, Success } from "./Tranfers";
import { Topup } from "./Topup";
import { Profile, Password, Information, Pin, Phone } from "./Profile";
import { Notification } from "./Notification";
import { WebViewUI } from "./Payment/WebViewUI";


const Drawer = createDrawerNavigator();

const Homes = (props) => {
    return (
        <Drawer.Navigator
            drawerType="back"
            initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerNavigate {...props}/>}
        >
            <Drawer.Screen name="Notification" component={Notification}/>
            <Drawer.Screen name="Dashboard" component={Dashboard}/>
            <Drawer.Screen name="Details" component={Details}/>
            <Drawer.Screen name="History" component={History}/>
            <Drawer.Screen name="Transfers" component={Transfers}/>
            <Drawer.Screen name="TransferPin" component={TransferPin}/>
            <Drawer.Screen name="TransferSuccess" component={Success}/>
            <Drawer.Screen name="Amount" component={Amount}/>
            <Drawer.Screen name="Confirmation" component={Confirmation}/>
            <Drawer.Screen name="Topup" component={Topup}/>
            <Drawer.Screen name="Profile" component={Profile}/>
            <Drawer.Screen name="Password" component={Password}/>
            <Drawer.Screen name="Information" component={Information}/>
            <Drawer.Screen name="Pin" component={Pin}/>
            <Drawer.Screen name="Phone" component={Phone}/>
            <Drawer.Screen name="Payment" component={WebViewUI}/>
        </Drawer.Navigator>
    )
}

export default Homes;