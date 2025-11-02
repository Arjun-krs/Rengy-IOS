import React, { useState } from 'react';
import { View, Pressable, ScrollView, ActivityIndicator } from 'react-native'; // ✅ Imported Pressable, ActivityIndicator
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { TypoComp } from '../../../components/common';
import Button from '../../../components/common/Button';
import CustomTextInput from '../../../components/form/CustomTextInput';
import { BackIcon } from '../../../utils/svgSrc';
import { createPasswordSchema } from '../../../utils/validationSchema';
import { VendorRegisterMutate } from '../../../api/action/vendorCreate/index';
import { useToast } from '../../../utils/ToastManager'; // ✅ Import useToast

const CreatePasswordScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showToast } = useToast(); // ✅ Initialize useToast
  const { role, userDetails } = route.params;
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    'Weak' | 'Medium' | 'Strong'
  >('Weak');

  const getPasswordStrength = (
    password: string,
  ): 'Weak' | 'Medium' | 'Strong' => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'Weak';
    if (strength === 3 || strength === 4) return 'Medium';
    return 'Strong';
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: createPasswordSchema,
    onSubmit: async values => {
      if (isLoading) return; // Prevent double submission

      try {
        setIsLoading(true);

        if (getPasswordStrength(values.password) === 'Weak') {
          // ✅ Replace Alert with Toast for weak password
          showToast('Please choose a stronger password.', 'warning');
          setIsLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('name', userDetails.fullName);
        formData.append('email', userDetails.email);
        // Note: mobileNumber can be null/undefined, ensure your API/FormData handles non-string values correctly, or handle null case here.
        if (userDetails.mobileNumber) {
           formData.append('mobileNumber', userDetails.mobileNumber);
        }
        formData.append('password', values.password);
        formData.append('isEmailVerified', 'true');
        // Mobile verification status is set based on whether a number was provided
        formData.append('isMobileVerified', userDetails.mobileNumber ? 'true' : 'false'); 
        formData.append('countryId', '101');
        formData.append('userType', role === 'customer' ? '3' : '2');

        const responseAction: any = await dispatch(
          VendorRegisterMutate({ formData }),
        );

        if (role === 'customer') {
          if (VendorRegisterMutate.fulfilled.match(responseAction)) {
            const successData = responseAction.payload;
            
            // ✅ Replace Alert with Toast for success
            showToast('Account created successfully!', 'success'); 
            
            navigation.navigate('SuccessModal', {
              role: role,
              userData: successData
            });
            
          } else {
            const errorMessage =
              responseAction.payload?.message || 'Failed to create account';
            // ✅ Replace Alert with Toast for error
            showToast(errorMessage, 'error'); 
          }
        } else {
          console.log('Vendor registration userDetails:', userDetails);
          // For Vendor, navigate to next screen (VendorDetails)
          navigation.navigate('VendorDetails', {
            role,
            // Passing initial registration details to the next step
            userData: {
              ...userDetails,
              password: values.password, 
            },
          });
        }
      } catch (err) {
        console.error('Create password error:', err);
        // ✅ Replace Alert with Toast for unexpected error
        showToast('Something went wrong during account creation!', 'error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Use the formik's state to determine the button state
  const isButtonDisabled = !formik.isValid || !formik.dirty || isLoading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}
      >
        {/* Back Button - Replaced TouchableOpacity with Pressable */}
        <Pressable
          style={{ paddingVertical: 20 }}
          onPress={() => navigation.goBack()}
          disabled={isLoading} // Disable while loading
        >
          <BackIcon />
        </Pressable>

        {/* Heading */}
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <TypoComp
            label="Create password"
            variant="headingLargePrimary"
            color="#030204"
          />
          <TypoComp
            label="Your password must be minimum 8 characters, with upper and lowercase letters and a number or symbol"
            color="#67606E"
            variant="bodyMediumTertiary"
          />
        </View>

        {/* Form Fields */}
        <ScrollView
          style={{ flex: 1, paddingTop: 26 }}
          contentContainerStyle={{ gap: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <CustomTextInput
            label="Password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChangeText={text => {
              formik.setFieldValue('password', text);
              setPasswordStrength(getPasswordStrength(text));
              setHasTypedPassword(text.length > 0);
            }}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!isPasswordVisible}
            iconName={isPasswordVisible ? 'eye' : 'eye-off'}
            onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            error={formik.touched.password ? formik.errors.password : undefined}
            editable={!isLoading} // Disable input while loading
          />

          {hasTypedPassword && (
            <TypoComp
              label={`Password Strength: ${passwordStrength}`}
              color={
                passwordStrength === 'Weak'
                  ? '#FF4D4F'
                  : passwordStrength === 'Medium'
                  ? '#FAAD14'
                  : '#52C41A'
              }
              variant="bodySmallPrimary"
            />
          )}

          <CustomTextInput
            label="Confirm password"
            placeholder="Re-enter password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            secureTextEntry={!isConfirmPasswordVisible}
            iconName={isConfirmPasswordVisible ? 'eye' : 'eye-off'}
            onIconPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            error={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
            editable={!isLoading} // Disable input while loading
          />
        </ScrollView>

        {/* Submit Button */}
        <View
          style={{
            position: 'absolute',
            bottom: insets.bottom + 20,
            width: '100%',
            left: 16,
            // Ensure the button is visible over the scroll content
            zIndex: 10,
          }}
        >
          <Button
            title={isLoading ? 'Creating...' : 'Create Password'}
            onPress={formik.handleSubmit as any}
            type={isButtonDisabled ? 'disabled' : 'primary'}
            loading={isLoading} // ✅ Pass loading state to the Button component
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePasswordScreen;