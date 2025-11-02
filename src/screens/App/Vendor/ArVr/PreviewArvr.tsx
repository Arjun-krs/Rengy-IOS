import React, { useEffect, useRef, useState } from 'react';
import { View, Platform, NativeModules } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { ViroARScene, ViroARSceneNavigator, ViroAmbientLight, ViroImage, ViroNode, ViroText } from '@reactvision/react-viro';

import HeaderComp from '../../../../navigation/DynamicRoutes/Components/HeaderComp';
import { Button, SelectDropdown, TypoComp } from '../../../../components/common';
import CustomBottomSheet, { BottomSheetMethods } from '../../../../components/common/BottomSheet/BottomSheet';
import { useDropdownLists } from '../Calculate/Functions/dropDownList';
import { requestCameraPermission } from '../../../../components/common/UploadMedia/permissions';
import { checkARSupport } from '../../../../utils/arSupport';

interface ViroCameraTransform {
    position: [number, number, number];
    rotation: [number, number, number];
    forward: [number, number, number];
    up: [number, number, number];
}
interface InfoState {
    showModel: boolean;
    cameraRotation: number[];
    isARSupported: boolean | null;
    arError: string | null;
}

const ARScene = (props: any) => {
    const { showModel, cameraRotation } = props.sceneNavigator.viroAppProps;

    return (
        <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={300} />

            <ViroNode position={[0, 0, -2]} rotation={[0, cameraRotation[1], 0]} transformBehaviors={['billboard']}>
                {!showModel && (
                    <>
                        <ViroImage
                            source={require('../../../../assets/images/png/vrInit.png')}
                            position={[0, 0.5, 0]}
                            width={1.2}
                            height={1.3}
                            scale={[0.7, 0.7, 0.7]}
                        />
                        <ViroText
                            text="Point your phone at the floor"
                            position={[0, -0.25, 0]}
                            scale={[0.3, 0.3, 0.3]}
                            style={{ fontSize: 20, color: '#FFFFFF', fontFamily: 'GeneralSans-Medium', textAlign: 'center' }}
                            width={5}
                        />
                        <ViroText
                            text="Move your phone to scan it"
                            position={[0, -0.45, 0]}
                            scale={[0.3, 0.3, 0.3]}
                            style={{ fontSize: 16, color: '#FFFFFF', fontFamily: 'GeneralSans-Regular', textAlign: 'center' }}
                            width={5}
                        />
                    </>
                )}
            </ViroNode>
        </ViroARScene>
    );
};

const PreviewArvr = () => {
    const navigation = useNavigation();
    const inset = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const { roofTypeOptions, structureHeightOptions } = useDropdownLists();
    const { VRTARSceneNavigatorModule } = NativeModules;

    const [infoState, setInfoState] = useState<InfoState>({
        showModel: false,
        cameraRotation: [0, 0, 0],
        isARSupported: null,
        arError: null
    });

    useEffect(() => {
        const initAR = async () => {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                setInfoState((prev) => ({
                    ...prev,
                    isARSupported: false,
                    arError: 'Camera permission not granted.',
                }));
                return;
            }

            const { supported, reason } = await checkARSupport();
            if (!supported) {
                setInfoState((prev) => ({
                    ...prev,
                    isARSupported: false,
                    arError: reason || 'This device does not support AR features.',
                }));
                return;
            }

            setInfoState((prev) => ({ ...prev, isARSupported: true }));
        };

        initAR();
    }, []);

    const handleCameraTransformUpdate = (cameraTransform: ViroCameraTransform) => {
        if (!cameraTransform?.rotation) return;
        setInfoState((prev) => ({ ...prev, cameraRotation: cameraTransform?.rotation }));
    };

    const formik = useFormik({
        initialValues: {
            roofType: '',
            structureHeight: '',
            panelOrientation: '',
        },
        onSubmit: (values) => console.log(values),
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isPrimaryHeader={false} isPrimary={false} isSecondaryHeader={true} isBack onBackPress={() => navigation.goBack()} isSettings onSettingsPress={() => bottomSheetRef.current?.open()} />

            {infoState?.isARSupported ? (
                <>
                    <View style={{ flex: 1 }}>
                        <ViroARSceneNavigator
                            initialScene={{ scene: ARScene }}
                            viroAppProps={{
                                showModel: infoState?.showModel,
                                cameraRotation: infoState?.cameraRotation,
                            }}
                            onCameraTransformUpdate={handleCameraTransformUpdate}
                        />
                    </View>

                    {!infoState?.showModel && (
                        <View style={{ position: 'absolute', bottom: inset.bottom + 20, width: '100%', paddingHorizontal: 16 }}>
                            <Button
                                title={'Continue'}
                                onPress={() => setInfoState((prev) => ({ ...prev, showModel: !prev.showModel }))}
                            />
                        </View>
                    )}
                </>
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TypoComp label='Your device does not support this feature.' />
                </View>
            )}

            <CustomBottomSheet ref={bottomSheetRef}>
                <View style={{ flexDirection: 'column', gap: 16, paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'column', gap: 24 }}>
                        <TypoComp label="Select orientation and height" color="#030204" variant="headingSmallPrimary" />
                        <SelectDropdown
                            label="Type of Roof"
                            placeholder="Select Type"
                            options={roofTypeOptions}
                            value={formik.values.roofType}
                            onValueChange={(val) => formik.setFieldValue('roofType', val)}
                            error={formik.touched.roofType && formik.errors.roofType}
                        />
                        <SelectDropdown
                            label="Orientation of panels"
                            placeholder="Select Type"
                            options={[{ label: 'Latest', value: 'Latest' }]}
                            value={formik.values.panelOrientation}
                            onValueChange={(val) => formik.setFieldValue('panelOrientation', val)}
                            error={formik.touched.panelOrientation && formik.errors.panelOrientation}
                        />
                        <SelectDropdown
                            label="Select structure height"
                            placeholder="Select structure height"
                            options={structureHeightOptions}
                            value={formik.values.structureHeight}
                            onValueChange={(val) => formik.setFieldValue('structureHeight', val)}
                            error={formik.touched.structureHeight && formik.errors.structureHeight}
                        />
                    </View>
                    <Button title="Submit" />
                </View>
            </CustomBottomSheet>
        </SafeAreaView>
    );
};

export default PreviewArvr;
