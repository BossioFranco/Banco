import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ListadoProductos = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigator = useNavigation();

    const fetchData = () => {
        fetch('http://192.168.0.244:3002/bp/products', { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else {
                    throw new Error('Los datos recibidos no son un array válido bajo la propiedad "data".');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error en la solicitud fetch:', error);
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const filteredList = products.filter(item =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (item) => {
        navigator.navigate('Edit', { producto: item });
    };

    const handlePressAgregar = () => {
        navigator.navigate('Register', { estado: 'crear' });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginHorizontal: 16, borderWidth: 0.2 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>ID: {item.id}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error al cargar los datos: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <TextInput
                    style={{ flex: 1, height: 40, marginHorizontal: 12, borderWidth: 1, padding: 10 }}
                    placeholder="Buscar por nombre..."
                    onChangeText={setSearch}
                    value={search}
                />
                {search !== '' && (
                    <TouchableOpacity onPress={() => setSearch('')} style={{ padding: 10 }}>
                        <Ionicons name="close-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            {filteredList.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No se encontraron productos</Text>
                </View>
            ) : (
                <FlatList
                    style={{ marginTop: 25, marginBottom: 50 }}
                    data={filteredList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
            <TouchableOpacity onPress={handlePressAgregar} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, width: '90%', marginBottom: 20 }}>
                <Text style={{ color: 'black', fontWeight: '500' }}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ListadoProductos;