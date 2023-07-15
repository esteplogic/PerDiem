import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import Login from "./Login";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Tabbar({ navigation }) {

    const [auth, setAuth] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused()

    const isloggined = async () => {
        const get = await AsyncStorage.getItem('loggedIn');
        console.log('authh', get)
        if (get?.length > 0) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }

    useEffect(() => {
        isloggined()
    }, [isFocused])


    const ApiData = () => {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }



    return (
        <View style={{ height: 100 , padding:30 }}>
            <Text>Tabbar</Text>
        </View>
    )
}
export default Tabbar;