import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {Login, Signup, Homes, Pin, Success, ForgotEmailScreen, ForgotPasswordScreen } from "../screen";
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
                    <Stack.Screen name="Pin" options={{headerShown: false}}>
                        {props => <Pin {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Success" options={{headerShown: false}}>
                        {props => <Success {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="ForgotEmailScreen" options={{headerShown: false}}>
                        {props => <ForgotEmailScreen {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    <Stack.Screen name="ForgotPasswordScreen" options={{headerShown: false}}>
                        {props => <ForgotPasswordScreen {...props} navigation={props.navigation}/>}
                    </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;