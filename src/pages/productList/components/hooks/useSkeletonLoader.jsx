import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';

const useSkeletonLoader = () => {
    const [showSkeleton, setShowSkeleton] = useState(true);

    const startSkeletonTimer = useCallback(() => {
        setShowSkeleton(true);
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        startSkeletonTimer();
    }, [startSkeletonTimer]);

    const renderSkeleton = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginHorizontal: 16, borderWidth: 0.2, backgroundColor: '#e0e0e0',   }}>
            <View>
                <View style={{ width: 100, height: 20, backgroundColor: '#c0c0c0', marginBottom: 10 }} />
                <View style={{ width: 50, height: 20, backgroundColor: '#c0c0c0' }} />
            </View>
            <View style={{ width: 24, height: 24, backgroundColor: '#c0c0c0' }} />
        </View>
    );

    return { showSkeleton, renderSkeleton, startSkeletonTimer };
};

export default useSkeletonLoader;