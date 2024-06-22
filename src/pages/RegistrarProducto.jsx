import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
import { validateProduct } from "../components/Validacion";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation

const RegistrarProducto = ({ navigation, route }) => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [logo, setLogo] = useState('');
    const [fechaLiberacion, setFechaLiberacion] = useState('');
    const [fechaRevision, setFechaRevision] = useState('');
    const [errors, setErrors] = useState({});

    const reiniciar = () => {
        setId('');
        setNombre('');
        setDescripcion('');
        setLogo('');
        setFechaLiberacion('');
        setFechaRevision('');
        setErrors({});
    };

    const editar = async () => {
        const validationErrors = validateProduct(id, nombre, descripcion, logo, fechaLiberacion, fechaRevision);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = {
            id,
            name: nombre,
            description: descripcion,
            logo,
            date_release: fechaLiberacion,
            date_revision: fechaRevision
        };

        try {
            const response = await fetch(`http://192.168.0.244:3002/bp/products/${route.params.producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', 'Producto editado exitosamente.');
                reiniciar();
                navigation.navigate('Home'); // Navega a la pantalla 'Home'
            } else {
                Alert.alert('Error', data.message || 'Algo salió mal.');
            }
        } catch (error) {
            console.error('Error al editar el producto:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    const crear = async () => {
        const validationErrors = validateProduct(id, nombre, descripcion, logo, fechaLiberacion, fechaRevision);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = {
            id,
            name: nombre,
            description: descripcion,
            logo,
            date_release: fechaLiberacion,
            date_revision: fechaRevision
        };

        try {
            const response = await fetch('http://192.168.0.244:3002/bp/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', 'Producto creado exitosamente.');
                reiniciar();
                navigation.navigate('Home'); // Navega a la pantalla 'Home'
            } else {
                Alert.alert('Error', data.message || 'Algo salió mal.');
            }
        } catch (error) {
            console.error('Error al crear el producto:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    useEffect(() => {
        if (route.params && route.params.producto) {
            const { id, name, description, logo, date_release, date_revision } = route.params.producto;
            setId(id?.toString() || '');
            setNombre(name || '');
            setDescripcion(description || '');
            setLogo(logo || '');
            setFechaLiberacion(date_release || '');
            setFechaRevision(date_revision || '');
        }
    }, [navigation, route]);

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, padding: 10 }}>
                    <Text style={{ marginBottom: 5, fontSize: 24, fontWeight: '700' }}>Formulario de Registro</Text>
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700', marginTop: 20 }}>ID</Text>
                    <TextInput
                        value={id}
                        onChangeText={(text) => {
                            setId(text);
                            setErrors((prev) => ({ ...prev, id: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.id ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.id ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.id}</Text> : null}

                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Nombre</Text>
                    <TextInput
                        value={nombre}
                        onChangeText={(text) => {
                            setNombre(text);
                            setErrors((prev) => ({ ...prev, nombre: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.nombre ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.nombre ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.nombre}</Text> : null}

                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Descripción</Text>
                    <TextInput
                        value={descripcion}
                        onChangeText={(text) => {
                            setDescripcion(text);
                            setErrors((prev) => ({ ...prev, descripcion: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.descripcion ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.descripcion ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.descripcion}</Text> : null}

                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>LOGO</Text>
                    <TextInput
                        value={logo}
                        onChangeText={(text) => {
                            setLogo(text);
                            setErrors((prev) => ({ ...prev, logo: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.logo ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.logo ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.logo}</Text> : null}

                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Fecha Liberación</Text>
                    <TextInput
                        value={fechaLiberacion}
                        onChangeText={(text) => {
                            setFechaLiberacion(text);
                            setErrors((prev) => ({ ...prev, fechaLiberacion: '' }));
                        }}
                        dataDetectorTypes={'calendarEvent'}
                        style={{ borderWidth: 1, borderColor: errors.fechaLiberacion ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.fechaLiberacion ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.fechaLiberacion}</Text> : null}

                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Fecha Revisión</Text>
                    <TextInput
                        value={fechaRevision}
                        onChangeText={(text) => {
                            setFechaRevision(text);
                            setErrors((prev) => ({ ...prev, fechaRevision: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.fechaRevision ? 'red' : 'gray', marginBottom: 5, padding: 5 }}
                    />
                    {errors.fechaRevision ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.fechaRevision}</Text> : null}

                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity onPress={route.params?.estado === 'crear' ? crear : editar} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={reiniciar} style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Reiniciar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default RegistrarProducto;