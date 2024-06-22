import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ModalEditar = ({ nombre, id }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigator = useNavigation();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://192.168.0.244:3002/bp/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                Alert.alert('Éxito', 'Producto eliminado correctamente.');
                navigator.navigate('Home')
                // Aquí podrías agregar lógica adicional, como actualizar la lista de productos en tu pantalla principal.
            } else {
                const data = await response.json();
                Alert.alert('Error', data.message || 'Algo salió mal al eliminar el producto.');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
        setModalVisible(false); // Cerrar el modal después de la acción
        navigator.navigate('Home'); // Navegar de vuelta a la pantalla principal (ajusta según sea necesario)
    };

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 20, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 10 }}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ fontSize: 24 }}>x</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 30, marginBottom: 30, borderColor: 'grey', borderTopWidth: 0.3, borderBottomWidth: 0.3, paddingVertical: 45, width: '100%' }}>
                            <Text style={{ paddingHorizontal: 3, alignSelf: 'center' }}>¿Estás seguro de eliminar el producto {nombre}?</Text>
                        </View>

                        <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '90%', borderRadius: 5 }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '90%', borderRadius: 5 }}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ color: 'black', fontWeight: '500' }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => { setModalVisible(true) }}
                style={{ backgroundColor: 'red', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}
            >
                <Text style={{ color: 'black', fontWeight: '500' }}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalEditar;