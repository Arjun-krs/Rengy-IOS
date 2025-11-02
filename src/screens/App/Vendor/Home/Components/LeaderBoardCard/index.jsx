import React from 'react'
import { Dimensions, FlatList, Image, View } from 'react-native'
import { GradeOne, GradeThree, GradeTwo } from '../../../../../../utils/imagesrc'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typo } from '../../../../../../components'

const LeaderBoardCard = () => {
    const insets = useSafeAreaInsets()
    const { height } = Dimensions.get('window')
    const DATA = [
        {
            id: 2,
            title: 'Leslie Alexander',
            pos: '#4'

        },
        {
            id: 3,
            title: 'Arlene McCoy',
            pos: '#5'
        },
        {
            id: 1,
            title: 'You',
            pos: '#100',
            isMe: true
        },
        {
            id: 4,
            title: 'Ralph Edwards',
            pos: '#6'
        },
    ];

    const sortedData = [...DATA].sort((a, b) => (b?.isMe ? 1 : 0) - (a?.isMe ? 1 : 0));

    const Card = ({ data }) => (
        <View style={{ borderRadius: 12, padding: 12, borderWidth: data?.isMe ? 0 : 1, borderColor: '#EBEBEB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#FFFFFF", elevation: data?.isMe ? 4 : 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150' }}
                    style={{ width: 32, height: 32, borderRadius: 50 }}
                />
                <Typo label={data?.title} color='#030204' variant='bodyMediumSecondary' />
            </View>
            <Typo label={data?.pos} color='#67606E' variant='bodyMediumTertiary' />
        </View>

    );

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 16, justifyContent: 'center' }}>
                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150' }}
                            style={{ width: 52, height: 52, borderRadius: 50 }}
                        />
                        <View style={{ gap: 2, alignItems: "center" }}>
                            <Typo color='#030204' label={'Marsha Fisher'} variant='bodyMediumTertiary' />
                            <Typo color='#67606E' label={'11 Projects'} variant='bodySmallTertiary' />
                        </View>
                    </View>
                    <GradeTwo />
                </View>

                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150' }}
                            style={{ width: 52, height: 52, borderRadius: 50 }}
                        />
                        <View style={{ gap: 2, alignItems: "center" }}>
                            <Typo color='#030204' label={' Juanita Cormier'} variant='bodyMediumTertiary' />
                            <Typo color='#67606E' label={'14 Projects'} variant='bodySmallTertiary' />
                        </View>
                    </View>
                    <GradeOne />
                </View>

                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150' }}
                            style={{ width: 52, height: 52, borderRadius: 50 }}
                        />
                        <View style={{ gap: 2, alignItems: "center" }}>
                            <Typo color='#030204' label={'  Maria Shah'} variant='bodyMediumTertiary' />
                            <Typo color='#67606E' label={'9 Projects'} variant='bodySmallTertiary' />
                        </View>
                    </View>
                    <GradeThree />
                </View>
            </View>
            <FlatList
                data={sortedData}
                renderItem={({ item }) => <Card data={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={{ gap: 16, paddingHorizontal: 16, paddingBottom: height * 0.15 }}
            />
        </>
    )
}

export default LeaderBoardCard
