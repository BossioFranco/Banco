import { useNavigation } from '@react-navigation/native';

const useProductNavigation = () => {
    const navigator = useNavigation();

    const navigateToRegister = (product) => {
        navigator.navigate('Register', { product });
    };

    return navigateToRegister;
};

export default useProductNavigation;