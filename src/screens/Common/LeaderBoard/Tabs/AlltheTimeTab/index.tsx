import React from 'react'
import { Dimensions, FlatList, Image, ImageBackground, View } from 'react-native'
import { GradeOne, GradeThree, GradeTwo } from '../../../../../utils/imagesrc'
import { TypoComp } from '../../../../../components/common'

const AllTimeScreen = () => {

    const DATA = [
        {
            id: 2,
            title: 'Leslie Alexander',
            pos: '#4',
            projects: 9
        },
        {
            id: 3,
            title: 'Arlene McCoy',
            pos: '#5',
            projects: 8

        },
        {
            id: 1,
            title: 'You',
            pos: '#100',
            isMe: true,
            projects: 5
        },
        {
            id: 4,
            title: 'Ralph Edwards',
            pos: '#6',
            projects: 8
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
                <TypoComp label={data?.title} color='#030204' variant='bodyMediumSecondary' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TypoComp label={`${data?.projects} Projects`} style={{ backgroundColor: '#F5F5F5', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 40 }} />
                <TypoComp label={data?.pos} color='#67606E' variant='bodyMediumTertiary' />
            </View>
        </View>

    );

    return (
        <ImageBackground source={require('../../../../../assets/images/png/bg.png')} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, paddingVertical: 16, justifyContent: 'center', marginTop: 30 }}>
                <View style={{ gap: 12 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150' }}
                            style={{ width: 52, height: 52, borderRadius: 50 }}
                        />
                        <View style={{ gap: 2, alignItems: "center" }}>
                            <TypoComp color='#030204' label={'Marsha Fisher'} variant='bodyMediumTertiary' />
                            <TypoComp color='#67606E' label={'11 Projects'} variant='bodySmallTertiary' />
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
                            <TypoComp color='#030204' label={' Juanita Cormier'} variant='bodyMediumTertiary' />
                            <TypoComp color='#67606E' label={'14 Projects'} variant='bodySmallTertiary' />
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
                            <TypoComp color='#030204' label={'  Maria Shah'} variant='bodyMediumTertiary' />
                            <TypoComp color='#67606E' label={'9 Projects'} variant='bodySmallTertiary' />
                        </View>
                    </View>
                    <GradeThree />
                </View>
            </View>
            <FlatList
                data={sortedData}
                renderItem={({ item }) => <Card data={item} />}
                keyExtractor={item => item?.id}
                contentContainerStyle={{ gap: 16, paddingHorizontal: 16, paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </ImageBackground>
    )
}

export default AllTimeScreen
