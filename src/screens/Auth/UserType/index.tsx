import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserTypeCard from '../../../components/Cards/UserTypeCard.tsx';
import HeaderComp from '../../../navigation/Components/HeaderComp.tsx';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Typo } from '../../../components/index.tsx';

type AuthStackParamList = {
  UserType: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: { role: 'vendor' | 'customer' };
};

type Props = NativeStackScreenProps<AuthStackParamList, 'UserType'>;

const STORAGE_KEY = 'user_type';

const UserType: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<'vendor' | 'customer' | null>(null);

  // Load stored user type when component mounts
  useEffect(() => {
    const loadUserType = async () => {
      try {
        const storedType = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedType === 'vendor' || storedType === 'customer') {
          setSelected(storedType);
        }
      } catch (error) {
        console.log('Error loading user type:', error);
      }
    };
    loadUserType();
  }, []);

  const handleSubmit = async () => {
    if (!selected) return;

    try {
      // Save selected type in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, selected);

      // Navigate with role
      navigation.navigate('Onboarding', { role: selected });
    } catch (error) {
      console.log('Error saving user type:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <HeaderComp isPrimaryHeader={false} isSecondaryHeader={false} statubarColor={'#FFFFFF'} />
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', gap: 24 }}>
        <Typo color='#030204' label={'What best describes you?'} variant='mainHeading' style={{ padding: 16 }} />

        <View style={{ flexDirection: 'column', gap: 24, padding: 16 }}>
          <UserTypeCard
            title="I'm a Vendor/Channel Partner"
            description="Manage solar projects, apply for loans, and order equipment at the best rates."
            image={require('../../../assets/images/png/vendor.png')}
            selected={selected === 'vendor'}
            onPress={() => setSelected('vendor')}
          />

          <UserTypeCard
            title="I’m a Customer"
            description="Manage solar projects, apply for loans, and order equipment at the best rates."
            image={require('../../../assets/images/png/customer.png')}
            selected={selected === 'customer'}
            onPress={() => setSelected('customer')}
          />
        </View>
      </ScrollView>

      <View style={{ padding: 16, position: 'absolute', width: '100%', bottom: insets.bottom }}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          type={selected ? 'primary' : 'disabled'}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserType;
