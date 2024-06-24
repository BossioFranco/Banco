import { useNavigation } from '@react-navigation/native';

const useProductListNavigation = () => {
    const navigator = useNavigation();

    const navigateToEdit = (product) => {
        navigator.navigate('Edit', { product });
    };

    const navigateToRegister = () => {
        navigator.navigate('Register', { state: 'create' });
    };

    return { navigateToEdit, navigateToRegister };
};

export default useProductListNavigation;