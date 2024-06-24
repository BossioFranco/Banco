import React from "react";
import { View, Text, Image } from "react-native";

const ProductInfo = ({ product, uri }) => {
    return (
        <View style={{ marginTop: 30 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ID: {product.id}</Text>
            <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14 }}>Extra Information</Text>

            <View style={{ marginBottom: 80 }}>
                <InfoRow label="Name" value={product.name} />
                <InfoRow label="Description" value={product.description} />
                <View style={{ width: 285, height: 155, marginBottom: 15, position: 'relative', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14 }}>Logo</Text>
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Text style={{ alignSelf: 'center', color: 'grey', fontSize: 20 }}>Error with loaded image</Text>
                    </View>
                    <Image
                        source={{ uri: uri }}
                        style={{ flex: 1, marginTop: -80 }}
                        resizeMode="contain" />
                </View>
                <InfoRow label="Release Date" value={product.date_release} />
                <InfoRow label="Revision Date" value={product.date_revision} />
            </View>
        </View>
    );
};

const InfoRow = ({ label, value }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        <Text style={{ color: 'grey', fontWeight: '500', fontSize: 14 }}>{label}</Text>
        <Text style={{ fontWeight: 'bold' }}>{value}</Text>
    </View>
);

export default ProductInfo;