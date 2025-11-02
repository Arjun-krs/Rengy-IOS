// src/components/OTPModal.tsx

import React, { useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Button from '../../components/common/Button';

interface Props {
  visible: boolean;
  mobileNumber: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OTPModal: React.FC<Props> = ({ visible, mobileNumber, onClose, onVerify }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to the next input if a digit is entered
      if (text !== '' && index < 5) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };
  
  const fullOtp = otp.join('');

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalBackdrop}>
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.title}>Authentication code</Text>
          <Text style={styles.subtitle}>
            Enter 6 digit code we just texted to your mobile number{' '}
            <Text style={styles.number}>+91 {mobileNumber}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref!)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleBackspace(e, index)}
                value={digit}
              />
            ))}
          </View>
          
          <Text style={styles.resendText}>
            Did not receive code? <Text style={styles.resendLink}>Resend</Text>
          </Text>

          <Button title="Verify" onPress={() => onVerify(fullOtp)} disabled={fullOtp.length !== 6} />
          <TouchableOpacity onPress={onClose}><Text style={{marginTop: 15, color: 'gray'}}>Cancel</Text></TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  number: {
    fontWeight: 'bold',
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FAFAFA',
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  resendLink: {
    color: '#1A237E',
    fontWeight: 'bold',
  },
});

export default OTPModal;