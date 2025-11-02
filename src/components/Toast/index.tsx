import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, Dimensions, PanResponder, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ToastProps {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  index: number;
  onHide: (id: number) => void;
}

const { width } = Dimensions.get('window');

const Toast: React.FC<ToastProps> = ({ id, message, type = 'info', duration = 3000, index, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        translateY.setValue(-100 + gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -50) {
          Animated.timing(translateY, { toValue: -150, duration: 200, useNativeDriver: true }).start(() => onHide(id));
        } else {
          Animated.spring(translateY, { toValue: index * 70 + 50, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Slide in
    Animated.spring(translateY, { toValue: index * 70 + 50, useNativeDriver: true }).start();

    // Auto hide
    const timer = setTimeout(() => {
      Animated.timing(translateY, { toValue: -150, duration: 200, useNativeDriver: true }).start(() => onHide(id));
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, { backgroundColor: getColor(type), transform: [{ translateY }] }]}
    >
      <View style={styles.inner}>
        {getIcon(type)}
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const getColor = (type: string) => {
  switch (type) {
    case 'success': return '#4BB543';
    case 'error': return '#FF3333';
    case 'info': return '#2F86EB';
    default: return '#333';
  }
};

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return <MaterialIcons name="check-circle" size={24} color="white" style={{ marginRight: 8 }} />;
    case 'error': return <MaterialIcons name="error" size={24} color="white" style={{ marginRight: 8 }} />;
    case 'info': 
    default: return <MaterialIcons name="info" size={24} color="white" style={{ marginRight: 8 }} />;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: width * 0.95,
    marginHorizontal: width * 0.025,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 9999,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  inner: { flexDirection: 'row', alignItems: 'center' },
  text: { color: 'white', fontFamily:'GeneralSans-Medium', fontSize: 15, flexShrink: 1 },
});

export default Toast;
