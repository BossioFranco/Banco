import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useProductListData from './components/hooks/useProductListData';
import useProductListNavigation from './components/hooks/useProductListNavigation';
import useSkeletonLoader from './components/hooks/useSkeletonLoader';
import { useIsFocused } from '@react-navigation/native';


const ProductList = () => {
    const { loading, error, products, refetchProducts } = useProductListData();
    const { navigateToEdit, navigateToRegister } = useProductListNavigation(refetchProducts);
    const { showSkeleton, renderSkeleton, startSkeletonTimer } = useSkeletonLoader();
    const [search, setSearch] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            startSkeletonTimer();
            refetchProducts();
        }
    }, [isFocused, refetchProducts, startSkeletonTimer]);

    const handleSearchChange = (text) => {
        setSearch(text);
    };

    const filteredList = products.filter(item =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToEdit(item)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginHorizontal: 16, borderWidth: 0.2 }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text>ID: {item.id}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <TextInput
                    style={{ flex: 1, height: 40, marginHorizontal: 12, borderWidth: 1, padding: 10 }}
                    placeholder="Search..."
                    onChangeText={handleSearchChange}
                    value={search}
                />
                {search !== '' && (
                    <TouchableOpacity onPress={() => setSearch('')} style={{ padding: 10 }}>
                        <Ionicons name="close-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            {showSkeleton && (
                <View style={{marginTop: 25}}>
                    {renderSkeleton()}
                    {renderSkeleton()}
                    {renderSkeleton()}
                </View>
            )}
            {!showSkeleton && loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            {!loading && error && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Error loading data: {error.message}</Text>
                </View>
            )}
            {!showSkeleton && !loading && !error && filteredList.length === 0 && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No products found</Text>
                </View>
            )}
            {!showSkeleton && !loading && !error && filteredList.length > 0 && (
                <FlatList
                    style={{ marginTop: 25, marginBottom: 50 }}
                    data={filteredList}
                    renderItem={renderProductItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
            {!showSkeleton && (
                <TouchableOpacity onPress={navigateToRegister} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 5, width: '90%', marginBottom: 20 }}>
                    <Text style={{ color: 'black', fontWeight: '500' }}>Add</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProductList;