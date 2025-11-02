import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
// import SubHeader from '../../../../navigation/SubHeader';

import { Icons } from '../../../../assets/icons';
import { Images } from '../../../../assets/images';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { calculateSolarSavings } from '../../../../utils/solarCalculator';
import { Button, CustomTextInput } from '../../../../components';

const INSTALLATION_TYPE_OPTIONS = ['Residential', 'Commercial'];

const validationSchema = Yup.object().shape({
  monthlyBill: Yup.number()
    .typeError('Enter a valid number')
    .positive('Must be greater than 0')
    .required('Monthly electricity bill is required'),
  installationType: Yup.string().required('Installation type is required'),
});

const CustomerCalculate: React.FC = () => {
  const { height } = Dimensions.get('screen');
  const navigation = useNavigation<any>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [calculatedPayload, setCalculatedPayload] = useState<any | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const runCalculation = (billText: string | number, type: string) => {
    const monthlyBillNumber = Number(billText) || 0;

    let billError = null;
    try {
      validationSchema.validateSyncAt('monthlyBill', {
        monthlyBill: monthlyBillNumber,
      });
    } catch (e: any) {
      billError = e?.message || null;
    }

    if (monthlyBillNumber <= 0 || billError) {
      setCalculatedPayload(null);
      return;
    }

    const calculatedData = calculateSolarSavings(monthlyBillNumber, type);
    const payload = {
      monthlyBill: monthlyBillNumber,
      installationType: type,
      ...calculatedData,
    };
    setCalculatedPayload(payload);
  };

  const formik = useFormik({
    initialValues: {
      monthlyBill: '',
      installationType: 'Residential',
    },
    validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    runCalculation(formik.values.monthlyBill, formik.values.installationType);
  }, [formik.values.installationType]);

  const formatCurrency = (amount: any) => {
    if (amount === null || amount === undefined) return '0';
    return new Intl.NumberFormat('en-IN').format(
      Math.round(Number(amount) || 0),
    );
  };

  const renderEstimateRow = (label: string, value: any) => (
    <View style={styles.estimateRow} key={label}>
      <Text style={styles.estimateLabel}>{label}</Text>
      <Text style={styles.estimateValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* <SubHeader title="Calculate savings" type="default" /> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ padding: 16 }}
          contentContainerStyle={{
            paddingBottom: isKeyboardVisible ? height * 0.12 : 50,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Installation Type */}
          <View style={styles.inputGroup}>
            <View style={styles.selectorContainer}>
              {INSTALLATION_TYPE_OPTIONS.map(type => {
                const isSelected = formik.values.installationType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.selectorCard,
                      isSelected && styles.selectorCardSelected,
                    ]}
                    onPress={() => {
                      formik.setFieldValue('installationType', type);
                      runCalculation(formik.values.monthlyBill, type);
                    }}
                  >
                    <Image
                      source={
                        type === 'Residential'
                          ? { uri: Images.ResidentialImg }
                          : { uri: Images.CommercialImg }
                      }
                      style={styles.selectorImage}
                      resizeMode="cover"
                    />

                    <View style={styles.selectorIconContainer}>
                      <Image
                        source={
                          type === 'Residential'
                            ? { uri: Icons.resicon }
                            : { uri: Icons.comicon }
                        }
                        style={styles.selectorIcon}
                        resizeMode="cover"
                      />
                    </View>

                    <Text style={styles.selectorText}>{type}</Text>

                    <View style={styles.radioOuter}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {formik.touched.installationType &&
              formik.errors.installationType && (
                <Text style={styles.errorText}>
                  {formik.errors.installationType}
                </Text>
              )}
          </View>

          {/* Monthly Bill Input */}
          <View style={styles.inputGroup}>
            <CustomTextInput
              label="Monthly electricity bill (₹)"
              placeholder="Enter monthly electricity bill (₹)"
              keyboardType="numeric"
              value={formik.values.monthlyBill}
              onChangeText={text => {
                formik.setFieldValue('monthlyBill', text);
                runCalculation(text, formik.values.installationType);
              }}
              onBlur={() => formik.setFieldTouched('monthlyBill')}
              error={formik.touched.monthlyBill && formik.errors.monthlyBill}
            />
          </View>

          {/* Estimate Card */}
          {calculatedPayload && (
            <View style={styles.estimateCard}>
              <Text style={styles.estimateTitle}>Installation Estimate</Text>
              {calculatedPayload.kwSuggested !== 'N/A' ? (
                <>
                  {renderEstimateRow(
                    'System Size',
                    calculatedPayload.kwSuggested,
                  )}
                  {renderEstimateRow(
                    'Annual Savings',
                    `₹${formatCurrency(calculatedPayload.annualSavings)}`,
                  )}
                  {renderEstimateRow(
                    'Annually Generated Energy',
                    `${formatCurrency(
                      calculatedPayload.totalUnitsGenerated,
                    )} Units`,
                  )}
                  {renderEstimateRow(
                    'Space Required',
                    calculatedPayload.areaRequired,
                  )}
                  {renderEstimateRow(
                    'Project Cost',
                    `₹${formatCurrency(calculatedPayload.totalCost)}`,
                  )}
                </>
              ) : (
                <Text style={styles.estimateLabel}>
                  No suitable plan found. Please enter a valid bill amount.
                </Text>
              )}
            </View>
          )}
          {calculatedPayload && (
            <View
              style={{
                width: '100%',
                paddingHorizontal: 16,marginTop:20
              }}
            >
              <Button
                type="primary"
                onPress={() => {
                  navigation.navigate('BottomTab', {
                    screen: 'Get Installation',
                  });
                }}
                title={'Get installation'}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CustomerCalculate;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 24,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  selectorCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  selectorCardSelected: {
    borderColor: '#148057',
    backgroundColor: '#F8FFF9',
  },
  selectorImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
  },
  selectorIcon: {
    width: 40,
    height: 40,
  },
  selectorIconContainer: {
    top: -20,
    left: 8,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    paddingVertical: 15,
    paddingTop: 0,
    paddingLeft: 12,
    textAlign: 'left',
  },
  radioOuter: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#148057',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#148057',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
  },
  estimateCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  estimateTitle: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    marginBottom: 20,
  },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  estimateLabel: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Regular',
    color: '#555555',
  },
  estimateValue: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
  },
});
