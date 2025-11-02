import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


import HeaderComp from '../../../../navigation/Components/HeaderComp.tsx';
import { dynamicCalcSchema } from '../../../../utils/validationSchema.tsx';
import { useGetCityList } from '../../../../hooks/useCommon/index.tsx';
import { CustomTextInput, SearchDropdown } from '../../../../components/index.tsx';

const VendorCalculate: React.FC = () => {
  const { width, height } = Dimensions.get('screen');
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();
  const [infoState, setInfoState] = useState({
    search: '',
  });
  const { data: cityList } = useGetCityList(infoState.search);

  const cityOptions = useMemo(() => {
    return (
      cityList?.map((el: any) => ({
        label: el?.value,
        value: el?.id,
      })) || []
    );
  }, [cityList]);

  const formik = useFormik({
    initialValues: {
      capacityRequirement: '',
      city: '',
      buildingHeight: '',
      inverterLocation: '',
      acCableLength: '',
      earthingCableLength: '',
      dcCableLength: '',
    },
    validationSchema: dynamicCalcSchema,
    onSubmit: (values) => {
      console.log('values--------', values);
      navigation.navigate('SelectProjDetail', { calculateData: values });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp screenName='Dynamic price calculator' isPrimary={false} isSearch={false} isNotification={false} isProfile={false} bgColor='#FFFFFF' statubarColor='#FFFFFF' />
      <View>
        <ScrollView
          style={{ padding: 16 }}
          contentContainerStyle={{ gap: 16, position: 'relative', paddingBottom: 58 }}
          showsVerticalScrollIndicator={false}
        >
          <CustomTextInput
            label="Capacity Requirement ( In KW )"
            placeholder="Enter Capacity Requirement"
            value={formik.values.capacityRequirement}
            onChangeText={formik.handleChange('capacityRequirement')}
            onBlur={formik.handleBlur('capacityRequirement')}
            error={formik.touched.capacityRequirement && formik.errors.capacityRequirement}
            isMandatory
          />

          <SearchDropdown
            options={cityOptions}
            value={formik.values.city}
            placeholder="Select"
            onValueChange={(value: any) => formik.setFieldValue('city', value)}
            onSearch={(val: string) => {
              setInfoState((prev) => ({ ...prev, search: val }))
            }}
            label="City"
            isMandatory
            error={formik.touched.city && formik.errors.city}
          />

          <CustomTextInput
            label="Building height"
            placeholder="Enter building height"
            value={formik.values.buildingHeight}
            onChangeText={formik.handleChange('buildingHeight')}
            onBlur={formik.handleBlur('buildingHeight')}
            error={formik.touched.buildingHeight && formik.errors.buildingHeight}
            isMandatory
          />

          <CustomTextInput
            label="Inverter location"
            placeholder="Enter inverter location"
            value={formik.values.inverterLocation}
            onChangeText={formik.handleChange('inverterLocation')}
            onBlur={formik.handleBlur('inverterLocation')}
            error={formik.touched.inverterLocation && formik.errors.inverterLocation}
            isMandatory
          />

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <CustomTextInput
              label="AC cable length"
              placeholder="AC cable length"
              value={formik.values.acCableLength}
              onChangeText={formik.handleChange('acCableLength')}
              onBlur={formik.handleBlur('acCableLength')}
              error={formik.touched.acCableLength && formik.errors.acCableLength}
              isMandatory
            />

            <CustomTextInput
              label="Earthing cable length"
              placeholder="Earthing cable length"
              value={formik.values.earthingCableLength}
              onChangeText={formik.handleChange('earthingCableLength')}
              onBlur={formik.handleBlur('earthingCableLength')}
              error={formik.touched.earthingCableLength && formik.errors.earthingCableLength}
              isMandatory
            />
          </View>
          <CustomTextInput
            label="DC cable length"
            placeholder="Enter DC cable length"
            value={formik.values.dcCableLength}
            onChangeText={formik.handleChange('dcCableLength')}
            onBlur={formik.handleBlur('dcCableLength')}
            error={formik.touched.dcCableLength && formik.errors.dcCableLength}
            isMandatory
          />
          <Button title="Next" onPress={formik.handleSubmit as any} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VendorCalculate;
