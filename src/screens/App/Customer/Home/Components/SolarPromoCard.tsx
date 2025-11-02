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

      <Text style={styles.title}>Go solar, save more!</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum is placeholder text commonly used in the
      </Text>

      {/* Image */}
      <Image
        source={require('../../../../../assets/images/png/solarpromo.png')} // replace with your image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Watch how solar is beneficial for you
        </Text>
        <TouchableOpacity style={styles.playButton}>
          <Icon name="play" size={20} color="#131337" />
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#555',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
    flex: 1,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#71F4C3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
