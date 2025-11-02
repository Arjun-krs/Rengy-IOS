import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

// Placeholder for image imports
const EditIcon = () => (
  <Typo label="[Edit]" color="#A0A0A0" variant="bodySmallSecondary" />
); // Placeholder
const backgroundImage = require('../../../assets/images/png/bottombg.png'); // Assuming path is correct
const googleIcon = require('../../../assets/images/png/google.png'); // Assuming path is correct

import { useToast } from '../../../utils/ToastManager'; // ✅ Import useToast

import { sentOtp, updateProfile } from '../../../api/action/profile';
import { Button, CustomCheckBox, CustomTextInput, OTPInput, Typo } from '../../../components';
import CustomBottomSheet, { BottomSheetMethods } from '../../../components/ButtomSheet';
import { SafeAreaView } from 'react-native-safe-area-context';

// 🔑 HELPER: Password Strength Checker (Based on UI requirements)
const getPasswordRequirements = (password: string) => {
  const requirements = [
    { label: 'At least 10 characters', passed: password.length >= 10 },
    { label: 'One uppercase letter', passed: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', passed: /[a-z]/.test(password) },
    { label: 'One number', passed: /[0-9]/.test(password) },
    {
      label: 'One special character (!@#$%%*=)',
      passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
    },
  ];
  const allPassed = requirements.every(req => req.passed);
  return { requirements, allPassed };
};

// 🔑 COMPONENT: Password Requirements Indicator
const PasswordRequirementIndicator = ({
  requirement,
}: {
  requirement: { label: string; passed: boolean };
}) => (
  <View style={styles.requirementItem}>
    <Feather
      name={requirement.passed ? 'check' : 'x'}
      size={16}
      color={requirement.passed ? '#148057' : '#DC3545'}
    />
    <Typo
      label={requirement.label}
      color={requirement.passed ? '#148057' : '#67606E'}
      variant="bodySmallTertiary"
    />
  </View>
);

const VendorRegisterScreen = ({ navigation, route }: any) => {
  const { height } = Dimensions.get('screen');
  const { role } = route.params || { role: 'vendor' }; // Default role
  // console.log(role, 'role');

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const dispatch = useDispatch();
  const { showToast } = useToast(); // ✅ Initialize useToast
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New State
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // New State

  // 🔑 UPDATED VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number')
      .nullable(),
    password: Yup.string()
      .min(10, 'Password must be at least 10 characters')
      .matches(/[A-Z]/, 'One uppercase letter is required')
      .matches(/[a-z]/, 'One lowercase letter is required')
      .matches(/[0-9]/, 'One number is required')
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
        'One special character is required',
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      'You must accept the terms & conditions',
    ),
  });

  // 🔑 UPDATED INITIAL VALUES
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '', // Added
      confirmPassword: '', // Added
      termsAccepted: false,
      otp: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (loading) return;

      try {
        setLoading(true);

        const payload = {
          identifier: values.email, // or values.mobileNumber if phone-based
          type: 'register',
        };

        const result = await dispatch(sentOtp(payload));

        setLoading(false);

        if (sentOtp.fulfilled.match(result)) {
          showToast('OTP sent successfully to your email.', 'success');
          bottomSheetRef.current?.open();
        } else {
          showToast(result.payload?.message || 'Failed to send OTP.', 'error');
        }
      } catch (error: any) {
        setLoading(false);
        console.error('Send OTP Error:', error);
        showToast('Something went wrong while sending OTP.', 'error');
      }
    },
  });

  // Derived state for the password requirements component
  const passwordRequirements = useMemo(
    () => getPasswordRequirements(formik.values.password),
    [formik.values.password],
  );

  // Handle OTP verification (kept from original code)
  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      showToast('Please enter a valid 6-digit OTP.', 'error');
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        identifier: formik.values.email,
        otp: otpValue,
        type: 'register',
      };

      const result = await dispatch(updateProfile(payload));

      setLoading(false);

      if (updateProfile.fulfilled.match(result)) {
        showToast('Email verified successfully!', 'success');
        bottomSheetRef.current?.close();

        // ✅ Reset form and OTP after success
        formik.resetForm();
        setOtpValue('');

        // ✅ Optionally also reset password visibility states
        setIsPasswordVisible(false);
        setIsConfirmPasswordVisible(false);

        // ✅ Navigate to next screen
        navigation.navigate('VendorDetails', {
          role,
          userData: formik.values,
        });
      } else {
        showToast(result.payload?.message || 'Invalid OTP.', 'error');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Verify OTP Error:', error);
      showToast('Something went wrong while verifying OTP.', 'error');
    }
  };

  // Handle Resend OTP (kept from original code)
  const handleResendOtp = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setOtpValue('');

      const payload = {
        identifier: formik.values.email,
        type: 'register',
      };

      const result = await dispatch(sentOtp(payload));

      setLoading(false);

      if (sentOtp.fulfilled.match(result)) {
        showToast('OTP resent successfully!', 'success');
      } else {
        showToast(result.payload?.message || 'Failed to resend OTP.', 'error');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Resend OTP Error:', error);
      showToast('Something went wrong while resending OTP.', 'error');
    }
  };

  // Check if form is valid, including terms and all password requirements
  const isFormValid =
    formik.isValid && formik.dirty && passwordRequirements.allPassed;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Skip Button */}
        <View style={styles.skipContainer}>
          <Pressable
            onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}
          >
            <Typo
              label={'Skip'}
              color="#148057"
              variant="bodyLargeSecondary"
            />
          </Pressable>
        </View>

        {/* Header and Form */}
        <View style={{ flex: 1, flexDirection: 'column', gap: 24 }}>
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <Typo
              label={'Let’s get started'}
              color="#030204"
              variant="headingLargePrimary"
            />
            <Typo
              label={'Hey, enter your details to register with us'}
              color="#67606E"
              variant="bodyMediumTertiary"
            />
          </View>

          {/* Form */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: height * 0.15 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 16 }}>
              {/* Inputs */}
              <CustomTextInput
                label="Full name*"
                placeholder="Enter your name"
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
                error={formik.touched.fullName && formik.errors.fullName}
                editable={!loading}
              />
              <CustomTextInput
                label="Email address*"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
                error={formik.touched.email && formik.errors.email}
                editable={!loading}
              />
              {/* Mobile number should ideally be an OTP input field, but we keep the current structure */}
              <CustomTextInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                type="mobile"
                value={formik.values.mobileNumber}
                onChangeText={formik.handleChange('mobileNumber')}
                onBlur={formik.handleBlur('mobileNumber')}
                keyboardType="phone-pad"
                countryCode={formik.values.countryCode}
                onCountrySelect={code =>
                  formik.setFieldValue('countryCode', code)
                }
                error={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
                editable={!loading}
              />

              {/* 🔑 CORRECTED: Create Password Input */}
              <CustomTextInput
                label="Create Password"
                placeholder="Enter Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                secureTextEntry={!isPasswordVisible}
                iconName={isPasswordVisible ? 'eye-off' : 'eye'} // Assuming iconName takes 'eye' or 'eye-off'
                onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
                error={formik.touched.password && formik.errors.password}
                editable={!loading}
              />

              {/* Password Requirements List */}
              <View style={styles.passwordRequirementsContainer}>
                {passwordRequirements.requirements.map((req, index) => (
                  <PasswordRequirementIndicator key={index} requirement={req} />
                ))}
              </View>

              {/* 🔑 CORRECTED: Confirm Password Input */}
              <CustomTextInput
                label="Confirm Password"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
                secureTextEntry={!isConfirmPasswordVisible}
                iconName={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                onIconPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                editable={!loading}
              />

              <CustomCheckBox
                label="I have read and agree to all the terms & conditions"
                value={formik.values.termsAccepted}
                onValueChange={val =>
                  formik.setFieldValue('termsAccepted', val)
                }
                error={
                  formik.touched.termsAccepted && formik.errors.termsAccepted
                }
              />

              {/* Send OTP Button */}
              <View style={{ gap: 32, paddingTop: 32 }}>
                <Button
                  title={loading ? 'Sending OTP...' : 'Send OTP'}
                  // Use the isFormValid that also checks password strength
                  type={!isFormValid || loading ? 'disabled' : 'primary'}
                  onPress={formik.handleSubmit}
                  loading={loading}
                />

                <View style={styles.orContainer}>
                  <View style={styles.orLine} />
                  <View style={styles.orTextWrapper}>
                    <Typo
                      label="Or"
                      color="#67606E"
                      variant="bodyMediumTertiary"
                    />
                  </View>
                </View>

                {/* Google Login */}
                <Button
                  type="social-google"
                  title="Continue with Google"
                  leftIcon={
                    <Image
                      source={googleIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  onPress={() => {}}
                />
              </View>

              <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="stretch"
              >
                <View style={styles.loginContainer}>
                  <Typo
                    label={'Already have an account?'}
                    color="#67606E"
                    variant="bodyMediumTertiary"
                  />
                  <Pressable
                    onPress={() => navigation.navigate('Login', { role })}
                  >
                    <Typo
                      label={'Login'}
                      color="#148057"
                      variant="bodyMediumSecondary"
                    />
                  </Pressable>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Static Custom Bottom Sheet for OTP Verification */}
      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={styles.bottomSheetContent}>
          {/* Header */}
          <View style={{ gap: 12 }}>
            <Typo
              label={'Authentication code'}
              color="#030204"
              variant="headingSmallPrimary"
            />
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Typo
                label={'Enter the 6-digit code sent to your email address'}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <View style={styles.emailEditContainer}>
                <Typo
                  label={formik.values.email}
                  color="#030204"
                  variant="bodyMediumSecondary"
                />
                <Pressable onPress={() => bottomSheetRef.current?.close()}>
                  <EditIcon />
                </Pressable>
              </View>
            </View>
          </View>

          {/* OTP Field */}
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <OTPInput length={6} value={otpValue} setValue={setOtpValue} />

            <View style={styles.resendContainer}>
              <Typo
                label={'Did not receive code? '}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <Pressable onPress={handleResendOtp} disabled={loading}>
                <Typo
                  label={loading ? 'Resending...' : 'Resend'}
                  color={loading ? '#a0a0a0' : '#148057'}
                  variant="bodyMediumSecondary"
                />
              </Pressable>
            </View>
          </View>

          {/* Verify Button */}
          <Button
            title={loading ? 'Verifying...' : 'Verify Email'}
            onPress={handleVerifyOtp}
            loading={loading}
            type={otpValue.length !== 6 || loading ? 'disabled' : 'primary'}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

// Stylesheet for structure and clarity
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 25,
    gap: 24,
  },
  skipContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
  orContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  orLine: {
    borderBottomWidth: 0.5,
    borderColor: '#D4CEDA',
    width: '100%',
  },
  orTextWrapper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    bottom: -7,
    paddingHorizontal: 8,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 120,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 20,
    justifyContent: 'center',
    gap: 2,
  },
  bottomSheetContent: {
    padding: 16,
    gap: 24,
    paddingBottom: 50,
  },
  emailEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordRequirementsContainer: {
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
});

export default VendorRegisterScreen;
