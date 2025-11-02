import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, View } from 'react-native';

import { TypoComp } from '../../../components/common';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp';
import Button from '../../../components/common/Button';

const LeadLocation = () => {
    const navigation = useNavigation();
    const { height } = Dimensions.get('window');
    const [infoState, setInfoState] = useState({
        isStart: false,
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp
                isPrimary={false}
                isPrimaryHeader={false}
                isSecondaryHeader={true}
                isBack={!infoState?.isStart}
                isCancel={infoState?.isStart}
                onBackPress={() => navigation.goBack()}
                onCancelPress={() => setInfoState({ isStart: false })}
                screenName="Location"
            />

            {!infoState?.isStart && (
                <View style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%', borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: '#FFFFFF', padding: 16, gap: 24 }}>
                    <View style={{ gap: 8 }}>
                        <TypoComp
                            label="The Lali Ashok Bangalore"
                            color="#030204"
                            variant="bodyLargeSecondary"
                        />
                        <TypoComp
                            label="5 km away"
                            color="#67606E"
                            variant="bodyMediumTertiary"
                        />
                    </View>

                    <Button
                        title={'Start'}
                        onPress={() =>
                            setInfoState((prev) => ({ ...prev, isStart: !prev.isStart }))
                        }
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default LeadLocation;
