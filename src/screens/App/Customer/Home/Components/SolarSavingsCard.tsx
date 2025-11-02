import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../../../components';

const SolarSavingsCard: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../../../../assets/images/png/solarbg.png')} // replace with your background image
      style={styles.imageBackground}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          See how much you could save with solar!
        </Text>
        <Text style={styles.subtitle}>
          Want to know your solar savings? Click below to get an instant
          estimate!
        </Text>
        <Button
          type="secondary-light"
          title="Calculate Savings"
          style={{ width: 180 }}
          onPress={() => {
                navigation.navigate('BottomTab', {
                  screen: 'Calculate',
                });
              }}
        />
      </View>
    </ImageBackground>
  );
};

export default SolarSavingsCard;

const styles = StyleSheet.create({
  imageBackground: {
    width: width, // full device width
    height: 240,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    paddingRight: 100,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Regular',
    color: '#e5e7eb',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
});
