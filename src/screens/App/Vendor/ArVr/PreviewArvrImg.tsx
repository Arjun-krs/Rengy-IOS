import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

import HeaderComp from '../../../../navigation/DynamicRoutes/Components/HeaderComp'
import CustomBottomSheet, { BottomSheetMethods } from '../../../../components/common/BottomSheet/BottomSheet';
import { ScrollView, View } from 'react-native';
import { TypoComp } from '../../../../components/common';
import CustomCheckBox from '../../../../components/form/CustomCheckBox';

const PreviewArvrImg = () => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const [infoState, setInfoState] = useState({
        checkSelectAll: false,
    });

    const InfoData = [
        "Move & Explore – Rotate and view the site in 360°",
        "Place Panels – Add solar panels to terrace or ground",
        "Adjust & Move – Reposition or tilt panels as needed",
        "Capture Image – Take snapshots of your setup",
        "Record Video – Create a walkthrough recording",
        "Save Draft – Save progress and continue later",
        "Cancel – Exit without saving"
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isDownload isShare isPrimaryHeader={false} isPrimary={false} isSecondaryHeader={true} isBack onBackPress={() => navigation.goBack()} screenName='Try AR/VR' isInfo onInfoPress={() => bottomSheetRef.current?.open()} />
            <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }} showsVerticalScrollIndicator={false}>
                <TypoComp label='Select photos for download the photos to your local storage' color='#030204' variant='bodyMediumTertiary' />
                <CustomCheckBox
                    value={infoState.checkSelectAll}
                    label='Select all'
                    onValueChange={(val) => setInfoState((prev) => ({ ...prev, checkSelectAll: val }))}
                />
            </ScrollView>
            <CustomBottomSheet ref={bottomSheetRef}>
                <View style={{ flexDirection: 'column', gap: 24, paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'column', gap: 12 }}>
                        <TypoComp label='Guidelines for 360° AR/VR site preview' color='#030204' variant='headingSmallPrimary' />
                        <TypoComp label='Explore, place panels, and capture your site details with ease.' color='#67606E' variant='bodyMediumTertiary' />
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

export default PreviewArvrImg
