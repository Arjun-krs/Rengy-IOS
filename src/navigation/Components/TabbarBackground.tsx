import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const height = 64;
const fabDiameter = 60;
const dipDepth = 30;

const CustomTabBarBackground = () => {
    const center = width / 2;
    const radius = fabDiameter / 2;
    const left = center - radius - 30;
    const right = center + radius + 30;
    const curveOffset = fabDiameter * 0.43;

    const d = `
    M0,0
    L${left},0
    C${left + curveOffset},0 ${center - curveOffset},${dipDepth} ${center},${dipDepth}
    C${center + curveOffset},${dipDepth} ${right - curveOffset},0 ${right},0
    L${width},0
    L${width},${height}
    L0,${height}
    Z
  `;

    return (
        <View style={styles.container}>
            <Svg width={width} height={height}>
                <Path d={d} fill="#FFFFFF" strokeWidth={1} stroke="#EBEBEB" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.11,
        shadowRadius: 7,
        elevation: 7,
    },
});

export default CustomTabBarBackground;
