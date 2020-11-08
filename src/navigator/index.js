import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Login, Signup, Homes } from "../screen";
import { useSelector } from "react-redux";

const MainNavigator = (props) => {
    const Stack = createStackNavigator();
    const Auth = useSelector((s) => s.Auth);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {Auth.data.accessToken ? (
                    <>
                        <Stack.Screen name="Homes" options={{headerShown: false}}>
                            {props => <Homes {...props} navigation={props.navigation}/>}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Login" options={{headerShown: false}}>
                        {props => <Login {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Signup" options={{headerShown: false}}>
                        {props => <Signup {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;