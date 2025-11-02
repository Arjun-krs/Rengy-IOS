import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HeaderComp from '../../../../navigation/Components/HeaderComp';
import IntroCard from './Components/IntroCard/index';
import InfoCard from './Components/InfoCard/infoCard';
import BenefitSections from './Components/BenefitSections/BenefitSections';
import CustomerReviews from '../../Vendor/Home/Components/Testimonials/CustomerReviews';

const { width } = Dimensions.get('window');

const VendorPreHome: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderComp statubarColor="#EBFAEC" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#E5F8E6', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <IntroCard />
          <InfoCard />
          <BenefitSections />
          <CustomerReviews />
          <View style={{paddingVertical:50}}>
            <Image
              source={require('../../../../assets/images/png/VendorVideo.png')}
              style={{ width: width-2, height: 200 }}
              resizeMode="center"
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorPreHome;
