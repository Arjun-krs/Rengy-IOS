import React, { useEffect } from 'react';
import { View } from 'react-native';
import HeaderComp from '../../../../navigation/Components/HeaderComp.tsx';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDropdownLists } from '../Calculate/Functions/dropDownList.tsx';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Button, SelectDropdown, Typo } from '../../../../components/index.tsx';

const ArVrScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { roofTypeOptions, structureHeightOptions } = useDropdownLists();

  const formik = useFormik({
    initialValues: {
      roofType: '',
      structureHeight: '',
      panelOrientation: '',
    },
    onSubmit: (values) => {
      console.log(values);
      navigation.navigate('PreviewArvr' as never);
    },
  });

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={{ height: '100%', position: 'relative' }}>
        <HeaderComp isPrimary={false} isPrimaryHeader={false} isSecondaryHeader isBack onBackPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} screenName='AR/VR preview' statubarColor='#FFFFFF' />
        <View style={{ flex: 1, gap: 24, paddingHorizontal: 16 }}>
          <Typo variant='bodyMediumTertiary' color='#67606E' label={'Visualize solar panel installation on-site with AR/VR. Capture 360° videos and images of the site, place and adjust solar panels virtually.'} />
          <Typo label={'Select orientation and hight'} variant='titleMediumSecondary' color='#030204' />

          <SelectDropdown
            label='Type of Roof'
            placeholder="Select Type"
            options={roofTypeOptions}
            value={formik.values.roofType}
            onValueChange={(val) => formik.setFieldValue('roofType', val)}
            error={formik.touched.roofType && formik.errors.roofType}
          />
          <SelectDropdown
            label='Orientation of panels'
            placeholder="Select Type"
            options={[{ label: 'Latest', value: 'Latest' }]}
            value={formik.values.panelOrientation}
            onValueChange={(val) => formik.setFieldValue('panelOrientation', val)}
            error={formik.touched.panelOrientation && formik.errors.panelOrientation}
          />
          <SelectDropdown
            label='Select structure height'
            placeholder="Select structure height"
            options={structureHeightOptions}
            value={formik.values.structureHeight}
            onValueChange={(val) => formik.setFieldValue('structureHeight', val)}
            error={formik.touched.structureHeight && formik.errors.structureHeight}
          />
        </View>
      </View>
      <View style={{ width: '100%', position: 'relative', paddingHorizontal: 20, alignItems: 'center' }}>
        <Button 
          title='Start new'
          style={{ width: '100%', position: 'absolute', bottom: insets.top > 20 ? 0 : 40 }}
          onPress={formik.handleSubmit as any}
        />
      </View>
    </SafeAreaView>
  );
};

export default ArVrScreen;
