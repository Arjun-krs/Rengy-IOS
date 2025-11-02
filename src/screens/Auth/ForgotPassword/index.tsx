import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
import { updatePassword } from '../../../api/action/profile'; // import your thunk
import { useToast } from '../../../utils/ToastManager';

const ForgotPasswordScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Ensure identifier and OTP are present if needed by your API for verification
  const { user, role, identifier, otp } = route.params; 
  const { showToast } = useToast();
  console.log(user, 'params');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for API loading

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: createPasswordSchema,
    onSubmit: async values => {
      // 1. Start loading
      setIsLoading(true); 
      try {
        const formData = new FormData();
        
        // 2. Append new password
        formData.append('password', values.password); 

        // 3. NOTE: Your API might require the identifier/OTP/user ID 
        // that was passed through the navigation params to verify the request.
        // I'm assuming 'user' is the userId needed for the endpoint here.
        // If your API expects the password update data in JSON, not FormData, 
        // you would pass an object: { password: values.password, userId: user, ...}

        // 4. Dispatch the action
        // We use .unwrap() for Redux Toolkit Thunks to handle success/failure more cleanly,
        // but since the original code used .then, I'll stick close to that structure
        // while fixing the missing catch for the main dispatch promise.

        const result = await dispatch(updatePassword({ formData, userId: user }));

        // Check if the promise was fulfilled (success or expected error structure)
        if (updatePassword.fulfilled.match(result)) {
            // Handle success based on payload structure
            if (result?.payload?.code === 200 || result?.payload?.success === true) {
                showToast('Password updated successfully! Please log in.', 'success'); 
                navigation.navigate('Login', { role }); 
            } else {
                // Handle API error structure (e.g., code != 200)
                showToast(
                    result?.payload?.message || 'Failed to update password.',
                    'error',
                );
            }
        } else if (updatePassword.rejected.match(result)) {
             // Handle explicit rejection (e.g., network error, thunk error)
             showToast(
                 result.error?.message || 'Network or server error occurred.',
                 'error'
             );
        } else {
             // Handle generic promise resolution that isn't fulfilled/rejected match
             showToast('Failed to update password due to an unknown error.', 'error');
        }

      } catch (err) {
        console.error('Change password error:', err);
        showToast('Something went wrong!', 'error');
      } finally {
        // 5. Stop loading regardless of success or failure
        setIsLoading(false); 
      }
    },
  });

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
        {/* Back Button */}
        <TouchableOpacity
          style={{ paddingVertical: 20 }}
          onPress={() => navigation.goBack()}
          // ✅ Disable back button while loading
          disabled={isLoading} 
        >
          <BackIcon />
        </TouchableOpacity>

        {/* Heading */}
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <TypoComp
            label="Change password"
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
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!isPasswordVisible}
            iconName={isPasswordVisible ? 'eye' : 'eye-off'}
            onIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
            error={formik.touched.password ? formik.errors.password : undefined}
            // ✅ Disable input while loading
            editable={!isLoading} 
          />

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
            // ✅ Disable input while loading
            editable={!isLoading} 
          />
        </ScrollView>

        {/* Submit Button */}
        <View
          style={{
            position: 'absolute',
            bottom: insets.bottom + 20,
            width: '100%',
            left: 16,
          }}
        >
          <Button
            title={isLoading ? 'Changing...' : 'Change password'} 
            onPress={formik.handleSubmit as any}
            loading={isLoading} 
            type={
              !formik.isValid || !formik.dirty || isLoading 
                ? 'disabled'
                : 'primary' // Assuming 'primary' is the default enabled type
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;