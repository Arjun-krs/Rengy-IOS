import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Button from '../../components/common/Button';
import CustomTextInput from '../../components/form/CustomTextInput';
import { useDispatch } from 'react-redux';
import { fetchMaster } from '../../api/slice/masterSlice';
import { updateNetmeter } from '../../api/action/profile';
import { useToast } from '../../utils/ToastManager';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('screen');

interface OptionItem {
  id: number;
  value: string;
}

const SolarInfoScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const [moduleOptions, setModuleOptions] = useState<OptionItem[]>([]);
  const [inverterOptions, setInverterOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { role, userData } = route?.params || {};

  const customerCode =
    Array.isArray(userData?.data) && userData.data.length > 0
      ? userData.data[0].id
      : null;

  // ✅ Fetch dropdown master data for module and inverter
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moduleRes: any = await dispatch(fetchMaster('module'));
        const inverterRes: any = await dispatch(fetchMaster('inverter'));

        if (moduleRes?.payload?.data?.data) {
          setModuleOptions(
            moduleRes.payload.data.data.map((i: any) => ({
              id: i.id,
              value: i.value,
            })),
          );
        }

        if (inverterRes?.payload?.data?.data) {
          setInverterOptions(
            inverterRes.payload.data.data.map((i: any) => ({
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

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      module: '',
      inverter: '',
    },
    validationSchema: Yup.object({
      module: Yup.string().required('Module is required'),
      inverter: Yup.string().required('Inverter is required'),
    }),
    onSubmit: async values => {
      try {
        if (!customerCode) {
          showToast('Invalid user ID', 'error');
          return;
        }

        const selectedModule = moduleOptions.find(i => i.value === values.module);
        const selectedInverter = inverterOptions.find(i => i.value === values.inverter);

        const payload = {
          id: customerCode,
          moduleId: selectedModule?.id,
          inverterId: selectedInverter?.id,
        };

        console.log('Submitting payload:', payload);

        const result = await dispatch(updateNetmeter(payload));
        console.log('Response:', result);

        showToast('Solar information updated successfully!', 'success');
        navigation.navigate('Login', { role });
      } catch (error) {
        console.error('Failed to update netmeter:', error);
        showToast('Something went wrong. Try again.', 'error');
      }
    },
  });

  const { values, errors, touched, setFieldValue, handleSubmit } = formik;

  const handleSkip = () => {
    navigation.navigate('Login', { role });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Image
          source={require('../../assets/images/png/netmeter.png')}
          style={styles.image}
        />

        <View style={styles.container}>
          <Text style={styles.title}>Solar Installation Details</Text>
          <Text style={styles.subtitle}>
            Please select your Module and Inverter details
          </Text>

          {/* Module Dropdown */}
          <View style={styles.inputGroup}>
            <CustomTextInput
              label="Module Make"
              placeholder="Select module"
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

          {/* Inverter Dropdown */}
          <View style={styles.inputGroup}>
            <CustomTextInput
              label="Inverter Make"
              placeholder="Select inverter"
              type="select"
              value={values.inverter}
              onSelect={(value: string) => setFieldValue('inverter', value)}
              options={inverterOptions.map(i => i.value)}
              loading={loading}
            />
            {touched.inverter && errors.inverter && (
              <Text style={styles.errorText}>{errors.inverter}</Text>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button title="Skip" type="secondary" onPress={handleSkip} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Submit" type="primary" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  image: {
    width,
    height: height * 0.65,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#666',
    marginBottom: 10,
    marginTop: 8,
    textAlign: 'left',
  },
  inputGroup: {
    width: '100%',
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
    fontFamily: 'GeneralSans-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default SolarInfoScreen;
