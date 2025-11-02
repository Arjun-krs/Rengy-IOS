import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp';
import { TypoComp } from "../../../components/common";
import Button from '../../../components/common/Button';
import CustomTextInput from '../../../components/form/CustomTextInput';
import { PassError, PassInfo } from '../../../utils/svgSrc';
import { changePasswordSchema } from '../../../utils/validationSchema';
import { useToast } from '../../../utils/ToastManager';
import { updatePassword } from '../../../api/action/profile';
import useFetchUserData from '../../../hooks/useFetchUser';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { user } = useFetchUserData();
  const { showToast } = useToast();
  const [infoState, setInfoState] = useState({
    showCurrPass: false,
    showNewPass: false,
    showConfPass: false,
    passStrength: 0
  });

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return setInfoState(prev => ({ ...prev, passStrength: strength }))
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('password', values.confirmPassword);
      formData.append('currentPassword', values.currentPassword);
      dispatch(updatePassword({ formData, userId: user?.user?.id })).then((res: any) => {
        if (res?.payload?.code === 200) {
          showToast('Password Changed Successfully.', 'success');
          formik.resetForm();
        } else {
          showToast(res?.payload?.message, 'error');
        }
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp isPrimaryHeader={false} isSecondaryHeader={true} screenName='Change Password' />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, gap: 24, paddingBottom: 100 }}>
          <TypoComp
            variant='bodyMediumTertiary'
            color='#67606E'
            label='Your password must be at least 8 characters and should include a combination of numbers, letters, and special characters (!$@%).'
          />

          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <TypoComp label={`Current password`} color={formik.touched.currentPassword && formik.errors.currentPassword ? '#FF0004' : '#030204'} variant='bodyMediumTertiary' />
              <Text style={{ color: '#FF0004', transform: [{ translateY: -2 }] }}>
                *
              </Text>
            </View>
            <CustomTextInput
              placeholder='Enter password'
              value={formik.values.currentPassword}
              onChangeText={formik.handleChange('currentPassword')}
              onBlur={formik.handleBlur('currentPassword')}
              iconName={infoState.showCurrPass ? 'eye' : 'eye-off'}
              onIconPress={() =>
                setInfoState(prev => ({ ...prev, showCurrPass: !prev.showCurrPass }))
              }
              secureTextEntry={!infoState.showCurrPass}
              error={formik.touched.currentPassword && formik.errors.currentPassword}
            />
          </View>

          <View style={{ flexDirection: 'column', gap: 6 }}>
            <CustomTextInput
              label='New password'
              placeholder='Enter password'
              value={formik.values.newPassword}
              onChangeText={(el) => {
                formik.setFieldValue('newPassword', el);
                getPasswordStrength(el);
              }}
              onBlur={formik.handleBlur('newPassword')}
              iconName={infoState.showNewPass ? 'eye' : 'eye-off'}
              onIconPress={() =>
                setInfoState(prev => ({ ...prev, showNewPass: !prev.showNewPass }))
              }
              secureTextEntry={!infoState.showNewPass}
              error={formik.touched.newPassword && formik.errors.newPassword}
              isMandatory
            />

            {formik?.values?.newPassword?.length > 0 && (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <PassInfo color={infoState?.passStrength <= 2 ? '#D92D20' : (infoState?.passStrength === 3 || infoState?.passStrength === 4) ? '#FAAD14' : '#148057'} />
                  <TypoComp
                    variant='bodyMediumTertiary'
                    label={'Password strength: '}
                    style={{ marginLeft: 4 }}
                    color={infoState?.passStrength <= 2 ? '#D92D20' : (infoState?.passStrength === 3 || infoState?.passStrength === 4) ? '#FAAD14' : '#148057'}
                  />
                  <TypoComp
                    variant='bodyMediumSecondary'
                    label={infoState?.passStrength <= 2 ? 'Weak' : (infoState?.passStrength === 3 || infoState?.passStrength === 4) ? 'Medium' : 'Strong'}
                    color={infoState?.passStrength <= 2 ? '#D92D20' : (infoState?.passStrength === 3 || infoState?.passStrength === 4) ? '#FAAD14' : '#148057'}
                  />
                </View>
              </View>
            )}
          </View>

          <CustomTextInput
            label='Retype new password'
            placeholder='Enter password'
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            iconName={infoState.showConfPass ? 'eye' : 'eye-off'}
            onIconPress={() =>
              setInfoState(prev => ({ ...prev, showConfPass: !prev.showConfPass }))
            }
            secureTextEntry={!infoState.showConfPass}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            isMandatory
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ bottom: 20, position: 'absolute', width: '100%', paddingHorizontal: 16 }}>
        <Button title='Change Password' onPress={formik.handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
