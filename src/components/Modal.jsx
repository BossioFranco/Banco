import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { REACT_NATIVE_APP_API_URL } from '@env';
import { Entypo } from '@expo/vector-icons';

const EditModal = ({ name, id }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigator = useNavigation();

    const handleDelete = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_APP_API_URL}/bp/products/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                Alert.alert('Success', 'Product deleted successfully.');
                navigator.navigate('Home');
            } else {
                const data = await response.json();
                Alert.alert('Error', data.message || 'Something went wrong while deleting the product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'Could not connect to the server.');
        }
        setModalVisible(false); 
        navigator.navigate('Home'); 
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
                            <Entypo name="cross" size={34} color="black" />
                        </TouchableOpacity>
                        <View style={{ marginTop: 30, marginBottom: 30, borderColor: 'grey', borderTopWidth: 0.3, borderBottomWidth: 0.3, paddingVertical: 45, width: '100%' }}>
                            <Text style={{ paddingHorizontal: 3, alignSelf: 'center' }}>Are you sure you want to delete {name}?</Text>
                        </View>

                        <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '90%', borderRadius: 5 }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '90%', borderRadius: 5 }}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ color: 'black', fontWeight: '500' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={() => { setModalVisible(true) }}
                style={{ backgroundColor: 'red', height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5 }}
            >
                <Text style={{ color: 'black', fontWeight: '500' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditModal;