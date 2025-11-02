import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp.tsx';
import { TypoComp } from '../../../components/common';
import { FontFamily } from '../../../components/common/TypoComp/style';

const AboutUs = () => {
  const { height, width } = Dimensions.get('screen')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp isSecondaryHeader={true} isPrimaryHeader={false} screenName='About us' bgColor='#FFFFFF' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/images/png/aboutusBanner.png')}
          style={{ height: height * 0.25, width: width }}
          resizeMode='contain'
        />
        <View style={{ paddingVertical: 32, paddingHorizontal: 16, gap: 16 }}>
          <TypoComp label={'Welcome to Haloop'} color='#030204' style={{ fontSize: 18, fontFamily: FontFamily.fontMedium }} />
          <TypoComp
            label={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            color='#67606E'
            variant='bodyMediumTertiary'
          />
          <TypoComp
            label={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate '}
            color='#67606E'
            variant='bodyMediumTertiary'
          />
          <TypoComp
            label={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            color='#67606E'
            variant='bodyMediumTertiary'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
