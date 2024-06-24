import { useState, useEffect, useCallback } from 'react';
import { REACT_NATIVE_APP_API_URL } from '@env';

const useProductListData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(() => {
        setLoading(true);
        fetch(`${REACT_NATIVE_APP_API_URL}/bp/products`, { method: 'GET' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) {
                    // Invertir la lista de productos
                    const reversedProducts = data.data.reverse();
                    setProducts(reversedProducts);
                } else {
                    throw new Error('Received data is not a valid array under the "data" property.');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetchProducts: fetchProducts };
};

export default useProductListData;