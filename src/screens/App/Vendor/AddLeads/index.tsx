import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { Button, DatePicker, SelectDropdown, TypoComp, UploadMedia } from '../../../../components/common';
import HeaderComp from '../../../../navigation/DynamicRoutes/Components/HeaderComp';
import CustomTextInput from '../../../../components/form/CustomTextInput';
import { SECTION_CONSTANTS } from './staticData';
import { MiniLogo, TickIcon } from '../../../../utils/svgSrc';
import { addLeadsSchema } from '../../../../utils/validationSchema';
import { useCommonList } from '../../../../hooks/useCommon';
import useFetchUserData from '../../../../hooks/useFetchUser';
import { addLeads } from '../../../../api/action/Leads';
import { useToast } from '../../../../utils/ToastManager';
import { useNavigation } from '@react-navigation/native';
import CustomBottomSheet, { BottomSheetMethods } from '../../../../components/common/BottomSheet/BottomSheet';
import { Icons } from '../../../../assets/icons';

interface Section {
  key: string;
  title: string;
}

interface headerProp {
  item: any,
  index: number
}

const AddLeads = () => {
  const insets = useSafeAreaInsets()
  const { user } = useFetchUserData()
  const navigation = useNavigation()
  const { data: projectTypes } = useCommonList('projectType')
  const { width } = Dimensions.get('window');
  const dispatch = useDispatch()
  const { showToast } = useToast();
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const sections = useMemo(() => SECTION_CONSTANTS, []);
  const [currentSectionKey, setCurrentSectionKey] = useState(sections[0]?.key);
  const [infoState, setInfoState] = useState({
    isLoading: false,
    leadId: null
  })

  const projectTypeData = projectTypes?.map((el: { id: number; value: string }) => ({
    label: el?.value,
    value: el?.id
  }))

  const getSectionIndex = useCallback(
    (key: string): number =>
      sections.findIndex((section: Section) => section.key === key),
    [sections],
  );

  const renderHeader = useCallback(
    ({ item, index }: headerProp) => {
      const isActive = currentSectionKey === item.key;
      const isCompleted = index < getSectionIndex(currentSectionKey);

      return (
        <TouchableOpacity activeOpacity={(isCompleted || isActive) ? 0.7 : 1} onPress={() => (isCompleted || isActive) && setCurrentSectionKey(item.key)} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'center', gap: 6, width: 90 }}>
            {isCompleted ? (
              <View style={{ width: 32, height: 32, backgroundColor: '#148057', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                <TickIcon />
              </View>
            ) : isActive ? (
              <View style={{ width: 32, height: 32, backgroundColor: '#131337', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                <MiniLogo color="#71F4C3" />
              </View>
            ) : (
              <View style={{ width: 32, height: 32, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 40, borderWidth: 1, borderColor: '#EBE7EE' }}>
                <TypoComp label={(index + 1).toString()} variant="bodySmallTertiary" color="#030204" />
              </View>
            )}
            <TypoComp color="#030204" variant="bodyMediumSecondary" label={item?.title} style={{ textAlign: 'center' }} />
          </View>
          {index !== sections?.length - 1 && <View style={{ width: width * 0.6, height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D4CEDA', marginHorizontal: 8, marginTop: 16, position: 'absolute', left: 55 }} />}
        </TouchableOpacity >
      );
    },
    [currentSectionKey, getSectionIndex, sections?.length],
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobileNumber: '',
      countryId: '91',
      address: '',

      ebName: '',
      projectType: '',
      siteVisitDate: null,
      requiredCapacity: '',
      serviceConnNo: '',
      comments: '',
      images: []
    },
    validationSchema: addLeadsSchema,
    enableReinitialize: true,
    onSubmit: values => {
      setInfoState((prev) => ({ ...prev, isLoading: true }))
      const formData = new FormData();
      formData.append('name', values?.name);
      formData.append('email', values?.email);
      formData.append('mobileNumber', values?.mobileNumber);
      formData.append('countryId', values?.countryId);
      formData.append('address', values?.address);

      formData.append('ebName', values?.ebName);
      formData.append('projectType', values?.projectType);
      formData.append('siteVisitDate', values?.siteVisitDate);
      formData.append('requiredCapacity', values?.requiredCapacity);
      formData.append('serviceConnNo', values?.serviceConnNo);
      formData.append('comments', values?.comments);
      formData.append('createdBy', user?.user?.id);

      values?.images?.forEach((file: any, index: number) => {
        formData.append('images[]', {
          uri: file?.uri,
          name: file?.name,
          type: file?.type,
        });
      });

      dispatch(addLeads({ formData: formData })).then((res: any) => {
        if (res?.payload?.code === 201) {
          setInfoState((prev) => ({ ...prev, isLoading: false, leadId: res?.payload?.data?.[0]?.leadCode }));
          bottomSheetRef.current?.open();
        } else {
          setInfoState((prev) => ({ ...prev, isLoading: false }))
          showToast(res?.payload?.message, 'error')
        }
      })
    },
  });

  const goNext = () => {
    if (currentSectionKey === 'leadDetails') {
      formik.validateForm().then(errors => {
        if (!errors?.name && !errors?.email && !errors?.mobileNumber && !errors?.address) {
          setCurrentSectionKey('requirements');
        } else {
          formik.setTouched({ name: true, email: true, mobileNumber: true, address: true, });
        }
      });
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp isPrimary={false} bgColor="#FFFFFF" screenName="Add leads" statubarColor="#FFFFFF" />
      <View>
        <FlatList
          data={sections}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderHeader}
          keyExtractor={(_, idx) => idx.toString()}
          contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}
          style={{ backgroundColor: '#EBFAEC' }}
          extraData={currentSectionKey}
        />
      </View>

      <KeyboardAvoidingView style={{ flex: 1, paddingBottom: insets.bottom + 20 }} behavior={'height'}>
        <ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 16 }}>
            {currentSectionKey === 'leadDetails' ? (
              <>
                <CustomTextInput
                  label="Lead name"
                  placeholder="Enter your lead name"
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  error={formik.touched.name && formik.errors.name}
                  isMandatory
                />
                <CustomTextInput
                  label="Email address"
                  placeholder="Enter contact person email address"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  error={formik.touched.email && formik.errors.email}
                  isMandatory
                />
                <CustomTextInput
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  keyboardType="numeric"
                  value={formik.values.mobileNumber}
                  onChangeText={formik.handleChange('mobileNumber')}
                  onCountrySelect={(code) => {
                    formik.setFieldValue('countryId', code?.id);
                  }}
                  countryCode={formik.values.countryId}
                  onBlur={formik.handleBlur('mobileNumber')}
                  error={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  isMandatory
                  type='mobile'
                />
                <CustomTextInput
                  label="Address"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChangeText={formik.handleChange('address')}
                  onBlur={formik.handleBlur('address')}
                  error={formik.touched.address && formik.errors.address}
                  isMandatory
                />
              </>
            ) : (
              <>
                <CustomTextInput
                  label="Name (as on the electricity bill)"
                  placeholder="Enter Name"
                  value={formik.values.ebName}
                  onChangeText={formik.handleChange('ebName')}
                  onBlur={formik.handleBlur('requiredCapacity')}
                  error={formik.touched.ebName && formik.errors.ebName}
                  isMandatory
                />
                <SelectDropdown
                  label="Project type"
                  value={formik.values.projectType}
                  onValueChange={(val: any) => formik.setFieldValue('projectType', val)}
                  error={formik.touched.projectType && formik.errors.projectType}
                  options={projectTypeData}
                  isMandatory
                  placeholder='Select project type'
                />

                <DatePicker
                  label="Site visit date"
                  value={formik.values.siteVisitDate}
                  onChange={(formattedDate) => {
                    formik.setFieldValue('siteVisitDate', formattedDate);
                  }}
                  placeholder='Select date'
                  error={formik.touched.siteVisitDate && formik.errors.siteVisitDate}
                  isMandatory
                />

                <CustomTextInput
                  label="Capacity requirement"
                  placeholder="Enter Capacity requirement"
                  value={formik.values.requiredCapacity}
                  onChangeText={formik.handleChange('requiredCapacity')}
                  onBlur={formik.handleBlur('requiredCapacity')}
                  error={formik.touched.requiredCapacity && formik.errors.requiredCapacity}
                  keyboardType='numeric'
                  isMandatory
                />
                <CustomTextInput
                  label="Service connection number"
                  placeholder="Enter service connection number"
                  keyboardType="numeric"
                  value={formik.values.serviceConnNo}
                  onChangeText={formik.handleChange('serviceConnNo')}
                  onBlur={formik.handleBlur('serviceConnNo')}
                  error={formik.touched.serviceConnNo && formik.errors.serviceConnNo}
                  isMandatory
                />
                <UploadMedia
                  label='Last Month Electricity bill'
                  type='doc'
                  docHeader='Upload Electricity bill'
                  onMediaSelect={(formData, files) => {
                    formik.setFieldValue('images', files)
                  }}
                />
                <CustomTextInput
                  label="Additional note"
                  placeholder="Enter other details"
                  value={formik.values.comments}
                  onChangeText={formik.handleChange('comments')}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{ position: 'absolute', bottom: insets.bottom + 20, width: '100%', paddingHorizontal: 16 }}>
        <Button title={currentSectionKey === 'leadDetails' ? 'Next' : 'Add lead'} onPress={goNext} type={infoState?.isLoading && 'disabled'} />
      </View>
      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ flexDirection: 'column', gap: 16 }}>
          <Image source={{ uri: Icons.successIcon }} height={100} width={100} />
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <TypoComp label='Lead added' color='#030204' variant='headingSmallPrimary' />
            <TypoComp label='Congratulations, Lead has been successfully added.' color='#67606E' variant='bodyMediumTertiary' />
          </View>
          <TypoComp label={`Lead Id: ${infoState?.leadId}`} color='#030204' variant='bodyLargeTertiary' />
        </View>
        <View style={{ flexDirection: 'row', gap: 24, marginTop: 24 }}>
          <Button title='Start site survey' type='secondary' onPress={() => (navigation as any).navigate('BottomTab', { screen: 'Home' })} />
          <Button title='Go to projects' onPress={() => (navigation as any).navigate('BottomTab', { screen: 'Home' })} />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default AddLeads;
