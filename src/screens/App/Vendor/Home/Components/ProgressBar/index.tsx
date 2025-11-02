import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
    percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
    return (
        <View style={styles.container}>
            <View style={styles.circularProgress} />
            <LinearGradient
                colors={['#70F3C3', '#70F3C3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.activeCircular, { width: `${percent}%` }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
    },
    circularProgress: {
        width: '100%',
        height: 7,
        borderRadius: 10,
        backgroundColor: '#EAEAEB',
    },
    activeCircular: {
        height: 7,
        borderRadius: 10,
        position: 'absolute',
        zIndex: 1000,
    },
});

export default ProgressBar;
