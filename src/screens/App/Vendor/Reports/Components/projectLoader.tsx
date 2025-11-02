import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ProjectLoader = () => {
    return (
        <SkeletonPlaceholder>
            {[0, 1].map((_, index) => (
                <View key={index} style={{ borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }}>
                    <View style={{ height: 100 }}>
                    </View>
                </View>
            ))}
        </SkeletonPlaceholder>
    );
};

export default ProjectLoader;
