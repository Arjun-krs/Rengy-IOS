import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Icons } from '../../../../assets/icons.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import HeaderComp from '../../../../navigation/DynamicRoutes/Components/HeaderComp.tsx';
import SolarPromoCard from './Components/SolarPromoCard';
import HowItWorksSection from './Components/HowItWorksSection';
import BenefitsSection from './Components/BenefitsSection';
import SolarInstallationTypes from './Components/SubscriptionPlan';
import ConsiderAMC from './Components/ConsiderAMC';
import CustomBottomSheet, {
  BottomSheetMethods,
} from '../../../../components/common/BottomSheet/BottomSheet';
import CustomTextInput from '../../../../components/form/CustomTextInput.tsx';
import { TypoComp, Button } from '../../../../components/common/index.js';
import { AppDispatch } from '../../../../api/store';
import {
  createUserSubscription,
  resetSubscriptionState,
} from '../../../../api/slice/userSubscriptionSlice';
import { getStoredUser, User } from '../../../../utils/auth'; // adjust path
import useFetchUserData from '../../../../hooks/useFetchUser.tsx';
import { createAMCRequest } from '../../../../api/slice/amcSlice.ts';
import { fetchMaster } from '../../../../api/slice/masterSlice.ts';

type RootStackParamList = {
  RengyAMC: { subscriptionData: any };
};

interface OptionItem {
  id: number;
  value: string;
}

const RengyAMC: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState();
  const route = useRoute<RouteProp<RootStackParamList, 'RengyAMC'>>();
  const subscriptionData = route?.params?.subscriptionData;
  const successSheetRef = useRef<BottomSheetMethods>(null);
  const requestSheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const [moduleOptions, setModuleOptions] = useState<OptionItem[]>([]);
  const [inverterOptions, setInverterOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const [user, setUser] = useState<User | null>(null);
  const { user: userData } = useFetchUserData();
  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getStoredUser();
      setUser(storedUser);
      setLoading(false);
    };
    checkUser();
  }, []);
  console.log(user?.user?.id, 'user');

  // ✅ Fetch module & inverter dropdown data (same as SolarInfoScreen)
  useEffect(() => {
    const fetchDropdowns = async () => {
      setLoading(true);
      try {
        const moduleRes: any = await dispatch(fetchMaster('service'));

        if (moduleRes?.payload?.data?.data) {
          setModuleOptions(
            moduleRes.payload.data.data.map((i: any) => ({
              id: i.id,
              value: i.value,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDropdowns();
  }, [dispatch]);

  // ✅ Formik setup
  const validationSchema = Yup.object().shape({
    module: Yup.string().required('Please select a Services'),
    siteVisitDate: Yup.string().required('Please select a visit date'),
  });

  const formik = useFormik({
    initialValues: {
      module: '',
      siteVisitDate: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setLoading(true);

        const selectedModule = moduleOptions.find(
          i => i.value === values.module,
        );

        const payload = {
          userId: user?.user?.id,
          serviceId: selectedModule?.id,
          siteVisitDate: values.siteVisitDate,
        };

        console.log('Submitting payload:', payload);

        const response = await dispatch(createAMCRequest(payload)).unwrap();
        console.log(response, 'response');
        setSuccessData(response?.data[0]);
        // ✅ Show success content in the same sheet
        setIsSuccess(true);

        // Reset form after success
        formik.resetForm();
      } catch (err: any) {
        console.error('Error submitting AMC:', err);
        Alert.alert('Error', err?.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, setFieldValue, handleSubmit } = formik;

  const handleBackPress = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComp
        isPrimaryHeader={false}
        isSecondaryHeader
        isBack
        onBackPress={handleBackPress}
        isPrimary={false}
        screenName="Rengy AMC"
        statubarColor="#FFFFFF"
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SolarPromoCard />
        <HowItWorksSection
          onRaiseRequest={() => requestSheetRef.current?.open()}
        />
        <BenefitsSection />
        <ConsiderAMC />
        <SolarInstallationTypes refreshKey={refreshKey} />
      </ScrollView>

      <CustomBottomSheet ref={requestSheetRef}>
        <View style={styles.bottomSheetContent}>
          {isSuccess ? (
            <>
              <Image
                source={{ uri: Icons.successIcon }}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
              <TypoComp
                label="Your request has been submitted!"
                color="#030204"
                variant="headingSmallPrimary"
                style={{ textAlign: 'left' }}
              />

              <TypoComp
                label={`You have submitted an AMC request for "${
                  values.module || 'your selected service'
                }" on ${
                  successData?.siteVisitDate
                    ? new Date(successData.siteVisitDate).toLocaleDateString(
                        'en-IN',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        },
                      )
                    : ''
                }.`}
                color="#67606E"
                variant="bodyMediumTertiary"
                style={{ textAlign: 'left', paddingVertical: 10 }}
              />

              {successData?.amcRefNo && (
                <TypoComp
                  label={`Request ID: ${successData.amcRefNo}`}
                  color="#67606E"
                  variant="bodyMediumTertiary"
                  style={{ paddingVertical: 10, textAlign: 'left' }}
                />
              )}

              <Button
                type="primary"
                title="Close"
                onPress={() => {
                  setIsSuccess(false);
                  requestSheetRef.current?.close();
                }}
                style={{ marginTop: 10 }}
              />
            </>
          ) : (
            <>
              {/* Existing form remains unchanged */}
              <TypoComp
                label="Raise an AMC Request"
                color="#030204"
                variant="headingSmallPrimary"
              />
              <TypoComp
                label="Please select a service type and date to schedule your service"
                color="#67606E"
                variant="bodyMediumTertiary"
                style={{ paddingVertical: 10 }}
              />

              <View style={styles.inputGroup}>
                <CustomTextInput
                  label="Select a service"
                  placeholder="Select service"
                  type="select"
                  value={values.module}
                  onSelect={(value: string) => setFieldValue('module', value)}
                  options={moduleOptions.map(i => i.value)}
                  loading={loading}
                />
                {touched.module && errors.module && (
                  <Text style={styles.errorText}>{errors.module}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <CustomTextInput
                  label="Site Visit Date"
                  placeholder="Select date"
                  value={values.siteVisitDate}
                  type="date"
                  onDateSelect={date => {
                    const dateString = date.toISOString().split('T')[0];
                    setFieldValue('siteVisitDate', dateString);
                  }}
                />
                {touched.siteVisitDate && errors.siteVisitDate && (
                  <Text style={styles.errorText}>{errors.siteVisitDate}</Text>
                )}
              </View>

              <Button
                type="primary"
                style={{ marginTop: 20 }}
                onPress={handleSubmit}
                title={loading ? 'Submitting...' : 'Submit Request'}
                disabled={loading}
              />
            </>
          )}
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default RengyAMC;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomSheetContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 50,
  },
  inputGroup: {
    width: '100%',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
});
