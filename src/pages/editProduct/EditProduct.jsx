import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ModalEdit from "./../../components/Modal";
import ProductInfo from "./components/ProductInfo";

import useProductNavigation from "./components/hooks/useProductNavigation";
const EditProduct = ({ route }) => {
    const navigateToRegister = useProductNavigation();

    const handleEdit = () => {
        navigateToRegister(route.params.product);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
            <ProductInfo product={route.params.product} uri={route.params.product.logo} />
            <TouchableOpacity onPress={handleEdit} style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: 'black', fontWeight: '500' }}>Edit</Text>
            </TouchableOpacity>
            <ModalEdit name={route.params.product.name} id={route.params.product.id} />
        </View>
    );
};

export default EditProduct;