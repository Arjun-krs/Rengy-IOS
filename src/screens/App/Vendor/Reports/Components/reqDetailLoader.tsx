import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ReqDetailLoader = () => {
    return (
        <SkeletonPlaceholder>
            {[0, 1].map((_, index) => (
                <View key={index} style={{ borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }}>
                    <View style={{ height: 60 }}>
                    </View>
                </View>
            ))}
        </SkeletonPlaceholder>
    );
};

export default ReqDetailLoader;
