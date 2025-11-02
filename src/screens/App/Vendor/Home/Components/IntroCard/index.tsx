// src/components/IntroCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const IntroCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E5F8E6', '#E5F8E6', '#ffffffff']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* Title */}

      <Text style={styles.title}>Become a registered vendor</Text>
      <Text style={styles.subtitle}>
        From Site designs to Loans and Equipment, Rengy offers end-to-end
        support for a smarter, more profitable solar business.
      </Text>

      {/* Image */}
      <Image
        source={require('../../../../../../assets/images/png/vendorHome.png')} // replace with your image
        style={styles.image}
        resizeMode="center"
      />
    </View>
  );
};

export default IntroCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fdf4', // light green background
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 0,
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
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#555',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
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
