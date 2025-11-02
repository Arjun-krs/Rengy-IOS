import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import Typo from '../Typo';
interface OtpProps {
  length?: number;
  value: string;
  setValue: (val: string) => void;
  autoFocus?: boolean;
  error?: any;
}

const OTPInput: React.FC<OtpProps> = ({
  length = 6,
  value,
  setValue,
  autoFocus = true,
  error,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [otpArray, setOtpArray] = useState<string[]>(Array(length).fill(''));

  // Sync with external value
  useEffect(() => {
    if (value !== otpArray.join('')) {
      const valArray =
        value?.split('').slice(0, length) || Array(length).fill('');
      setOtpArray(valArray);
    }
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otpArray];

    if (numericText.length > 1) {
      // Handle paste
      const pastedDigits = numericText.slice(0, length - index).split('');
      pastedDigits.forEach((digit, i) => {
        newOtp[index + i] = digit;
      });
      setOtpArray(newOtp);
      setValue(newOtp.join(''));
      const nextIndex = Math.min(index + pastedDigits.length, length - 1);
      inputs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = numericText; // can be empty string
      setOtpArray(newOtp);
      setValue(newOtp.join(''));
      if (numericText && index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otpArray];
      if (newOtp[index]) {
        newOtp[index] = '';
        setOtpArray(newOtp);
        setValue(newOtp.join(''));
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtpArray(newOtp);
        setValue(newOtp.join(''));
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    inputs.current[index]?.setSelection(0, 1);
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={ref => (inputs.current[i] = ref)}
          value={otpArray[i]}
          onChangeText={text => handleChange(text, i)}
          onKeyPress={e => handleKeyPress(e, i)}
          onFocus={() => handleFocus(i)}
          keyboardType="number-pad"
          blurOnSubmit={false} 
          maxLength={1}
          style={[
            styles.box,
            otpArray[i] ? styles.filledBox : styles.emptyBox,
            error && styles.errorBox,
          ]}
          textAlign="center"
          selectTextOnFocus
        />
      ))}
      {error && (
        <Typo color={'#FF0004'} label={error} variant="bodyMediumTertiary" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  box: {
    borderWidth: 1,
    borderRadius: 8,
    width: 48,
    height: 48,
    fontSize: 20,
    color: '#030204',
    textAlign: 'center',
  },
  emptyBox: {
    borderColor: 'grey',
    backgroundColor: 'transparent',
  },
  filledBox: {
    borderColor: '#D4CEDA',
  },
  errorBox: {
    borderColor: 'red',
  },
});

export default OTPInput;
