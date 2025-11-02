import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { EditIcon } from '../../../utils/imagesrc';
import backgroundImage from '../../../assets/images/png/bottombg.png';
import { useToast } from '../../../utils/ToastManager'; // ✅ Import useToast

// 🔹 Redux thunks
import { sentOtp, updateProfile } from '../../../api/action/profile';
import CustomBottomSheet, { BottomSheetMethods } from '../../../components/ButtomSheet';
import { Button, CustomCheckBox, CustomTextInput, OTPInput, Typo } from '../../../components';

const RegisterScreen = ({ navigation, route }: any) => {
  const { height } = Dimensions.get('screen');
  const { role } = route.params;
  console.log(role, 'role');

  const bottomSheetRef = useRef<BottomSheetMethods
  >(null);
  const dispatch = useDispatch();
  const { showToast } = useToast(); 
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number')
      .nullable(),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      'You must accept the terms & conditions',
    ),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      termsAccepted: false,
      otp: '',
    },
    validationSchema,
    onSubmit: async values => {
      if (loading) return;

      try {
        setLoading(true);

        const payload = {
          identifier: values.email,
          type: 'register',
        };

        const result = await dispatch(sentOtp(payload));

        setLoading(false);

        if (sentOtp.fulfilled.match(result)) {
          // ✅ Replaced Alert with Toast on OTP success
          showToast('OTP sent successfully to your email.', 'success'); 
          bottomSheetRef.current?.open();
        } else {
          // ✅ Replaced Alert with Toast on API error
          showToast(result.payload?.message || 'Failed to send OTP.', 'error');
        }
      } catch (error: any) {
        setLoading(false);
        console.error('Send OTP Error:', error);
        // ✅ Replaced Alert with Toast on network/dispatch error
        showToast('Something went wrong while sending OTP.', 'error');
      }
    },
  });

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      // ✅ Replaced Alert with Toast for client-side validation
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
        // ✅ Replaced Alert with Toast on verification success
        showToast('Email verified successfully!', 'success');
        bottomSheetRef.current?.close();
        navigation.navigate('CreatePassword', { role, userDetails: formik.values });
      } else {
        // ✅ Replaced Alert with Toast on API error
        showToast(result.payload?.message || 'Invalid OTP.', 'error');
      }
    } catch (error: any) {
      setLoading(false);
      // ✅ Replaced Alert with Toast on network/dispatch error
      showToast('Something went wrong while verifying OTP.', 'error');
    }
  };

  const handleResendOtp = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setOtpValue(''); // Clear OTP on resend attempt

      const payload = {
        identifier: formik.values.email,
        type: 'register',
      };

      const result = await dispatch(sentOtp(payload));
      setLoading(false);

      if (sentOtp.fulfilled.match(result)) {
        // ✅ Replaced Alert with Toast on resend success
        showToast('OTP resent successfully!', 'success');
      } else {
        // ✅ Replaced Alert with Toast on API error
        showToast(result.payload?.message || 'Failed to resend OTP.', 'error');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Resend OTP Error:', error);
      // ✅ Replaced Alert with Toast on network/dispatch error
      showToast('Something went wrong while resending OTP.', 'error');
    }
  };

  const isFormValid = formik.isValid && formik.dirty;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, padding: 16, gap: 24 }}>
        {/* Skip Button */}
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Pressable onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}>
            <Typo
              label={'Skip'}
              color="#148057"
              variant="bodyLargeSecondary"
            />
          </Pressable>
        </View>

        {/* Header */}
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
                placeholder="Enter Email Address"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
                error={formik.touched.email && formik.errors.email}
                editable={!loading}
              />
              <CustomTextInput
                label="Mobile number"
                placeholder="Enter Mobile Number"
                value={formik.values.mobileNumber}
                onChangeText={formik.handleChange('mobileNumber')}
                onBlur={formik.handleBlur('mobileNumber')}
                keyboardType="phone-pad"
                error={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
                editable={!loading}
              />
            </View>

            <CustomCheckBox
              label="I have read and agree to all the terms & conditions"
              value={formik.values.termsAccepted}
              onValueChange={val => formik.setFieldValue('termsAccepted', val)}
              error={
                formik.touched.termsAccepted && formik.errors.termsAccepted
              }
            />

            {/* Send OTP */}
            <View style={{ gap: 32, paddingTop: 32 }}>
              <Button
                title={loading ? 'Sending OTP...' : 'Send OTP'}
                type={!isFormValid || loading ? 'disabled' : 'primary'}
                onPress={formik.handleSubmit}
                loading={loading}
              />

              <View style={{ position: 'relative', alignItems: 'center' }}>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: '#D4CEDA',
                    width: '100%',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: '#FFFFFF',
                    bottom: -7,
                    paddingHorizontal: 8,
                  }}
                >
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
                title="Continue With Google"
                leftIcon={
                  <Image
                    source={require('../../../assets/images/png/google.png')}
                    style={{ width: 24, height: 24 }}
                  />
                }
                onPress={() => {}}
              />
            </View>

            <ImageBackground
              source={backgroundImage}
              style={{ flex: 1, paddingTop: 120 }}
              resizeMode="stretch"
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  width: '100%',
                  bottom: 20,
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Typo
                  label={'Already have an account?'}
                  color="#67606E"
                  variant="bodyMediumTertiary"
                />
                <Pressable onPress={() => navigation.navigate('Login', { role })}>
                  <Typo
                    label={'Login'}
                    color="#148057"
                    variant="bodyMediumSecondary"
                  />
                </Pressable>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </View>

      {/* Static Custom Bottom Sheet for OTP Verification */}
      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ padding: 16, gap: 24, paddingBottom: 50 }}>
          {/* Header */}
          <View style={{ gap: 12 }}>
            <Typo
              label={'Email Verification'}
              color="#030204"
              variant="headingSmallPrimary"
            />
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Typo
                label={'Enter the 6-digit code sent to your email address'}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
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
            <OTPInput
              length={6}
              value={otpValue}
              setValue={setOtpValue}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typo
                label={'Did not receive code? '}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <Pressable
                onPress={handleResendOtp}
                disabled={loading}
              >
                <Typo
                  label={loading ? 'Resending...' : 'Resend'}
                  color={loading ? '#a0a0a0' : "#148057"}
                  variant="bodyMediumSecondary"
                />
              </Pressable>
            </View>
          </View>

          {/* Verify Button */}
          <Button
            title={loading ? 'Verifying...' : "Verify Email"}
            onPress={handleVerifyOtp}
            loading={loading}
            type={otpValue.length !== 6 || loading ? 'disabled' : 'primary'}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default RegisterScreen;