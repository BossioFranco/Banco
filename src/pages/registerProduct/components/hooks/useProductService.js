import { Alert } from 'react-native';
import { REACT_NATIVE_APP_API_URL } from '@env';
import { formatDateReleaseFetch } from '../dateUtils';
const editProduct = async (product, navigation, resetForm) => {
    const { id, name, description, logo, releaseDate, revisionDate } = product;

    const productData = {
        id,
        name,
        description,
        logo,
        date_release: formatDateReleaseFetch(releaseDate),
        date_revision: formatDateReleaseFetch(revisionDate)
    };

    try {
        const response = await fetch(`${REACT_NATIVE_APP_API_URL}/bp/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        if (response.ok) {
            Alert.alert('Success', 'Product edited successfully.');
            resetForm();
            navigation.navigate('Home');
        } else {
            Alert.alert('Error', data.message || 'Something went wrong.');
        }
    } catch (error) {
        console.error('Error editing product:', error);
        Alert.alert('Error', 'Could not connect to server.');
    }
};

const createProduct = async (product, navigation, resetForm) => {
    const { id, name, description, logo, releaseDate, revisionDate } = product;

    const productData = {
        id,
        name,
        description,
        logo,
        date_release: formatDateReleaseFetch(releaseDate),
        date_revision: formatDateReleaseFetch(revisionDate)
    };

    try {
        const response = await fetch(`${REACT_NATIVE_APP_API_URL}/bp/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        if (response.ok) {
            Alert.alert('Success', 'Product created successfully.');
            resetForm();
            navigation.goBack();
        } else {
            Alert.alert('Error', data.message || 'Something went wrong.');
        }
    } catch (error) {
        console.error('Error creating product:', error);
        Alert.alert('Error', 'Could not connect to server.');
    }
};

export {
    editProduct,
    createProduct
};