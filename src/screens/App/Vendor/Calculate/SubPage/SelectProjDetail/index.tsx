import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Dimensions, Image } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, SelectDropdown } from '../../../../../../components/common';
import HeaderComp from '../../../../../../navigation/DynamicRoutes/Components/HeaderComp';
import CustomBottomSheet, { BottomSheetMethods } from '../../../../../../components/common/BottomSheet/BottomSheet';
import { Icons } from '../../../../../../assets/icons';
import { TypoComp } from "../../../../../../components/common"
import { dynamicCalcProjSchema } from '../../../../../../utils/validationSchema';
import { useDropdownLists } from '../../Functions/dropDownList';

interface SelectProjDetailProps {
    route: any;
}

const SelectProjDetail: React.FC<SelectProjDetailProps> = ({ route }) => {
    const insets = useSafeAreaInsets()
    const { calculateData, isOpen } = route?.params;
    const navigation = useNavigation()
    const { height, width } = Dimensions.get('window');
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const { projectTypeOptions, roofTypeOptions, moduleOptions, inverterOptions, structureTypeOptions } = useDropdownLists();
    // const [infoState, setInfoState] = useState({

    // })

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current.open()
        }
    }, [isOpen])

    const formik = useFormik({
        initialValues: {
            projectType: '',
            module: '',
            inverter: '',
            structureType: '',
        },
        validationSchema: dynamicCalcProjSchema,
        onSubmit: (values) => {
            console.log('Selected project details:', values);
            console.log('Previous calculateData:', calculateData);
            navigation.navigate('DynamicLoader')
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isBack onBackPress={() => navigation.goBack()} screenName='Select project details' isPrimary={false} isSearch={false} isNotification={false} isProfile={false} bgColor='#FFFFFF' statubarColor='#FFFFFF' />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 24, paddingBottom: height * 0.1 }}>
                <SelectDropdown
                    label="Type of project"
                    placeholder="Select Type"
                    options={projectTypeOptions}
                    value={formik.values.projectType}
                    onValueChange={(val) => formik.setFieldValue('projectType', val)}
                    error={formik.touched.projectType && formik.errors.projectType}
                    isMandatory
                />

                <SelectDropdown
                    label="Type of Roof"
                    placeholder="Select Type"
                    options={roofTypeOptions}
                    value={formik.values.projectType}
                    onValueChange={(val) => formik.setFieldValue('projectType', val)}
                    error={formik.touched.projectType && formik.errors.projectType}
                    isMandatory
                />

                <SelectDropdown
                    label="Module"
                    placeholder="Select module"
                    options={moduleOptions}
                    value={formik.values.module}
                    onValueChange={(val) => formik.setFieldValue('module', val)}
                    error={formik.touched.module && formik.errors.module}
                    isMandatory
                />

                <SelectDropdown
                    label="Inverter"
                    placeholder="Select inverter"
                    options={inverterOptions}
                    value={formik.values.inverter}
                    onValueChange={(val) => formik.setFieldValue('inverter', val)}
                    error={formik.touched.inverter && formik.errors.inverter}
                    isMandatory
                />

                <SelectDropdown
                    label="Structure type"
                    placeholder="Select structure type"
                    options={structureTypeOptions}
                    value={formik.values.structureType}
                    onValueChange={(val) => formik.setFieldValue('structureType', val)}
                    error={formik.touched.structureType && formik.errors.structureType}
                    isMandatory
                />

                <Image style={{ width: width * 0.9, height: height * 0.2 }} source={require('../../../../../../assets/images/png/tableCalc.png')} resizeMode='contain' />

            </ScrollView>

            <View style={{ position: 'absolute', bottom: insets.bottom + 20, width: '100%', paddingHorizontal: 16 }}>
                <Button title="Generate final price" onPress={formik.handleSubmit as any} />
            </View>
            <CustomBottomSheet ref={bottomSheetRef}>
                <View style={{ paddingVertical: 16, flexDirection: 'column', gap: 16 }}>
                    <Image source={{ uri: Icons.popupIcon }} height={100} width={100} />
                    <View style={{ flexDirection: 'column', gap: 12 }}>
                        <TypoComp label='Rengy’s Quote' color='#030204' variant='headingSmallPrimary' />
                        <View style={{ flexDirection: 'column', gap: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <TypoComp label='Total project material cost' color='#030204' variant='bodyLargeTertiary' />
                                <TypoComp label='₹3,75,000' color='#030204' variant='titleLargeSecondary' />
                            </View>
                            <TypoComp label='This price is applicable conditionally' color='#67606E' variant='bodySmallTertiary' />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <TypoComp label='Potential profit:' color='#67606E' variant='bodyMediumTertiary' />
                        <TypoComp label='₹75,000' color='#030204' variant='bodyMediumSecondary' />

                    </View>
                </View>
            </CustomBottomSheet>
        </SafeAreaView >
    );
};

export default SelectProjDetail;
