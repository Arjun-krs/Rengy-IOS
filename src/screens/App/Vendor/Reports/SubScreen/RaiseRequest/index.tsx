import React, { useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import CustomTextInput from '../../../../../../components/form/CustomTextInput';
import { Button, SearchDropdown, SelectDropdown, TypoComp, UploadDoc } from '../../../../../../components/common';
import HeaderComp from '../../../../../../navigation/DynamicRoutes/Components/HeaderComp';
import { useCommonList, useGetLeadsList } from '../../../../../../hooks/useCommon';
import CustomBottomSheet, { BottomSheetMethods } from '../../../../../../components/common/BottomSheet/BottomSheet';
import useFetchUserData from '../../../../../../hooks/useFetchUser';
import { raiseReqSchema } from '../../../../../../utils/validationSchema';
import { raiseReq } from '../../../../../../api/action/RaiseReq';
import { useToast } from '../../../../../../utils/ToastManager';

interface imageType {
    uri: string;
    name: string;
    type: string;
    size?: string;
}

interface formType {
    projectId: string;
    requestType: string;
    title: string;
    description: string;
    priority: string;
    images: imageType[] | null;
}

const RaiseRequest: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets()
    const { showToast } = useToast();
    const { user } = useFetchUserData()
    const { height } = Dimensions.get('screen')
    const [infoState, setInfoState] = useState({
        search: '',
        isLoading: false
    })
    const { data: LeadsList } = useGetLeadsList(infoState?.search)
    const { data: PriorityList } = useCommonList('priority')
    const { data: ReqTypeList } = useCommonList('requestType')
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const LeadDropdownList = useMemo(() => (
        LeadsList?.[0]?.list?.map((el: any) => ({
            value: el?.id,
            label: el?.leadCode,
        })) ?? []
    ), [LeadsList]);

    const ReqTypeDropdownList = useMemo(() => (
        ReqTypeList?.map((el: any) => ({
            value: el?.id,
            label: el?.value,
        })) ?? []
    ), [ReqTypeList]);

    const PriorityDropdownList = PriorityList?.map((el: any) => ({
        value: el?.id,
        label: el?.value,
    })) ?? [];

    const formik = useFormik<formType>({
        initialValues: {
            projectId: '',
            requestType: '',
            title: '',
            description: '',
            priority: '',
            images: null
        },
        validationSchema: raiseReqSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('title', values?.title);
            formData.append('projectId', values?.projectId);
            formData.append('requestType', values?.requestType);
            formData.append('description', values?.description);
            formData.append('priority', values?.priority);
            formData.append('userId', 3);
            values.images?.forEach((img) => {
                formData.append('images[]', {
                    uri: img?.uri,
                    name: img?.name,
                    type: img?.type,
                } as any);
            });
            dispatch(raiseReq({ formData: formData })).then((res: any) => {
                if (res?.payload?.code === 201) {
                    setInfoState((prev) => ({ ...prev, isLoading: false }))
                    showToast(res?.payload?.message, 'success');
                    (navigation as any).navigate('BottomTab', { screen: 'Home' })
                } else {
                    setInfoState((prev) => ({ ...prev, isLoading: false }))
                    showToast(res?.payload?.message, 'error')
                }
            })
        },
    });

    const InfoData = [
        "Select the correct Request Type from the dropdown.",
        "Always enter the Project ID / Lead ID so the request is linked to the right project.",
        "Provide a clear, concise description of what you need.",
        "If possible, attach supporting files (images, documents, invoices, etc.).",
        "Avoid vague language like “urgent” without details — explain why it’s urgent.",
        "Double-check all information before submitting, as incorrect data may delay approval.",
        "Once submitted, your request will be reviewed by the Operations/Super Admin team."
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isBack onBackPress={() => navigation.goBack()} screenName='Raise a request' isPrimary={false} isPrimaryHeader={false} isSecondaryHeader={true} isInfo onInfoPress={() => bottomSheetRef.current?.open()} />

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled" style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ gap: 16, paddingBottom: height * 0.2 }}>
                <SearchDropdown
                    options={LeadDropdownList}
                    value={formik.values.projectId}
                    placeholder="Select"
                    onValueChange={(value: any) => formik.setFieldValue('projectId', value)}
                    onSearch={(val: string) => {
                        setInfoState((prev) => ({ ...prev, search: val }))
                    }}
                    label="Project ID"
                    isMandatory
                    error={formik.touched.projectId && formik.errors.projectId}
                />
                <SelectDropdown
                    label="Request type"
                    placeholder="Select"
                    options={ReqTypeDropdownList}
                    onValueChange={(value) => formik.setFieldValue('requestType', value)}
                    value={formik.values.requestType}
                    error={formik.touched.requestType && formik.errors.requestType}
                />
                <CustomTextInput
                    label="Request title"
                    placeholder="Enter"
                    value={formik.values.title}
                    onChangeText={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    error={formik.touched.title && formik.errors.title}
                />
                <CustomTextInput
                    label="Request description"
                    placeholder="Enter"
                    value={formik.values.description}
                    onChangeText={formik.handleChange('description')}
                    onBlur={formik.handleBlur('description')}
                    error={formik.touched.description && formik.errors.description}
                />
                <SelectDropdown
                    label="Priority"
                    placeholder="Select"
                    options={PriorityDropdownList}
                    onValueChange={(value: string) => formik.setFieldValue('priority', value)}
                    value={formik.values.priority}
                    error={formik.touched.priority && formik.errors.priority}
                />

                <UploadDoc
                    label='Attachments'
                    handleUpload={(formData, files) => formik.setFieldValue('images', files)}
                />
            </ScrollView>
            <View style={[styles.buttonWrapper, { bottom: insets.bottom }]}>
                <Button
                    title='Cancel'
                    type='secondary'
                    style={{ flex: 1 }}
                    onPress={() => {
                        formik.resetForm();
                        navigation.goBack();
                    }}
                />
                <Button
                    title='Submit for approval'
                    style={{ flex: 1 }}
                    type={infoState?.isLoading ? 'disabled' : 'primary'}
                    onPress={() => {
                        setInfoState((prev) => ({ ...prev, isLoading: true }));
                        formik.handleSubmit();
                    }}
                />
            </View>
            <CustomBottomSheet ref={bottomSheetRef}>
                <View style={{ flexDirection: 'column', gap: 24, paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'column', gap: 12 }}>
                        <TypoComp label={'How to raise a request'} color='#030204' variant='headingSmallPrimary' />
                        <TypoComp label={'Please follow the guidelines to raise a request'} color='#67606E' variant='bodyMediumTertiary' />
                    </View>
                    <View>
                        {InfoData?.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 2 }}>
                                <View style={{ width: 4, height: 4, borderRadius: 4, backgroundColor: '#67606E', marginRight: 8 }} />
                                <TypoComp label={item} color='#67606E' variant='bodyMediumTertiary' />
                            </View>
                        ))}
                    </View>
                </View>
            </CustomBottomSheet>
        </SafeAreaView>
    )
}

export default RaiseRequest

const styles = StyleSheet.create({
    buttonWrapper: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        paddingVertical: 12,
        gap: 16,
        backgroundColor: '#FFFFFF',
        elevation: 15,
    }
})