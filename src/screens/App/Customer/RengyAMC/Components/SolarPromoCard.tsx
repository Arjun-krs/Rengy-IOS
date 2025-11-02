// src/components/SolarPromoCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const SolarPromoCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E5F8E6', '#E5F8E6', '#ffffffff']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* Title */}

      <Text style={styles.title}>Rengy Annual Maintenance Contract </Text>

      {/* Image */}
      <Image
        source={require('../../../../../assets/images/png/rengyamc.png')} // replace with your image
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SolarPromoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fdf4', // light green background
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 16,
    // alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 32,
    fontFamily: 'GeneralSans-Regular',
    color: '#111',
    marginBottom: 6,
  
  },

  image: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    marginTop:10,
    marginLeft:-10
  },
});
