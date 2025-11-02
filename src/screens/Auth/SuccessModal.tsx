import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SuccessModal: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [visible, setVisible] = useState(true);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { role, userData } = route.params || {};

  console.log('UserData:', userData?.data);

  // ✅ Extract customerCode safely
  const customerCode =
    Array.isArray(userData?.data) && userData.data.length > 0
      ? userData.data[0].userCode
      : '—';

  // Step 1: Hide modal after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setShouldNavigate(true); // trigger navigation *after* modal closes
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Step 2: Navigate after modal is closed
  useEffect(() => {
    if (!visible && shouldNavigate) {
      setShouldNavigate(false);

      setTimeout(() => {
        if (role === 'customer' && userData?.data) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'SolarInfo' as never,
                params: { role, userData } as never,
              },
            ],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        }
      }, 100); // small delay for safety
    }
  }, [visible, shouldNavigate]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/png/successful.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>
          {role === 'customer' ? (
            <>
              <Text style={styles.title}>Congratulations!</Text>
              <Text style={styles.subtitle}>
                You are verified and have become a Rengy registered Customer.
              </Text>
              <Text style={styles.customerIdLabel}>Your Customer ID:</Text>
              <Text style={styles.customerId}>{customerCode || 'N/A'}</Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>
                Your profile is under verification
              </Text>
              <Text style={styles.subtitle}>
                You will be notified once we complete the verification process
              </Text>
            </>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#666',
    textAlign: 'left',
    marginBottom: 24,
    lineHeight: 22,
  },
  customerIdLabel: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#666',
  },
  customerId: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: 'bold',
    color: '#1A237E',
    marginTop: 4,
  },
});

export default SuccessModal;
