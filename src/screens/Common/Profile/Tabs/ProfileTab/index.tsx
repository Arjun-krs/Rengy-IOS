import React, { useCallback, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, Dimensions, FlatList, ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../types/navigation_types'

import { CustomerProfileCard, VendorProfileCard } from './Components'
import { DownloadIcon, EditIcon, PdfIcon, PrimaryDelIcon } from '../../../../../utils/imagesrc'
import { useGetProfile, useGetSubscription } from '../../../../../hooks/useProfile'
import { formatSubDate } from '../../../../../utils/commonFunc'
import { useAuth } from '../../../../../hooks/useAuth/useAuth'
import { checkExists, sentOtp, updateBusinessDetails, verifyOTP } from '../../../../../api/action/profile'
import { VerifiedIcon } from '../../../../../utils/svgSrc'
import useFetchUserData from '../../../../../hooks/useFetchUser'
import { downloadFile } from '../../../../../utils/commonFunc'
import { logout } from '../../../../../api/slice/authSlice'
import { useToast } from '../../../../../utils/ToastManager'
import CustomBottomSheet, { BottomSheetMethods } from '../../../../../components/ButtomSheet'
import { Button, OTPInput, Typo } from '../../../../../components'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileTab = () => {
    const { height } = Dimensions.get('window')
    const otpRef = useRef('');
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const logoutBottomSheetRef = useRef<BottomSheetMethods>(null);
    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProp>()
    const { user } = useFetchUserData()
    const { data: profileData, refetch, isPending } = useGetProfile(user?.user?.id, user?.user?.userType)
    const { data: userSubscription } = useGetSubscription(user?.user?.id, '', '')
    const { sendOtpMutation } = useAuth()
    const { showToast } = useToast()

    const [profileInfo, setProfileInfo] = useState({
        otp: '',
        loading: false,
        error: null
    })

    const [otpSheetData, setOtpSheetData] = useState({
        type: '',
        identifier: '',
        placeholder: '',
    });
    interface LabelValueRow {
        label: string;
        value: string;
    }

    useEffect(() => {
        refetch()
    }, [])

    const renderLabel = useCallback(
        (arr: LabelValueRow[]) =>
            arr.map(({ label, value }, idx) => (
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Typo color="#67606E" label={label} variant="bodyMediumTertiary" />
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <Typo color="#030204" style={{ textAlign: 'right' }} label={value} variant="bodyMediumSecondary" />
                    </View>
                </View>
            )),
        []
    );

    const handleDelDoc = (item: any) => {
        console.log(item, 'item');
        const formData = new FormData();
        formData.append('deleteTypes', [item?.type]);
        formData.append('userType', user?.user?.userType);

        dispatch(updateBusinessDetails({ formData, userId: user?.user?.id })).then((res) => {
            if (res?.payload?.code === 200) {
                showToast(`${item?.type} deleted successfully`, 'success')
                refetch()
            } else {
                showToast(res?.payload?.message, 'error')
            }
        })
    }

    const renderDocument = ({ item }: any) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#EBE7EE', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <PdfIcon />
                    <View style={{ flexDirection: 'column', gap: 2 }}>
                        <Typo label={item?.type?.charAt(0)?.toUpperCase() + item?.type.slice(1)} color='#030204' variant='bodyMediumTertiary' />
                        <Typo label={item?.size} color='#67606E' variant='bodySmallTertiary' />
                    </View>
                </View>
                <View style={{ gap: 12, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => downloadFile(item?.url)}>
                        <DownloadIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelDoc(item)}>
                        <PrimaryDelIcon />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const BusinessDetails = [
        { label: 'Email address', value: profileData?.vendorProfile?.businessEmail || '-' },
        { label: 'Mobile number', value: profileData?.vendorProfile?.businessMobile || '-' },
        { label: 'Company address', value: profileData?.vendorProfile?.companyAddress || '-' },
        { label: 'GST number', value: profileData?.vendorProfile?.gstNumber || '-' },
        { label: 'Register on national portal', value: profileData?.vendorProfile?.isNationalPortal ? 'Yes' : 'No' }
    ];

    const handleLogout = async () => {
        dispatch(logout());
        logoutBottomSheetRef?.current?.close()
        navigation.reset({
            index: 0,
            routes: [{ name: 'UserType' as never }],
        });
    };

    const SubscriptionCard = ({ item }: any) => (
        <View style={{ borderRadius: 12, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, borderWidth: 1, borderColor: '#EEFFFF', paddingHorizontal: -16 }}>
            <LinearGradient
                colors={['#EEFFFF', '#FFFFFF']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flexDirection: 'column', gap: 12, paddingVertical: 24, paddingHorizontal: 20, borderRadius: 12 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Typo label={item?.name} color='#030204' variant='bodyLargeSecondary' />
                        <Typo label={item?.subscriptionObject?.title} variant='headingSmallPrimary' color='#030204' />
                    </View>
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                        <Typo label={'Valid till'} color='#67606E' variant='bodySmallTertiary' />
                        <Typo label={formatSubDate(item?.endDate)} color='#030204' variant='bodyMediumTertiary' />

                    </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 16 }}>
                    <Typo label={item?.subscriptionObject?.shortDescription} />
                    <Button title='Re- Subscribe' />
                </View>
            </LinearGradient>
        </View>
    )

    const handleOtpVerification = () => {
        const payload =
            otpSheetData.type === 'email'
                ? {
                    type: 'verify',
                    identifier: profileData?.email,
                    otp: otpRef.current,
                    userId: user?.user?.id,
                }
                : {
                    type: 'verify',
                    identifier: profileData?.mobileNumber,
                    otp: otpRef.current,
                    userId: user?.user?.id,
                    countryCode: '91',
                };
        console.log(payload, 'payload');

        dispatch(verifyOTP(payload)).then((res: any) => {
            console.log('ressss verify otp', res);

            if (res?.payload?.code === 200) {
                setProfileInfo((prev) => ({ ...prev, otp: '' }))
                otpRef.current = '';
                bottomSheetRef.current?.close();
            } else {
                Alert.alert(res?.payload?.message || 'Verification failed');
            }
        });
    };

    const handleVerify = (type: 'email' | 'phone') => {
        const identifier = type === 'email' ? profileData?.email : profileData?.mobileNumber;
        const placeholder = type === 'email' ? 'email address' : 'mobile number';

        const payload = {
            ...(type === 'email' && { email: identifier }),
            ...(type === 'phone' && { mobileNumber: identifier, countryId: 91 })
        };

        dispatch(checkExists(payload)).then((res: any) => {
            console.log('res', res);

            if (res?.payload?.status) {
                dispatch(sentOtp({ type: 'verify', identifier: identifier })).then((res: any) => {
                    console.log('res send otp', res);
                    if (res?.payload?.code === 200) {
                        setOtpSheetData({ type, identifier, placeholder });
                        bottomSheetRef.current?.open();
                    } else {
                        Alert.alert('Fail to send otp')
                    }
                })
            } else {
                Alert.alert(res?.payload?.message);
            }
        });
    }

    return (
        <>
            {user?.user?.userType === 2 ? (
                <VendorProfileCard userDetails={profileData} onEditPress={() => navigation.navigate('EditProfile', { profileData: profileData })} />
            ) : (
                <CustomerProfileCard userDetails={profileData} onEditPress={() => navigation.navigate('EditProfile', { profileData: profileData })} />
            )}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: user?.user?.userType === 2 ? 32 : 24, paddingBottom: height * 0.1 }}>
                {user?.user?.userType === 2 ? (
                    <>
                        <View style={{ flexDirection: 'column', gap: 16 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typo label={'Business details'} color='#030204' variant='titleMediumSecondary' />
                                <TouchableOpacity onPress={() => navigation.navigate('EditBusinessDetails', { businessDetails: profileData })} style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#70F3C3', borderRadius: 50 }}>
                                    <EditIcon />
                                </TouchableOpacity>
                            </View>
                            {renderLabel(BusinessDetails)}
                        </View>
                        <View style={{ gap: 16 }}>
                            <Typo label={'Documents'} color='#030204' variant='bodyMediumSecondary' />
                            {profileData?.vendorProfile?.documents?.length > 0 ? (
                                <FlatList
                                    data={profileData?.vendorProfile?.documents}
                                    renderItem={renderDocument}
                                    contentContainerStyle={{ gap: 16 }}
                                />
                            ) : (
                                <Typo label={'No Documents Available.'} style={{ textAlign: "center" }} variant='bodySmallTertiary' color='#7A7480' />
                            )}
                        </View>
                    </>
                ) : (
                    <View style={{ flexDirection: 'column', gap: 24 }}>
                        <Typo label={'Account Information'} color='#030204' variant='titleLargeSecondary' />
                        <View style={{ flexDirection: 'column', gap: 24 }}>
                            <View style={{ flexDirection: 'column', gap: 8 }}>
                                <Typo label={'Email address'} color='#67606E' variant='bodyMediumTertiary' />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typo label={profileData?.email} color='#030204' variant='bodyLargeSecondary' />
                                    {!profileData?.isEmailVerified ? (
                                        <TouchableOpacity onPress={() => handleVerify('email')}>
                                            <Typo label={'Verify'} color='#148057' variant='bodyMediumPrimary' />
                                        </TouchableOpacity>
                                    ) : (
                                        <VerifiedIcon />
                                    )}
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', gap: 8 }}>
                                <Typo label={'Mobile number'} color='#67606E' variant='bodyMediumTertiary' />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typo label={profileData?.mobileNumber} color='#030204' variant='bodyLargeSecondary' />
                                    {!profileData?.isMobileVerified ? (
                                        <TouchableOpacity onPress={() => handleVerify('phone')}>
                                            <Typo label={'Verify'} color='#148057' variant='bodyMediumPrimary' />
                                        </TouchableOpacity>
                                    ) : (
                                        <VerifiedIcon />
                                    )}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', gap: 8 }}>
                                <Typo label={'Location'} color='#67606E' variant='bodyMediumTertiary' />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typo label={profileData?.customerProfile?.location ? profileData?.customerProfile?.location : '-'} color='#030204' variant='bodyLargeSecondary' />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', gap: 8 }}>
                                <Typo label={'Already installed solar'} color='#67606E' variant='bodyMediumTertiary' />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typo label={profileData?.customerProfile?.isUsingSolar === 0 ? 'No' : 'Yes'} color='#030204' variant='bodyLargeSecondary' />
                                </View>
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#F1EFF4' }}></View>
                        <View style={{ flexDirection: 'column', gap: 16 }}>
                            <Typo label={'AMC Subscription'} color='#030204' variant='titleLargeSecondary' />
                            {userSubscription?.[0]?.list?.length > 0 ? (
                                <FlatList
                                    data={userSubscription?.[0]?.list?.filter(((el: any) => el?.isActive))}
                                    keyExtractor={(item) => item?.id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={SubscriptionCard}
                                    contentContainerStyle={{ gap: 16 }}
                                />
                            ) : (
                                <Typo label='No Subscription available' style={{ textAlign: 'center' }} />
                            )}
                        </View>

                    </View>
                )}
            </ScrollView>

            <CustomBottomSheet ref={bottomSheetRef}>
                <View style={{ gap: 24, paddingVertical: 12 }}>
                    <View style={{ gap: 12 }}>
                        <Typo label="Authentication code" color="#030204" variant="headingSmallPrimary" />
                        <View style={{ gap: 2 }}>
                            <Typo
                                label={`Enter 6 digit code we just texted to your ${otpSheetData.placeholder}`}
                                color="#67606E"
                                variant="bodyMediumTertiary"
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Typo label={otpSheetData.identifier} color="#030204" variant="bodyMediumSecondary" />
                                <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                                    <EditIcon />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ gap: 12 }}>
                        <OTPInput
                            length={6}
                            value={profileInfo.otp}
                            setValue={(val: string) => {
                                setProfileInfo((prev) => ({ ...prev, otp: val }));
                                otpRef.current = val;
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Typo label={'Did not receive code? '} color="#67606E" variant="bodyMediumTertiary" />
                            <TouchableOpacity
                                onPress={() => sendOtpMutation.mutate({ type: 'verify', identifier: otpSheetData.identifier })}
                            >
                                <Typo label={'Resend'} color="#148057" variant="bodyMediumSecondary" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button title="Verify" onPress={handleOtpVerification} />
                </View>
            </CustomBottomSheet>


            <View style={{ position: 'absolute', width: '100%', bottom: 20, paddingHorizontal: 16 }}>
                <Button
                    title='Logout'
                    onPress={() => logoutBottomSheetRef?.current?.open()}
                    type={user?.user?.userType === 2 ? 'primary' : 'secondary'}
                />
            </View>

            <CustomBottomSheet ref={logoutBottomSheetRef}>
                <View style={{ flexDirection: 'column', gap: 24,paddingVertical:24 }}>
                    <View style={{ flexDirection: 'column', gap: 12 }}>
                        <Typo label='Logout' color='#030204' variant='headingSmallPrimary' />
                        <Typo label='Are your sure you want to logout?' color='#67606E' variant='bodyMediumTertiary' />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <Button type='secondary' title='Yes, Logout' onPress={handleLogout} />
                        <Button title='No, Stay' onPress={() => logoutBottomSheetRef?.current?.close()} />
                    </View>
                </View>
            </CustomBottomSheet>
        </>
    )
}

export default ProfileTab
