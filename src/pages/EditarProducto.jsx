import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ModalEditar from "../components/Modal";
import { useNavigation } from "@react-navigation/native";



const EditarProducto = ({ navigation, route }) => {

    const navigator = useNavigation()
    const handlePress = (item) => {
        navigator.navigate('Register', { producto: item })
    };


    return (
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ID: {route.params.producto.id}</Text>
                <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14, }}>Información extra</Text>
            </View>
            <View style={{ marginBottom: 80 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14, }}>Nombre</Text>
                    <Text style={{ fontWeight: 'bold', }}>{route.params.producto.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14, }}>Descripción</Text>
                    <Text style={{ fontWeight: 'bold' }}>{route.params.producto.description}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text>Logo</Text>
                </View>
                <View style={{ width: 300, height: 155, marginBottom: 15 }}>
                    <Image
                        source={{ uri: route.params.producto.logo }}
                        style={{ flex: 1 }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14, }}>Fecha liberación</Text>
                    <Text style={{ fontWeight: 'bold' }}>{route.params.producto.date_release}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14, }}>Fecha revisión</Text>
                    <Text style={{ fontWeight: 'bold' }}>{route.params.producto.date_revision}</Text>
                </View>
            </View>

            <View >
                <TouchableOpacity onPress={() => { handlePress(route.params.producto) }} style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ color: 'black', fontWeight: '500' }}>Editar</Text>
                </TouchableOpacity>
                <ModalEditar nombre={route.params.producto.name} id={route.params.producto.id} />
            </View>
        </View>
    )
}

export default EditarProducto