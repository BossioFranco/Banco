import React from "react";
import { View, Text, } from "react-native";
import Navigation from "./components/Navigation";
import { FontAwesome } from '@expo/vector-icons';
const Index = () => {
    return (
        <View style={{ flex: 1, borderWidth: 3, margin: 10 }}>
            <View >
                <View style={{ alignItems: 'center', borderBottomWidth: 0.3, justifyContent: 'center', height: 60 }}>

                    <Text style={{ color: '#667497', fontWeight: 'bold', fontSize: 16 }}><FontAwesome name="bank" size={24} color="#667497" /> BANCO</Text>
                </View>


            </View>
            <Navigation />
        </View>
    )
}
export default Index