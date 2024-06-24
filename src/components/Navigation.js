import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import ProductList from '../pages/productList/ProductList';
import RegisterProduct from '../pages/registerProduct/RegisterProduct';
import EditProduct from '../pages/editProduct/EditProduct';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}>
            <Stack.Screen name="Home" component={ProductList} />
            <Stack.Screen name="Register" component={RegisterProduct} />
            <Stack.Screen name="Edit" component={EditProduct} />
        </Stack.Navigator>
    );
};

export default Navigation;