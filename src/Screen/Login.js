import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";



function Login({ navigation, setAuth }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');


    const Submit = async () => {
        const get = await AsyncStorage.getItem('register');

        if (get != null) {
            if (get.length > 0) {
                let parsedData = await JSON.parse(get)
                let check = parsedData.filter((e) => e.email == email.trim() && e.password == password.trim());
                if (check.length > 0) {
                    // Alert.alert('Login sucessFully');
                    console.log(check)
                    await AsyncStorage.setItem('loggedIn', JSON.stringify(check));
                    setEmail('')
                    setPassword('')
                    setAuth(true)
                } else {
                    Alert.alert('User detail is wrong')
                }
            }
        }
        else {
            Alert.alert('Does not have this account')
            return
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 25 }}>
            <Text style={{ fontWeight: "900", backgroundColor: "#fff", fontSize: 25, textAlign: 'center', paddingTop: 60, paddingBottom: 31, color: 'black', marginTop: 50 }}> Login  </Text>
            <View>
                <TextInput
                    onChangeText={(e) => setEmail(e)}
                    placeholderTextColor='grey'
                    placeholder="Email Address"
                    value={email}
                    style={{ paddingLeft: 15, marginBottom: 16, borderWidth: 1, borderColor: 'lightgrey', color: 'black', fontSize: 12, backgroundColor: '#fff', padding: 5, borderRadius: 5 }}
                />
                <TextInput
                    onChangeText={(e) => setPassword(e)}
                    placeholderTextColor='grey'
                    placeholder="Password"
                    value={password}
                    style={{ paddingLeft: 15, borderWidth: 1, marginBottom: 20, borderColor: 'lightgrey', color: 'black', fontSize: 12, backgroundColor: '#fff', padding: 5, borderRadius: 5 }}
                />
                <TouchableOpacity onPress={() => Submit()} >
                    <Text style={{ backgroundColor: '#00aff0', color: 'white', padding: 11, fontWeight: '800', textAlign: 'center', fontSize: 14, borderRadius: 5, height: 45 }}> Login</Text>
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', color: 'grey', paddingBottom: 14, paddingTop: 20, fontSize: 15 }}> or </Text>

                <Text style={{ color: 'grey', textAlign: 'center' }}> Don't have an account? <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                    <View style={{ borderBottomColor: '#00aff0', marginTop: 10, borderBottomWidth: 0.5 }}><Text style={{ fontSize: 13, color: '#00aff0', fontWeight: 'bold' }}>Sign Up</Text></View>
                </TouchableOpacity> </Text>
            </View>
        </View>
    )
}

export default Login;