import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { TypoComp } from '../../../components/common';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp
        isSecondaryHeader={true}
        isPrimaryHeader={false}
        screenName="Privacy Policy"
        bgColor="#FFFFFF"
      />
      <LinearGradient
        colors={['#FFFFFF', '#E5F8E6']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ padding: 16, flexDirection: 'column', gap: 16 }}
      >
        <TypoComp
          label={'Late update: 11 Aug 2025'}
          style={{ textAlign: 'right' }}
          color="#030204"
          variant="bodyMediumSecondary"
        />
        <TypoComp
          label={
            'Please read these terms and conditions, carefully before using our Application operated by us.'
          }
          color="#67606E"
          variant="bodyMediumTertiary"
        />
      </LinearGradient>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TypoComp
              label={'1.'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
            <TypoComp
              label={'Terms of service'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
          </View>
          <TypoComp
            variant="bodyMediumTertiary"
            color="#67606E"
            label={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          />
        </View>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TypoComp
              label={'2.'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
            <TypoComp
              label={'Legitimate services'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
          </View>
          <TypoComp
            variant="bodyMediumTertiary"
            color="#67606E"
            label={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          />
        </View>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <TypoComp
              label={'3.'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
            <TypoComp
              label={'Lorem ipsum dolor sit amet'}
              color="#030204"
              variant="bodyLargeSecondary"
            />
          </View>
          <TypoComp
            variant="bodyMediumTertiary"
            color="#67606E"
            label={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
