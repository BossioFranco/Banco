import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListadoProductos from '../pages/ListadoProductos';
import RegistrarProducto from '../pages/RegistrarProducto';
import EditarProducto from '../pages/EditarProducto';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Opcional: ocultar la barra de navegación si no la necesitas
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.5, 1],
                            extrapolate: 'clamp',
                        }),
                    },
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0 } }, // Sin animación al abrir
                        close: { animation: 'timing', config: { duration: 0 } }, // Sin animación al cerrar
                    },
                }),
            }}
        >
            <Stack.Screen name="Home" component={ListadoProductos} />
            <Stack.Screen name="Register" component={RegistrarProducto} />
            <Stack.Screen name="Edit" component={EditarProducto} />
        </Stack.Navigator>
    );
};

export default Navigation;