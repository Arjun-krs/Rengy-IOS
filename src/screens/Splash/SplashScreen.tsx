import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import { getRefreshToken } from '../../utils/auth';
import { Typo } from '../../components';

const SplashScreen = ({ navigation }: { navigation?: any }) => {

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        const token = await getRefreshToken();
        const targetScreen = token ? 'BottomTab' : 'UserType';
        const timer = setTimeout(() => {
          navigation?.replace(targetScreen);
        }, 3000);

        return () => clearTimeout(timer);
      } catch (error) {
        navigation?.replace('UserType');
      }
    };

    checkAuthAndNavigate();
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle={'light-content'} hidden />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Typo label='ksjdhfjkshfkhsd' />
        {/* <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{ flex: 1 }}
          resizeMode="cover"
        /> */}
      </SafeAreaView>
    </>
  );
};

export default SplashScreen;
