import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // install: react-native-linear-gradient
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../../../assets/images';
import { Icons } from '../../../../../assets/icons';
import { Button } from '../../../../../components';

const SolarAMC: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <LinearGradient
        colors={['#ffffffff', '#ffffffff']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Keep your solar running smoothly!</Text>
        <Text style={styles.title}>Have solar panels already?</Text>

        {/* Image */}
        <Image
          source={{ uri: Images.homeImage1 }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Description */}
        <Text style={styles.description}>
          Get Rengy’s AMC for ₹6,000/year — cleaning, checks, and repairs to
          keep your system running at its best. {'\n'}Need more power? Upgrade
          your existing solar setup.
        </Text>

        {/* Button */}
        <Button
          type="primary"
          title="Explore Solar Maintenance Plans"
          onPress={() => {
            navigation.navigate('RengyAMC');
          }}
          leftIcon={
            <Image
              source={{ uri: Icons.amcIcon }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          }
          style={{ marginBottom: 10 }}
        />
        {/* <Button type="secondary" title="Upgrade system - Call us" onPress={() => {}} /> */}
      </View>
    </View>
  );
};

export default SolarAMC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'GeneralSans-Regular',
    color: '#111827',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'GeneralSans-Medium',
    color: '#111827',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: 20,
    alignSelf: 'center',
    paddingVertical: 25,
  },
  description: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Regular',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0D1B2A',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
