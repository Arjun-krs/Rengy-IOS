import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
    Alert,
    Dimensions,
    ScrollView,
    View,
} from 'react-native';

import HeaderComp from '../../../../../../../navigation/Components/HeaderComp';
import { DownloadIcon, PdfIcon, PrimaryDelIcon } from '../../../../../../../utils/imagesrc';
import { businessDetailSchema } from '../../../../../../../utils/validationSchema';
import { useAuth } from '../../../../../../../hooks/useAuth/useAuth';
import { updateBusinessDetails } from '../../../../../../../api/action/profile';
import useFetchUserData from '../../../../../../../hooks/useFetchUser';
import { useToast } from '../../../../../../../utils/ToastManager';
import { Button, CustomTextInput, CustomToggleSelect, UploadMedia } from '../../../../../../../components';

const EditBusinessDetails = ({ route }: any) => {
    const { businessDetails } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user } = useFetchUserData();
    const { height } = Dimensions.get('window');
    const { updateBusinessDetailMutation } = useAuth();
    const { showToast } = useToast();

    const [profileInfo, setProfileInfo] = useState({
        isLoading: false
    })

    const formik = useFormik({
        initialValues: {
            businessEmail: businessDetails?.vendorProfile?.businessEmail || '',
            businessMobile: businessDetails?.vendorProfile?.businessMobile || '',
            companyAddress: businessDetails?.vendorProfile?.companyAddress || '',
            registered: businessDetails?.vendorProfile?.isNationalPortal ?? false,

            gstNumber: businessDetails?.vendorProfile?.gstNumber || '',
            aadharNumber: businessDetails?.vendorProfile?.aadharNumber || '',
            panNumber: businessDetails?.vendorProfile?.panNumber || '',
            canceledChequeNumber: businessDetails?.vendorProfile?.canceledChequeNumber || '',

            aadharFiles: [],
            panFiles: [],
            gstFiles: [],
            canceledChequeFiles: [],
            labourCertificateFiles: [],
            nationalPortalFiles: [],
        },
        enableReinitialize: true,
        validationSchema: businessDetailSchema,
        onSubmit: async (values) => {
            try {
                setProfileInfo((prev) => ({ ...prev, isLoading: true }));
                const formData = new FormData();

                const documentMap = [
                    { type: 'Aadhar', number: values.aadharNumber, files: values.aadharFiles },
                    { type: 'PAN', number: values.panNumber, files: values.panFiles },
                    { type: 'GST', number: values.gstNumber, files: values.gstFiles },
                    { type: 'Canceled Cheque', number: values.canceledChequeNumber, files: values.canceledChequeFiles },
                    { type: 'Labour Certificate', number: '', files: values.labourCertificateFiles },
                    { type: 'National Portal Proof', number: '', files: values.nationalPortalFiles },
                ];

                const documentTypes: string[] = [];
                const documentNumbers: string[] = [];

                documentMap.forEach((doc) => {
                    if (doc.files && doc.files.length > 0) {
                        doc.files.forEach((file: any) => {
                            documentTypes.push(doc.type);
                            documentNumbers.push(doc.number || 'N/A');
                            formData.append('documents[]', {
                                uri: file.uri,
                                type: file.type || 'application/octet-stream',
                                name: file.fileName || file.name || `file_${Date.now()}`,
                            } as any);
                            console.log('Appending file:', file.uri, file.type, file.fileName);
                        });
                    }
                });

                documentTypes.forEach((type) => formData.append('documentTypes[]', type));
                documentNumbers.forEach((num) => formData.append('documentNumbers[]', num));

                formData.append('businessEmail', values.businessEmail);
                formData.append('businessMobile', values.businessMobile);
                formData.append('companyAddress', values.companyAddress);
                formData.append('countryCode', '101');
                formData.append('isNationalPortal', String(values.registered));
                formData.append('userType', '2');

                const res: any = await dispatch(updateBusinessDetails({ formData, userId: user?.user?.id }));

                if (res?.payload?.code === 200) {
                    setProfileInfo((prev) => ({ ...prev, isLoading: false }));
                    showToast(res?.payload?.message, 'success')
                    navigation.navigate('Profile' as never);
                } else {
                    setProfileInfo((prev) => ({ ...prev, isLoading: false }));
                    Alert.alert(res?.payload?.message || 'Failed to update details');
                }
            } catch (err) {
                console.error('Error in update:', err);
                setProfileInfo((prev) => ({ ...prev, isLoading: false }));
                Alert.alert('Something went wrong. Please try again.');
            }
        }
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp
                screenName="Edit business details"
                isPrimaryHeader={false}
                isBack
                isPrimary={false}
                onBackPress={() => navigation.goBack()}
                isSecondaryHeader
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: height * 0.1 }}>
                <CustomTextInput
                    label="Email address"
                    placeholder="Enter Email address"
                    value={formik.values.businessEmail}
                    onChangeText={formik.handleChange('businessEmail')}
                    onBlur={formik.handleBlur('businessEmail')}
                    error={formik.touched.businessEmail && formik.errors.businessEmail}
                />

                <CustomTextInput
                    label="Phone Number"
                    placeholder="Enter Phone number"
                    type="mobile"
                    value={formik.values.businessMobile}
                    onChangeText={formik.handleChange('businessMobile')}
                    onBlur={formik.handleBlur('businessMobile')}
                    error={formik.touched.businessMobile && formik.errors.businessMobile}
                />

                <CustomTextInput
                    label="Company address"
                    placeholder="Enter Company address"
                    value={formik.values.companyAddress}
                    onChangeText={formik.handleChange('companyAddress')}
                    onBlur={formik.handleBlur('companyAddress')}
                    error={formik.touched.companyAddress && formik.errors.companyAddress}
                />

                <CustomToggleSelect
                    label="Registered on national portal?"
                    value={formik.values.registered ? 'Yes' : 'No'}
                    onSelect={(val) => formik.setFieldValue('registered', val === 'Yes')}
                    error={formik.touched.registered && formik.errors.registered}
                />

                <CustomTextInput
                    label="Aadhar number"
                    placeholder="Enter your Aadhar number"
                    value={formik.values.aadharNumber}
                    onChangeText={formik.handleChange('aadharNumber')}
                    onBlur={formik.handleBlur('aadharNumber')}
                    error={formik.touched.aadharNumber && formik.errors.aadharNumber}
                    isMandatory
                    keyboardType="numeric"
                />
                <UploadMedia
                    label="Aadhar card"
                    type="doc"
                    docHeader="Upload Aadhar card"
                    onMediaSelect={(formData, files) => formik.setFieldValue('aadharFiles', files)}
                    isMandatory
                />

                <CustomTextInput
                    label="PAN number"
                    placeholder="Enter your PAN number"
                    value={formik.values.panNumber}
                    onChangeText={formik.handleChange('panNumber')}
                    onBlur={formik.handleBlur('panNumber')}
                    error={formik.touched.panNumber && formik.errors.panNumber}
                    isMandatory
                />
                <UploadMedia
                    label="PAN card"
                    type="doc"
                    docHeader="Upload PAN card"
                    onMediaSelect={(formData, files) => formik.setFieldValue('panFiles', files)}
                    isMandatory
                />

                <CustomTextInput
                    label="Cancelled cheque number"
                    placeholder="Enter your Cancelled cheque number"
                    value={formik.values.canceledChequeNumber}
                    onChangeText={formik.handleChange('canceledChequeNumber')}
                    onBlur={formik.handleBlur('canceledChequeNumber')}
                    error={formik.touched.canceledChequeNumber && formik.errors.canceledChequeNumber}
                    isMandatory
                    keyboardType="numeric"
                />
                <UploadMedia
                    label="Firm cancelled cheque"
                    type="doc"
                    docHeader="Upload Firm cancelled cheque"
                    onMediaSelect={(formData, files) => formik.setFieldValue('canceledChequeFiles', files)}
                    isMandatory
                />

                <UploadMedia
                    label="Labour certificate (if any)"
                    type="doc"
                    docHeader="Upload Labour certificate"
                    onMediaSelect={(formData, files) => formik.setFieldValue('labourCertificateFiles', files)}
                />

                <UploadMedia
                    label="National portal registration proof (if any)"
                    type="doc"
                    docHeader="Upload National portal registration proof"
                    onMediaSelect={(formData, files) => formik.setFieldValue('nationalPortalFiles', files)}
                />
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: 16 }}>
                <Button
                    title="Update"
                    onPress={formik.handleSubmit as any}
                    type={profileInfo?.isLoading && 'disabled'}
                />
            </View>
        </SafeAreaView>
    );
};

export default EditBusinessDetails;
