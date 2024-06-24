import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from "react-native";
import { validateProduct } from "../../components/ValidateProduct";
import { formatDateRelease, formatDateReleaseFetch } from "./components/dateUtils";
import { editProduct, createProduct } from "./components/hooks/useProductService";

const RegisterProduct = ({ navigation, route }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [revisionDate, setRevisionDate] = useState('');
    const [errors, setErrors] = useState({});

    const handleReleaseDateChange = () => {
        const [day, month, year] = releaseDate.split('/');
        const nextYear = parseInt(year, 10) + 1;
        const nextDate = `${day}/${month}/${nextYear}`;
        setRevisionDate(nextDate);
    };
    const resetForm = () => {
        setId('');
        setName('');
        setDescription('');
        setLogo('');
        setReleaseDate('');
        setRevisionDate('');
        setErrors({});
    };
    const handleEditProduct = async () => {
        const validationErrors = await validateProduct(id, name, description, logo, releaseDate, 'edit');
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const product = { id, name, description, logo, releaseDate, revisionDate };
        await editProduct(product, navigation, resetForm);
    };
    const handleCreateProduct = async () => {
        const validationErrors = await validateProduct(id, name, description, logo, releaseDate, revisionDate);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const product = { id, name, description, logo, releaseDate, revisionDate };
        await createProduct(product, navigation, resetForm);
    };
    useEffect(() => {
        if (route.params && route.params.product) {
            const { id, name, description, logo, date_release, date_revision } = route.params.product;
            setId(id?.toString() || '');
            setName(name || '');
            setDescription(description || '');
            setLogo(logo || '');
            setReleaseDate(formatDateRelease(date_release) || '');
            setRevisionDate(formatDateRelease(date_revision) || '');
        }
    }, [navigation, route]);

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, padding: 10 }}>
                    <Text style={{ marginBottom: 5, fontSize: 24, fontWeight: '700' }}>Registration Form</Text>
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700', marginTop: 20 }}>ID</Text>
                    <TextInput
                        value={id}
                        onChangeText={(text) => {
                            setId(text);
                            setErrors((prev) => ({ ...prev, id: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.id ? 'red' : 'gray', marginBottom: 5, padding: 5 }} />
                    {errors.id ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.id}</Text> : null}
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.name ? 'red' : 'gray', marginBottom: 5, padding: 5 }} />
                    {errors.name ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.name}</Text> : null}
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Description</Text>
                    <TextInput
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                            setErrors((prev) => ({ ...prev, description: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.description ? 'red' : 'gray', marginBottom: 5, padding: 5 }} />
                    {errors.description ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.description}</Text> : null}
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Logo</Text>
                    <TextInput
                        value={logo}
                        onChangeText={(text) => {
                            setLogo(text);
                            setErrors((prev) => ({ ...prev, logo: '' }));
                        }}
                        style={{ borderWidth: 1, borderColor: errors.logo ? 'red' : 'gray', marginBottom: 5, padding: 5 }} />
                    {errors.logo ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.logo}</Text> : null}
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Release Date</Text>
                    <TextInput
                        value={releaseDate}
                        onBlur={handleReleaseDateChange}
                        onChangeText={(text) => {
                            setReleaseDate(text);
                            setErrors((prev) => ({ ...prev, releaseDate: '' }));
                        }}
                        dataDetectorTypes={'calendarEvent'}
                        style={{ borderWidth: 1, borderColor: errors.releaseDate ? 'red' : 'gray', marginBottom: 5, padding: 5 }} />
                    {errors.releaseDate ? <Text style={{ color: 'red', marginBottom: 15 }}>{errors.releaseDate}</Text> : null}
                    <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: '700' }}>Revision Date</Text>
                    <TextInput
                        value={revisionDate}
                        editable={false}
                        style={{ backgroundColor: '#BEBEBE', borderWidth: 1, borderColor: 'gray', marginBottom: 5, padding: 5 }} />
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity onPress={route.params?.state === 'create' ? handleCreateProduct : handleEditProduct} style={{ backgroundColor: '#FFDD00', height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={resetForm} style={{ backgroundColor: '#AFAFAF', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default RegisterProduct;