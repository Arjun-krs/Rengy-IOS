import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';

import { TypoComp } from '../../../components/common'
import Button from '../../../components/common/Button';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp'
import { MyLocation, ShareLoc } from '../../../utils/svgSrc';

const NewLeadNotify = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isPrimary={false} isPrimaryHeader={false} isSecondaryHeader={true} isBack onBackPress={() => navigation.goBack()} screenName='New lead from Rengy' isTime='10:30 AM' />

            <ScrollView contentContainerStyle={{ padding: 16, gap: 32 }}>
                <View style={{ gap: 12 }}>
                    <TypoComp label='Lead details' color='#030204' variant='bodyLargeSecondary' />
                    {['Name', 'Phone', 'Email', 'Location'].map((label, index) => {
                        const value = ['Rajesh', '9876543212', 'rajesh@gmail.com', 'The Lali Ashok Bangalore'][index];
                        return (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: label === 'Location' ? 'flex-start' : 'center' }}>
                                <TypoComp color="#67606E" label={label} variant='bodyMediumTertiary' />

                                {label === 'Location' ? (
                                    <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                                        <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                                        <View style={{ backgroundColor: '#CAF7E6', padding: 5, borderRadius: 40, flexDirection: 'row', gap: 10 }}>
                                            <TypoComp color="#030204" label={'5km away'} variant='bodySmallSecondary' />
                                            <ShareLoc />
                                        </View>
                                    </View>
                                ) : (
                                    <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                                )}
                            </View>
                        );
                    })}
                </View>
                <View style={{ gap: 12 }}>
                    <TypoComp label='Project requirements' color='#030204' variant='bodyLargeSecondary' />
                    {['Project type', 'Capacity', 'Budget', 'Preferred installation timeline', 'Battery backup', 'Additional notes'].map((label, index) => {
                        const value = ['Rajesh', '10 kW', '₹4,50,000', 'July 2025', 'Yes', 'Client interested in Net metering'][index];
                        return (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: label === 'Location' ? 'flex-start' : 'center' }}>
                                <TypoComp color="#67606E" label={label} variant='bodyMediumTertiary' />
                                <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={{ padding: 16, justifyContent: 'space-between', flexDirection: 'row', gap: 16, position: 'absolute', bottom: 0 }}>
                <Button title='Reject Lead' type='secondary' onPress={() => navigation.goBack()} />
                <Button title='Accept Lead' onPress={() => navigation.navigate('LeadLocation')} />
            </View>
        </SafeAreaView>
    )
}

export default NewLeadNotify
