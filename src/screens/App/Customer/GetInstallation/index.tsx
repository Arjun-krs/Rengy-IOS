import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import SuccessfulIcon from '../../../../assets/images/svg/successfulIcon.svg';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Button, CustomTextInput } from '../../../../components';
import SubHeader from '../../../../navigation/SubHeader';
import { useDispatch } from 'react-redux';
import { fetchMaster } from '../../../../api/slice/masterSlice';
import { requestInstallation } from '../../../../api/slice/installationSlice';
import type { AppDispatch } from '../../../../api/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getStoredUser, User } from '../../../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../../../hooks/useCurrentLocation';

const LocationIcon = () => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#148057"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="12" cy="12" r="3" />
    <Path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
  </Svg>
);

interface OptionItem {
  id: number;
  value: string;
}

const validationSchema = Yup.object().shape({
  purpose: Yup.object().nullable().required('Purpose is required'),
  houseNumber: Yup.string().required('House / Flat number is required'),
  address: Yup.string().required('Address is required'),
  billName: Yup.string().nullable().typeError('Bill Name must be required'),
  monthlyBill: Yup.number().nullable().typeError('Must be a number'),
});

const GetInstallation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const { openSheet, setContent } = useBottomSheet();
  const navigation = useNavigation();
  const [purposeOptions, setPurposeOptions] = useState<OptionItem[]>([]);
  const [installationOptions, setInstallationOptions] = useState<OptionItem[]>(
    [],
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { getLocation } = useCurrentLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleGetLocation = async (setFieldValue: any) => {
    try {
      setLoading(true);
      const loc = await getLocation(); // from useCurrentLocation()
      console.log('Current Location:', loc);

      if (loc?.address) {
        // Set address directly in form field
        setFieldValue('address', loc.address);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  };

  const [images, setImages] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const purposeRes: any = await dispatch(fetchMaster('purpose'));
        const installationRes: any = await dispatch(
          fetchMaster('installationType'),
        );

        if (purposeRes?.payload?.data?.data) {
          setPurposeOptions(
            purposeRes.payload.data.data.map((i: any) => ({
              id: i.id,
              value: i.value,
            })),
          );
        }

        if (installationRes?.payload?.data?.data) {
          setInstallationOptions(
            installationRes.payload.data.data.map((i: any) => ({
              id: i.id,
              value: i.value,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching master data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('userId', user?.user?.id || '');
      formData.append('userType', user?.user?.userType || '');
      formData.append('installationTypeId', String(values.purpose?.id));
      formData.append('houseFlatNo', values.houseNumber);
      formData.append('address', values.address);
      formData.append('billName', values.billName || '');
      formData.append('monthlyElectricityBill', values.monthlyBill || '');

      if (images) {
        formData.append('images[]', {
          uri: images.uri,
          type: images.type,
          name: images.fileName || 'upload.jpg',
        } as any);
      }

      const result = await dispatch(requestInstallation(formData));
      setLoading(false);

      if (requestInstallation.fulfilled.match(result)) {
        const installationData = result.payload?.data?.[0];
        const refNo = installationData?.installRefNo || 'N/A';

        setContent(
          <View style={styles.modalBody}>
            <SuccessfulIcon width={100} height={100} />
            <Text style={styles.modalTitle}>
              Your request has been submitted!
            </Text>
            <Text style={styles.modalSubtitle}>
              You have submitted an installation request.
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.modalRequestId}>Request ID: </Text>
              <Text style={styles.modalRequestIdNum}>#{refNo}</Text>
            </View>
            <Text style={styles.modalSubtitle}>
              We’ll notify you once your vendor is assigned.
            </Text>
          </View>,
          380,
        );
        openSheet();

        // ✅ Reset form after success
        resetForm();
        setImages(null);
      } else {
        console.error('Request failed:', result);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigation.navigate('Login' as never);
    }
  }, [loading, user, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <SubHeader title="Request installation" type="default" /> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Formik
          initialValues={{
            purpose: null,
            houseNumber: '',
            address: '',
            monthlyBill: '',
            billName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            resetForm,
          }) => (
            <View style={styles.container}>
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
              >
                {/* Purpose */}
                <View style={styles.inputGroup}>
                  <CustomTextInput
                    label="Purpose"
                    placeholder="Select Types of installation"
                    type="select"
                    value={values.purpose?.value || ''}
                    onSelect={(value: string) => {
                      const item =
                        installationOptions.find(i => i.value === value) ||
                        null;
                      setFieldValue('purpose', item);
                    }}
                    options={installationOptions.map(i => i.value)}
                    loading={loading}
                  />
                  {touched.purpose && errors.purpose && (
                    <Text style={styles.errorText}>{errors.purpose}</Text>
                  )}
                </View>

                {/* House / Flat */}
                <View style={styles.inputGroup}>
                  <CustomTextInput
                    label="House /Flat number"
                    placeholder="Enter House /Flat no."
                    value={values.houseNumber}
                    onChangeText={handleChange('houseNumber')}
                  />
                  {touched.houseNumber && errors.houseNumber && (
                    <Text style={styles.errorText}>{errors.houseNumber}</Text>
                  )}
                </View>

                {/* Address */}
                <View style={styles.inputGroup}>
                  <CustomTextInput
                    label="Address"
                    placeholder="Enter your address"
                    value={values.address}
                    onChangeText={handleChange('address')}
                  />
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={() => handleGetLocation(setFieldValue)}
                  disabled={loading}
                >
                  <LocationIcon />
                  <Text style={styles.locationText}>
                    {loading
                      ? 'Fetching location...'
                      : 'Use my current location'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                  <CustomTextInput
                    label="Name (as on the electricity bill)."
                    placeholder="Enter Name"
                    value={values.billName}
                    onChangeText={handleChange('billName')}
                  />
                  {touched.billName && errors.billName && (
                    <Text style={styles.errorText}>{errors.billName}</Text>
                  )}
                </View>

                {/* Monthly Bill */}
                <View style={styles.inputGroup}>
                  <CustomTextInput
                    label="Monthly electricity bill (Optional)"
                    placeholder="Enter your monthly electricity bill"
                    value={values.monthlyBill}
                    onChangeText={handleChange('monthlyBill')}
                    keyboardType="numeric"
                  />
                  {touched.monthlyBill && errors.monthlyBill && (
                    <Text style={styles.errorText}>{errors.monthlyBill}</Text>
                  )}
                </View>

                <UploadMedia
                  type="image"
                  label="Last Month Electricity bill"
                  infoIcon
                  onMediaSelect={(formData: any) => setImages(formData)}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: insets.bottom,
                    paddingHorizontal: 16,
                    backgroundColor: '#FFFFFF',
                    paddingTop: 10,
                  }}
                ></View>
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: insets.top > 20 ? 0 : 10,
                  paddingHorizontal: 16,
                }}
              >
                <Button
                  type="primary"
                  onPress={() => handleSubmit()}
                  title={loading ? 'Submitting...' : 'Submit'}
                  disabled={loading}
                />
              </View>

              {/* Optional full-screen loader */}
              {loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#148057" />
                  <Text style={{ marginTop: 10, color: '#148057' }}>
                    Please wait...
                  </Text>
                </View>
              )}
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  inputGroup: { marginBottom: 20 },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    color: '#148057',
  },
  modalBody: { padding: 30 },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    lineHeight: 24,
    color: '#6B7280',
    marginTop: 8,
  },
  modalRequestId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 24,
    fontFamily: 'GeneralSans-Medium',
  },
  modalRequestIdNum: {
    fontSize: 14,
    fontWeight: '500',
    color: '#030204',
    marginTop: 24,
    fontFamily: 'GeneralSans-Medium',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'GeneralSans-Medium',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
});

export default GetInstallation;
