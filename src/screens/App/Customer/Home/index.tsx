import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Image, Linking, ActivityIndicator, Alert } from 'react-native';
import { Icons } from '../../../../assets/icons.ts';
import FaqSections from './Components/FaqSections';
import HowItWorksSection from './Components/HowItWorksSection';
import SolarPromoCard from './Components/SolarPromoCard';
import BenefitsSection from './Components/BenefitsSection';
import SolarInstallationTypes from './Components/SolarInstallationTypes';
import SolarAMC from './Components/SolarAMC';
import SolarSavingsCard from './Components/SolarSavingsCard';
import EcoCard from './Components/EcoCard';
import CustomerReviews from './Components/CustomerReviews';
import HeaderComp from '../../../../navigation/Components/HeaderComp.tsx';
import DashboardCard from './Components/DashboardCard';
import OurServices from './Components/OurServices';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getStoredUser, User } from '../../../../utils/auth'; // adjust path
import useFetchUserData from '../../../../hooks/useFetchUser.tsx';
// import CustomBottomSheet, {
//   BottomSheetMethods,
// } from '../../../../components/common/BottomSheet/BottomSheet';
import { Typo,Button } from '../../../../components/index.tsx';
import CustomBottomSheet, { BottomSheetMethods } from '../../../../components/ButtomSheet/index.tsx';

const CustomerHome: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: userData } = useFetchUserData();
  console.log(userData, 'userData');
  const requestSheetRef = useRef<BottomSheetMethods>(null);
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00AA00" />
      </View>
    );
  }

  const phoneNumber = '+919876543210'; 

  const handleCall = () => {
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Calling is not supported on this device.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp statubarColor="#E5F8E6" />
      <ScrollView style={{ flex: 1 }}>
        {!user && <SolarPromoCard />}
        {user && <DashboardCard userdata={user?.user} />}
        <HowItWorksSection
          onRaiseRequest={() => requestSheetRef.current?.open()}
          userdata={user?.user}
        />
        <OurServices />
        <BenefitsSection />
        <SolarInstallationTypes />
        <SolarAMC />
        <SolarSavingsCard />
        <EcoCard />
        <CustomerReviews />
        <FaqSections />
      </ScrollView>
      <CustomBottomSheet ref={requestSheetRef}>
        <View style={{ paddingVertical: 20 }}>
          <Image
            source={{ uri: Icons.CallIcon }}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Typo
            label={'Ready to upgrade?'}
            color="#030204"
            variant="headingSmallPrimary"
          />
          <Typo
            label={
              'Call our Solar Upgrade Specialist to discuss your needs and get personalized assistance.'
            }
            color="#67606E"
            variant="bodyMediumTertiary"
            style={{ paddingVertical: 20 }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingVertical: 10,
              marginBottom: 10
            }}
          >
            <Typo
              label={'Contact number: '}
              color="#030204"
              variant="bodyMediumTertiary"
              style={{ fontSize: 16 }}
            />
            <Typo
              label={'+91 98765 43210'}
              color="#030204"
              variant="bodyMediumPrimary"
              style={{ fontSize: 20 }}
            />
          </View>

          <Button
            type="primary"
            onPress={handleCall}
            title={'Call now'}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
export default CustomerHome;
