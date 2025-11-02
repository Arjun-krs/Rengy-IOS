import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SubHeader from '../../../navigation/SubHeader';

const WalletScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubHeader title="Wallet" type="drawer" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
