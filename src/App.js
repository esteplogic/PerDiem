import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Screen/Register";
import Login from "./Screen/Login";
import Home from "./Screen/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";


export default function App() {

    const [auth, setAuth] = useState(false)

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();


    function HomeScreen() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }} >
                <Tab.Screen name='Home'
                    children={() => <Home auth={auth} setAuth={setAuth} />}
                    options={{ tabBarIcon: (props) => <Image style={{ width: 20, height: 20, tintColor: props.focused ? 'skyblue' : 'black' }} source={require('./assets/home.png')} /> }} />

                <Tab.Screen name='Login'
                    children={(props) => <Login setAuth={setAuth} {...props} />}
                    options={{ tabBarIcon: (props) => <Image style={{ width: 20, height: 20, tintColor: props.focused ? 'skyblue' : 'black' }} source={require('./assets/login.png')} /> }} />
            </Tab.Navigator>
        )
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: true }} >
                {!auth ?
                    <>
                        <Stack.Screen name='Perdiem' component={HomeScreen} />
                        <Stack.Screen name='Register' component={Register} />
                    </>
                    :
                    <Stack.Screen name='Perdiem'
                        children={() => <Home auth={auth} setAuth={setAuth}
                        />} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
