import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";




function Register(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [buttonDesiable, setButtonDisable] = useState(false)
    const [save, setSave] = useState([])

    const {navigation , setAuth} = props;

    let inValid = true;
    const validate = async () => {
        setButtonDisable(true)
        if (email == '') {
            setError(true);
            inValid = false;
        } else {
            setError(false)
        }
        if (password == '') {
            setError(true);
            inValid = false;
        } else {
            setError(false)
        }
        if (inValid == true) {
            regsiter();
        } else {
            setButtonDisable(false)
        }
    }


    const regsiter = async () => {

        let time = new Date()
        let sec = Date.parse(time)
        var get = await AsyncStorage.getItem('register');
        if (email != '' && password != '') {
            if (get != null) {
                if (get.length > 0) {
                    let parsedData = await JSON.parse(get)
                    let check = parsedData.filter((e) => e.email == email.trim());
                    if (check.length > 0) {
                        Alert.alert('user already exits');
                        return
                    } else {
                        var newData = [...parsedData, { id: sec, email: email, password: password }]
                        let data = [{email , password , id:sec}]
                        await AsyncStorage.setItem('register', JSON.stringify(newData))
                        await AsyncStorage.setItem('loggedIn', JSON.stringify(data))
                        setAuth(true)
                    }
                }
            } else {
                const data = [{ id: sec, email: email, password: password }]
                await AsyncStorage.setItem('register', JSON.stringify(data))
                await AsyncStorage.setItem('loggedIn', JSON.stringify(data))
                Alert.alert(' Register SuccessFull');
                navigation.navigate('Perdiem')
                setEmail('')
                setPassword('')
            }
        } else {
            Alert.alert('please fill input first ')
        }
    }

    // ---------- for delete the data of register localStorage -------
    // const deleteData = async () => {
    //     try {
    //         await AsyncStorage.removeItem('register');
    //         console.log('register  Data deleted successfully.');
    //     } catch (error) {
    //         console.log('Error deleting data: ', error);
    //     }
    // }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 25 }}>
            <Text style={{ fontWeight: "900", backgroundColor: "#fff", fontSize: 25, textAlign: 'center', paddingTop: 60, paddingBottom: 31, color: 'black', marginTop: 50 }}> Sign-Up  </Text>
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
                <TouchableOpacity onPress={() => validate()} >
                    <Text style={{ backgroundColor: '#00aff0', color: 'white', padding: 11, fontWeight: '800', textAlign: 'center', fontSize: 14, borderRadius: 5, height: 45 }}> Sign-up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register;