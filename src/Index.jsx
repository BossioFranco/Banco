import React from "react";
import { View, Text, } from "react-native";
import Navigation from "./components/Navegador";
const Index = () => {
    return (
        <View style={{flex:1, borderWidth:3, margin:10}}>
            <View >
                <View style={{ alignItems: 'center', marginTop: 15, borderBottomWidth: 0.3, justifyContent: 'center', height: 50 }}>
                    <Text style={{ color: '#667497', fontWeight: 'bold', fontSize: 16 }}>BANCO</Text>
                </View>
            </View>
            <Navigation />
        </View>
    )
}
export default Index