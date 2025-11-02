import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useFormik } from 'formik';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

import HeaderComp from '../../../../../../../navigation/Components/HeaderComp.tsx';
import { CameraIcon, CurrentLocation } from '../../../../../../../utils/svgSrc';
import { useCurrentLocation } from '../../../../../../../hooks/useCurrentLocation';
import { profileSchema } from '../../../../../../../utils/validationSchema';
import { EditIcon } from '../../../../../../../utils/imagesrc';
import { useAuth } from '../../../../../../../hooks/useAuth/useAuth';
import {
  verifyOTP,
  updateProfileMutate,
  checkExists,
  sentOtp,
} from '../../../../../../../api/action/profile';
import useFetchUserData from '../../../../../../../hooks/useFetchUser';
import { Images } from '../../../../../../../assets/images';
import CustomBottomSheet, {
  BottomSheetMethods,
} from '../../../../../../../components/ButtomSheet/index.tsx';
import {
  Button,
  CroppedImage,
  CustomTextInput,
  CustomToggleSelect,
  OTPInput,
  Typo,
} from '../../../../../../../components/index.tsx';

const EditProfile = ({ route }: any) => {
  const { profileData } = route?.params;
  const otpRef = useRef('');
  const dispatch = useDispatch();
  const { user } = useFetchUserData();
  const { getLocation } = useCurrentLocation();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const { sendOtpMutation } = useAuth();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [profile, setProfile] = useState({
    otp: '',
    image: '',
    isLoading: false,
  });
  const [otpSheetData, setOtpSheetData] = useState({
    type: '',
    identifier: '',
    placeholder: '',
  });

  const getProfileImage = () => {
    try {
      const baseUrl =
        profileData?.customerProfile?.baseUrl ||
        profileData?.vendorProfile?.baseUrl;
      const imgStr =
        profileData?.customerProfile?.profileImage ||
        profileData?.vendorProfile?.profileImage;

      if (!baseUrl || !imgStr) return null;

      const parsed = JSON.parse(imgStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return `${baseUrl}${parsed[0]}`;
      }
      return null;
    } catch (err) {
      console.warn('Invalid profile image JSON:', err);
      return null;
    }
  };
  const placeholderImage = Images.placeholderimage;
  const profileImageUri = getProfileImage() || placeholderImage;

  const formik = useFormik({
    initialValues: {
      profileImage:
        `${
          profileData?.customerProfile?.baseUrl ||
          profileData?.vendorProfile?.baseUrl
        }${
          profileData?.customerProfile?.profileImage ||
          profileData?.vendorProfile?.profileImage
        }` || placeholderImage,
      fullName:
        profileData?.customerProfile?.name ||
        profileData?.vendorProfile?.name ||
        '',
      email: profileData?.email || '',
      mobile: profileData?.mobileNumber || '',
      ...(user?.user?.userType !== 2
        ? {
            location: profileData?.customerProfile?.location || '',
            isUsingSolar: profileData?.customerProfile?.isUsingSolar ?? false,
          }
        : {}),
      isEmailVerified: profileData?.isEmailVerified || false,
      isMobileVerified: profileData?.isMobileVerified || false,
    },
    enableReinitialize: true,
    validationSchema: profileSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('name', values?.fullName);
      if (user?.user?.userType === 2) {
        formData.append('userType', 2);
      }
      formData.append('email', values?.email);
      formData.append('mobile', values?.mobile);
      if (user?.user?.userType !== 2) {
        formData.append('location', values?.location);
        formData.append('isUsingSolar', values?.isUsingSolar ? 1 : 0);
      }
      if (!formik?.values?.isEmailVerified) {
        formData.append('isEmailVerified', 'false');
      }

      if (!formik?.values?.isMobileVerified) {
        formData.append('isMobileVerified', 'false');
      }

      if (profile?.image) {
        formData.append('profileImage[]', {
          uri: profile?.image,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });
      }

      setProfile(prev => ({ ...prev, isLoading: true }));
      dispatch(updateProfileMutate({ formData, userId: user?.user?.id })).then(
        (res: any) => {
          // console.log(res, 'resssssssssssssssssssssssss');
          if (res?.payload?.code === 200) {
            setProfile(prev => ({ ...prev, isLoading: false }));
            navigation.navigate('Profile' as never);
          } else {
            Alert.alert(res?.payload?.message);
            setProfile(prev => ({ ...prev, isLoading: false }));
          }
        },
      );
    },
  });

  console.log(formik.values, 'formik.values');

  const handleGetLocation = async () => {
    const loc = await getLocation();
    if (loc?.address) {
      formik.setFieldValue('location', loc.address);
    }
  };

  const pickImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selected: Asset = response.assets[0];
        setProfile(prev => ({ ...prev, image: selected.uri || null }));
      }
    });
  };

  const handleOtpVerification = () => {
    const payload =
      otpSheetData.type === 'email'
        ? {
            type: 'verify',
            identifier: formik.values.email,
            otp: otpRef.current,
            userId: user?.user?.id,
          }
        : {
            type: 'verify',
            identifier: formik.values.mobile,
            otp: otpRef.current,
            userId: user?.user?.id,
            countryCode: '91',
          };
    console.log(payload, 'payload');

    dispatch(verifyOTP(payload)).then((res: any) => {
      console.log('ressss verify otp', res);

      if (res?.payload?.code === 200) {
        if (otpSheetData.type === 'email') {
          formik.setFieldValue('isEmailVerified', true);
        } else {
          formik.setFieldValue('isMobileVerified', true);
        }
        setProfile(prev => ({ ...prev, otp: '' }));
        otpRef.current = '';
        bottomSheetRef.current?.close();
      } else {
        Alert.alert(res?.payload?.message || 'Verification failed');
      }
    });
  };

  const handleVerify = (type: 'email' | 'phone') => {
    const identifier =
      type === 'email' ? formik?.values?.email : formik?.values?.mobile;
    const placeholder = type === 'email' ? 'email address' : 'mobile number';

    const payload = {
      name: formik?.values?.fullName,
      userId: user?.user?.id,
      ...(type === 'email' && { email: identifier }),
      ...(type === 'phone' && { mobileNumber: identifier, countryId: 91 }),
    };

    dispatch(checkExists(payload)).then((res: any) => {
      console.log('res', res);

      if (res?.payload?.status) {
        dispatch(sentOtp({ type: 'verify', identifier: identifier })).then(
          res => {
            console.log('res send otp', res);
            if (res?.payload?.code === 200) {
              setOtpSheetData({ type, identifier, placeholder });
              bottomSheetRef.current?.open();
            } else {
              Alert.alert('Fail to send otp');
            }
          },
        );
      } else {
        Alert.alert(res?.payload?.message);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp
        screenName="Edit Profile"
        isPrimaryHeader={false}
        isBack
        isPrimary={false}
        onBackPress={() => navigation.goBack()}
        isSecondaryHeader={true}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
        <LinearGradient
          colors={['#E5F8E6', '#FFFFFF']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            // paddingVertical: 32,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <View style={{ paddingVertical: 32 }}>
            <CroppedImage
              source={{ uri: profile.image || formik.values.profileImage }}
              width={width * 0.3}
              height={height * 0.15}
              cutSize={20}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 40,
              right: width * 0.3,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 6,
            }}
          >
            <CameraIcon />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          gap: 24,
          paddingBottom: height * 0.1,
        }}
      >
        <CustomTextInput
          label="Full name"
          placeholder="Enter Full Name"
          value={formik?.values?.fullName}
          onChangeText={formik.handleChange('fullName')}
          onBlur={formik.handleBlur('fullName')}
          error={formik.touched.fullName && formik.errors.fullName}
        />

        <CustomTextInput
          label="Email address"
          placeholder="Enter Email"
          value={formik?.values?.email}
          onChangeText={text => {
            formik.handleChange('email')(text);
            formik.setFieldValue('isEmailVerified', false);
          }}
          onBlur={formik.handleBlur('email')}
          error={formik.touched.email && formik.errors.email}
          isVerify={!formik.values.isEmailVerified}
          onVerifyPress={() => handleVerify('email')}
        />

        <CustomTextInput
          label="Mobile number"
          placeholder="Enter Mobile Number"
          type="mobile"
          value={formik?.values?.mobile}
          onChangeText={text => {
            formik.handleChange('mobile')(text);
            formik.setFieldValue('isMobileVerified', false);
          }}
          onCountrySelect={code => {
            formik.setFieldValue('countryId', code?.id);
          }}
          onBlur={formik.handleBlur('mobile')}
          error={formik.touched.mobile && formik.errors.mobile}
          isVerify={!formik.values.isMobileVerified}
          onVerifyPress={() => handleVerify('phone')}
        />
        {user?.user?.userType !== 2 && (
          <>
            <CustomTextInput
              label="Location"
              placeholder="Enter your location"
              value={formik?.values?.location}
              onChangeText={formik.handleChange('location')}
              onBlur={formik.handleBlur('location')}
              error={formik?.touched?.location && formik?.errors?.location}
            />
            <TouchableOpacity
              onPress={handleGetLocation}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <CurrentLocation />
              <Typo
                label={'Use my current location'}
                color="#148057"
                variant="bodyLargeSecondary"
              />
            </TouchableOpacity>

            <CustomToggleSelect
              label="Already installed solar?"
              value={formik?.values?.isUsingSolar ? 'Yes' : 'No'}
              onSelect={(val: 'Yes' | 'No') =>
                formik.setFieldValue('isUsingSolar', val === 'Yes')
              }
              error={
                formik?.touched?.isUsingSolar && formik?.errors?.isUsingSolar
              }
            />
          </>
        )}
      </ScrollView>

      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ gap: 24, paddingVertical: 12 }}>
          <View style={{ gap: 12 }}>
            <Typo
              label="Authentication code"
              color="#030204"
              variant="headingSmallPrimary"
            />
            <View style={{ gap: 2 }}>
              <Typo
                label={`Enter 6 digit code we just texted to your ${otpSheetData.placeholder}`}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Typo
                  label={otpSheetData.identifier}
                  color="#030204"
                  variant="bodyMediumSecondary"
                />
                <TouchableOpacity
                  onPress={() => bottomSheetRef.current?.close()}
                >
                  <EditIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <OTPInput
              length={6}
              value={profile.otp}
              setValue={(val: string) => {
                setProfile(prev => ({ ...prev, otp: val }));
                otpRef.current = val;
              }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typo
                label={'Did not receive code? '}
                color="#67606E"
                variant="bodyMediumTertiary"
              />
              <TouchableOpacity
                onPress={() =>
                  sendOtpMutation.mutate({
                    type: 'verify',
                    identifier: otpSheetData.identifier,
                  })
                }
              >
                <Typo
                  label={'Resend'}
                  color="#148057"
                  variant="bodyMediumSecondary"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button title="Verify" onPress={handleOtpVerification} />
        </View>
      </CustomBottomSheet>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          paddingHorizontal: 16,
        }}
      >
        <Button
          title="Update"
          onPress={formik.handleSubmit}
          type={profile?.isLoading && 'disabled'}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
