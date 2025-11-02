import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SubHeader from '../../../navigation/SubHeader';

const TermsConditions = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SubHeader title="Terms & condition" type="drawer" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Last update box */}
        <View style={styles.updateBox}>
          <Text style={styles.updateText}>Late update: 11 Aug 2025</Text>
          <Text style={styles.description}>
            Please read these privacy policy, carefully before using our
            Application operated by us.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Lorem ipsum dolor sit amet</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Lorem ipsum dolor sit amet</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Lorem ipsum dolor sit amet</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  updateBox: {
    backgroundColor: '#eaf9ef',
    borderRadius: 8,
    padding: 40,
    marginBottom: 20,
  },
  updateText: {
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
  },
  description: {
    color: '#333',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  sectionText: {
    color: '#444',
    lineHeight: 20,
  },
});
