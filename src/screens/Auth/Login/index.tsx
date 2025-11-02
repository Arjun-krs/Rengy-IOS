import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Pressable, Dimensions, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { EditIcon } from '../../../utils/imagesrc';
import { useToast } from '../../../utils/ToastManager';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { sentOtp, updateProfile, checkExists, loginUser } from '../../../api/action/profile';
import backgroundImage from '../../../assets/images/png/bottombg.png';
import CustomBottomSheet, { BottomSheetMethods } from '../../../components/ButtomSheet';
import { Button, CustomCheckBox, CustomTextInput, OTPInput, Typo } from '../../../components';

const userTypeMap: Record<string, number> = {
  customer: 3,
  vendor: 2,
};

const Login = ({ route }: any) => {
  const [userType, setUserType] = useState<number | null>(null);
  const insets = useSafeAreaInsets();
  const role = route?.params?.role ?? 'customer';
  const { height } = Dimensions.get('screen');
  const navigation = useNavigation();
  const { loginMutation } = useAuth();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const otpRef = useRef('');
  const [otpValue, setOtpValue] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1094652926333-1jh6ehgdfnt4qf61t19o93tr1k1pmakg.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const storedType = await AsyncStorage.getItem('user_type');
        if (storedType && userTypeMap[storedType]) {
          setUserType(userTypeMap[storedType]);
        } else {
          setUserType(3);
        }
      } catch {
        setUserType(3);
      }
    };
    fetchUserType();
  }, []);

  const [form, setForm] = useState({
    mobile: '',
    email: '',
    country: '91',
    password: '',
    showPassword: false,
    accepted: false,
  });

  const [loginMode, setLoginMode] = useState<'mobile' | 'email'>('mobile');
  const username = loginMode === 'mobile' ? form.mobile : form.email;
  const isFormValid =
    username.length > 0 && form.password.length > 0 && form.accepted;

  const handleLogin = async () => {
    if (!isFormValid) return;

    const payload = {
      username: username.trim(),
      password: form.password,
      userType: userType,
    };

    setLoginLoading(true);

    try {
      const user = await dispatch(loginUser(payload)).unwrap();
      console.log('Login successful:', user);
      showToast('Login successful!', 'success');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' as never }],
      });
    } catch (err) {
      console.error('Login failed:', err);
      showToast((err as string) || 'Login failed. Please try again!', 'error');
    } finally {
      setLoginLoading(false);
    }
  };

  const forgotFormik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email or mobile number is required'),
    }),
    onSubmit: async values => {
      try {
        setOtpLoading(true);

        const checkpayload = { email: values.email };
        const checkresult = await dispatch(checkExists(checkpayload));
        const userId = checkresult?.payload?.data?.[0]?.userId;
        console.log(userId, 'userId');

        if (!userId) {
          setOtpLoading(false);
          const typeLabel = loginMode === 'mobile' ? 'mobile number' : 'email';
          showToast(`This ${typeLabel} does not exist`, 'error');
          return;
        }
        setUser(userId);

        const payload = { identifier: values.email, type: 'register' };
        const result = await dispatch(sentOtp(payload));
        console.log(result, 'result');
        setOtpLoading(false);

        if (sentOtp.fulfilled.match(result)) {
          showToast('OTP sent successfully', 'success');
          bottomSheetRef.current?.open();
        } else {
          showToast(result.payload?.message || 'Failed to send OTP', 'error');
        }
      } catch (err) {
        console.error('Forgot Password Error:', err);
        setOtpLoading(false);
        showToast('Something went wrong while sending OTP', 'error');
      }
    },
  });

  const handleForgotPassword = () => {
    if (otpLoading) return;

    const identifier = loginMode === 'mobile' ? form.mobile : form.email;

    if (!identifier) {
      showToast('Please enter your Mobile Number or Email first', 'error');
      return;
    }
    forgotFormik.setFieldValue('email', identifier);
    forgotFormik.handleSubmit();
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) {
      showToast('Please enter a 6-digit OTP', 'error');
      return;
    }
    if (otpLoading) return;
    const identifier = forgotFormik.values.email;

    try {
      setOtpLoading(true);
      console.log(identifier, 'identifier');
      const payload = {
        otp: otpValue,
        identifier: identifier,
        type: 'register',
        userId: user,
      };
      console.log(payload, 'payload');
      const result = await dispatch(updateProfile(payload));
      console.log(result, 'result');
      setOtpLoading(false);

      if (updateProfile.fulfilled.match(result)) {
        console.log('OTP verified successfully:', result);
        showToast('OTP verified successfully!', 'success');
        bottomSheetRef.current?.close();
        navigation.navigate('ForgotPassword', {
          role,
          identifier,
          otp: otpValue,
          user,
        });
      } else {
        showToast(
          result.payload?.message || 'OTP verification failed',
          'error',
        );
      }
    } catch (e) {
      setOtpLoading(false);
      console.error('Verify OTP Error:', e);
      showToast('Something went wrong during verification', 'error');
    }
  };

  const handleResendOtp = async () => {
    if (otpLoading) return;

    try {
      const identifier = forgotFormik.values.email;
      if (!identifier) {
        showToast('Please enter your email or mobile', 'error');
        return;
      }

      setOtpLoading(true);
      const payload = { identifier, type: 'register' };
      const result = await dispatch(sentOtp(payload));
      setOtpLoading(false);

      if (sentOtp.fulfilled.match(result)) {
        showToast('OTP resent successfully', 'success');
      } else {
        showToast(result.payload?.message || 'Failed to resend OTP', 'error');
      }
    } catch (err) {
      setOtpLoading(false);
      console.error('Resend OTP Error:', err);
      showToast('Something went wrong while resending OTP', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('Google user info:', userInfo);

      // Example payload to your API or Redux action
      // const payload = {
      //   username: userInfo.user.email,
      //   provider: 'google',
      //   token: userInfo.idToken,
      //   userType: userType, // your existing field
      // };

      // Optionally dispatch your loginUser API
      // await dispatch(loginUser(payload));

      // showToast('Logged in with Google!', 'success');
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'BottomTab' as never }],
      // });
    } catch (error) {
      console.error('Google login error:', error);
      showToast('Google login failed. Please try again!', 'error');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, padding: 16, paddingTop: insets.top }}>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', width: '100%', paddingBottom: 21 }}>

          <Pressable onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}>
            <Typo label="Skip" color="#148057" variant="bodyLargeSecondary" />
          </Pressable>
        </View>

        <View style={{ gap: 24, flex: 1 }}>
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <Typo label="Welcome to Rengy" color="#030204" variant="headingLargePrimary" />
            <Typo
              label={
                loginMode === 'mobile'
                  ? 'Enter your mobile number and password to login'
                  : 'Enter your email address and password to login'
              }
              color="#67606E"
              variant="bodyMediumTertiary"
            />
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 32 + insets.bottom }} showsVerticalScrollIndicator={false}>
            <View style={{ gap: 16 }}>
              {loginMode === 'mobile' ? (
                <CustomTextInput
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  type="mobile"
                  value={form.mobile}
                  onChangeText={text =>
                    setForm(prev => ({ ...prev, mobile: text }))
                  }
                  countryCode={form.country}
                  onCountrySelect={code =>
                    setForm(prev => ({ ...prev, country: code }))
                  }
                />
              ) : (
                <CustomTextInput
                  label="Email Address"
                  placeholder="Enter Email Address"
                  type="email"
                  value={form.email}
                  onChangeText={text =>
                    setForm(prev => ({ ...prev, email: text }))
                  }
                />
              )}

              <CustomTextInput
                label="Password"
                placeholder="Enter Password"
                value={form.password}
                onChangeText={text =>
                  setForm(prev => ({ ...prev, password: text }))
                }
                secureTextEntry={!form.showPassword}
                iconName={form.showPassword ? 'eye' : 'eye-off'}
                onIconPress={() =>
                  setForm(prev => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
              />
            </View>

            <Pressable style={{ marginTop: 8, width: '100%', alignItems: 'flex-end', padding: 10 }} onPress={handleForgotPassword} disabled={otpLoading} >
              <Typo
                style={{ fontSize: 16 }}
                label={otpLoading ? 'Checking details...' : 'Forgot password?'}
                color={otpLoading ? '#a0a0a0' : '#148057'}
                variant="bodyMediumSecondary"
              />
            </Pressable>

            <CustomCheckBox
              label="I have read and agree to all the terms & conditions"
              value={form.accepted}
              onValueChange={() =>
                setForm(prev => ({ ...prev, accepted: !prev.accepted }))
              }
            />

            <View style={{ gap: 32, paddingTop: 32 }}>
              <Button
                title={loginLoading ? 'Logging in...' : 'Login'}
                type={!isFormValid || loginLoading ? 'disabled' : 'primary'}
                onPress={handleLogin}
              />
              {loginLoading && (
                <ActivityIndicator size="small" color="#148057" />
              )}

              <View style={{ position: 'relative', alignItems: 'center' }}>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#D4CEDA', width: '100%' }} />
                <View style={{ position: 'absolute', backgroundColor: '#FFFFFF', bottom: -7, paddingHorizontal: 8 }}>
                  <Typo label="Or" color="#67606E" variant="bodyMediumTertiary" />
                </View>
              </View>

              <Button
                type="social-google"
                title="Continue With Google"
                leftIcon={
                  <Image
                    source={require('../../../assets/images/png/google.png')}
                    style={{ width: 20, height: 20 }}
                  />
                }
                onPress={handleGoogleLogin}
              />

              {loginMode === 'mobile' ? (
                <Button
                  type="social-google"
                  title="Continue with Email"
                  leftIcon={
                    <Image
                      source={require('../../../assets/images/png/mail.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  onPress={() => setLoginMode('email')}
                />
              ) : (
                <Button
                  type="social-google"
                  title="Continue with Mobile"
                  leftIcon={
                    <Image
                      source={require('../../../assets/images/png/phone.png')}
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  onPress={() => setLoginMode('mobile')}
                />
              )}
            </View>

            <ImageBackground source={backgroundImage} style={{ flex: 1, paddingTop: 120 }} resizeMode="stretch">
              <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', width: '100%', bottom: 20, justifyContent: 'center', gap: 2 }}>
                <Typo label="Don’t have an account?" color="#67606E" variant="bodyMediumTertiary" />

                <Pressable onPress={() => navigation.navigate('Register', { role })}>
                  <Typo label="Register" color="#148057" variant="bodyMediumSecondary" />
                </Pressable>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </View>

      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ gap: 24, paddingVertical: 20 }}>
          <View style={{ gap: 12 }}>
            <Typo label={'Authentication code'} color="#030204" variant="headingSmallPrimary" />
            <View style={{ flexDirection: 'column', gap: 2 }}>
              <Typo
                label={
                  loginMode === 'mobile'
                    ? 'Enter the 6-digit code sent to your mobile number'
                    : 'Enter the 6-digit code sent to your email address'
                }
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Typo label={forgotFormik.values.email} color="#030204" variant="bodyMediumSecondary" />
                <Pressable onPress={closeSheet}>
                  <EditIcon />
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', gap: 12 }}>
            <OTPInput length={6} value={otpValue} setValue={val => setOtpValue(val)} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typo label={'Did not receive code? '} color="#67606E" variant="bodyMediumTertiary" />

              <Pressable onPress={handleResendOtp} disabled={otpLoading}>
                <Typo
                  label={otpLoading ? 'Resending...' : 'Resend'}
                  color={otpLoading ? '#a0a0a0' : '#148057'}
                  variant="bodyMediumSecondary"
                />
              </Pressable>
            </View>
          </View>

          <Button
            title={
              otpLoading
                ? 'Verifying...'
                : loginMode === 'mobile'
                  ? 'Verify Mobile'
                  : 'Verify Email'
            }
            type="primary"
            onPress={handleVerifyOtp}
            loading={otpLoading}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Login;
