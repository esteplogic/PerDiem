import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from "react-native";


function Home(props) {

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('')
    const [data, setData] = useState([])

    const { setAuth, navigation, auth } = props;
    let width = Dimensions.get('screen').width

    const LogOut = async () => {
        await AsyncStorage.removeItem('loggedIn').then(()=>{
            setAuth(false)
            console.log("logout success")
        })
    }


    const getDate = async () => {
        let get = await AsyncStorage.getItem('loggedIn')
        if (get?.length) {
            let parseData = JSON.parse(get);
            setUserName(parseData[0].email)
        }
    }
    useEffect(() => {
        getDate()
    }, []);


    const ApiData = () => {
        setLoading(true)
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((resp) => resp.json())
                .then((json) => setData(json))
                
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }, 2000)
    }


    const ApiData2 = () => {
        setLoading(true)
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then((resp) => resp.json())
                .then((json) => setData(json))
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
        }, 2000)
    }


    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            {loading ? <View style={{ marginTop: 300 }}>
                <ActivityIndicator size={30} color={'black'} /></View> : <View>
                {auth ? <View style={{ fontSize: 22, textAlign: 'center', height: '100%' }}>

                    <FlatList
                        data={data}
                        style={{ marginBottom: 50 }}
                        stickyHeaderIndices={[0]}
                        ListEmptyComponent={() => <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 200 }}><Text style={{ color: 'black' }}>Please fetch data !</Text></View>}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <View style={{ backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 5 }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                            <Text style={{ color: 'black', fontSize: 20, width: 200 }}>welcome {userName}</Text>
                                            <TouchableOpacity onPress={LogOut} style={{ marginLeft: 'auto' }} >
                                                <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'black', padding: 5, marginTop: 8, borderRadius: 5, fontWeight: '500', marginRight: 5 }}> Logout </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )
                        }}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ flex: 1, padding: 7, borderWidth: 1, margin: 5, borderRadius: 10, borderColor: '#ccc' }}>
                                <Text style={{ color: 'black' }}>#{item.id}</Text>
                                <Text style={{ color: 'black', fontWeight: '600', marginTop: 3 }}>Tilte: <Text style={{ fontWeight: '400', fontSize: 13 }}>{item.title}</Text></Text>
                                {
                                   item.body? <Text style={{ color: 'black', fontWeight: '600', marginTop: 3 }}>Body: <Text style={{ fontWeight: '400', fontSize: 13 }}>{item.body}</Text></Text>
                                    :
                                    <Text  style={{ color: 'black', fontWeight: '600', marginTop: 3 }}>Completed:{item.completed ? "Yes" : "No"}</Text>
                                }
                            </View>
                        )}
                    />

                    <View style={{ backgroundColor: 'white', width: width, position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={ApiData} style={{ backgroundColor: '#ccc', width: 100, borderRadius: 8, textAlign: 'center', paddingVertical: 8 }}>
                            <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}> Fetch 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ApiData2} style={{ backgroundColor: '#ccc', width: 100, borderRadius: 8, textAlign: 'center', paddingVertical: 8 }}>
                            <Text style={{ fontSize: 14, color: 'black', textAlign: 'center' }}> Fetch 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    : <Text style={{ fontWeight: 400, color: 'black', fontSize: 22, textAlign: 'center', paddingTop: 60 }}> Welcome To Home</Text>
                }
            </View>}
        </View>)
}
export default Home; 
