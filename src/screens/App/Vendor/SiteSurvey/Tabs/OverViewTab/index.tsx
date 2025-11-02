import React, { useMemo, useState, useCallback } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { Button, ExpandableCard, TypoComp } from '../../../../../../components/common'
import { MiniLogo, PlusIcon, TickIcon } from '../../../../../../utils/svgSrc'
import { DownloadIcon, PdfIcon } from '../../../../../../utils/imagesrc'
import CustomCheckBox from '../../../../../../components/form/CustomCheckBox'
import {
    DISPATCH_PROGRESS_LABELS,
    INSTALLATION_LABELS,
    LEAD_DETAIL_LABELS,
    NET_METERING_LABELS,
    PAYMENT_LABELS,
    PROCUREMENT_LABELS,
    PROJECT_REQUIREMENT_LABELS,
    SECTION_CONSTANTS,
    SITE_DETAILS_LABELS,
    TRANSPORTER_LABELS
} from './staticData'

const OverviewTab = () => {
    const sections = useMemo(() => SECTION_CONSTANTS, [])
    const [currentSectionKey, setCurrentSectionKey] = useState(sections[0].key)
    interface Section {
        key: string;
        title: string;
    }
    interface LabelValueRow {
        label: string;
        value: string;
    }
    const getSectionIndex = useCallback(
        (key: string): number => sections.findIndex((section: Section) => section.key === key),
        [sections]
    )

    const renderLabel = useCallback(
        (arr: LabelValueRow[]) =>
            arr.map(({ label, value }, idx) => (
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <TypoComp color="#67606E" label={label} variant="bodyMediumTertiary" />
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TypoComp color="#030204" style={{ textAlign: 'right' }} label={value} variant="bodyMediumSecondary" />
                    </View>
                </View>
            )),
        []
    );

    const renderHeader = useCallback(({ item, index }) => {
        const isActive = currentSectionKey === item.key
        const isCompleted = index < getSectionIndex(currentSectionKey)
        return (
            <TouchableOpacity
                onPress={() => setCurrentSectionKey(item.key)}
                style={{ flexDirection: 'row', alignItems: 'flex-start' }}
            >
                <View style={{ alignItems: 'center', gap: 6, width: 90 }}>
                    {isCompleted ? (
                        <View style={{ width: 32, height: 32, backgroundColor: '#148057', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                            <TickIcon />
                        </View>
                    ) : isActive ? (
                        <View style={{ width: 32, height: 32, backgroundColor: '#131337', alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}>
                            <MiniLogo color='#71F4C3' />
                        </View>
                    ) : (
                        <View style={{ width: 32, height: 32, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 40, borderWidth: 1, borderColor: '#EBE7EE' }}>
                            <TypoComp label={(index + 1).toString()} variant='bodySmallTertiary' color='#030204' />
                        </View>
                    )}
                    <TypoComp color='#030204' variant='bodyMediumSecondary' label={item.title} style={{ textAlign: 'center' }} />
                </View>
                {index !== sections?.length - 1 && (
                    <View style={{ width: 70, height: 1, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D4CEDA', marginHorizontal: 8, marginTop: 16, position: 'absolute', left: 55 }} />
                )}
            </TouchableOpacity>
        )
    }, [currentSectionKey, getSectionIndex, sections?.length])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={sections}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderHeader}
                keyExtractor={(_, idx) => idx.toString()}
                contentContainerStyle={{ padding: 16, gap: 10 }}
                style={{ backgroundColor: '#EBFAEC' }}
                extraData={currentSectionKey}
            />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20, gap: 20, minHeight: '100%' }} showsVerticalScrollIndicator={false}>
                <ExpandableCard title={sections[0].title} isOpen={currentSectionKey === sections[0].key}>
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 12 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TypoComp label={'Contact details'} variant='bodyLargeSecondary' color='#030204' />
                                <View style={{ backgroundColor: '#D5FCED', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 40 }}>
                                    <TypoComp label={'Lead added'} variant='bodySmallTertiary' color='#030204' />
                                </View>
                            </View>
                            {renderLabel(LEAD_DETAIL_LABELS)}
                        </View>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Project requirement'} variant='bodyLargeSecondary' color='#030204' />
                            {renderLabel(PROJECT_REQUIREMENT_LABELS)}
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <PlusIcon />
                            <TypoComp label={'Add additional note'} color='#148057' variant='bodyMediumSecondary' />
                        </TouchableOpacity>
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[1].title} isOpen={currentSectionKey === sections[1].key}>
                    <View style={{ gap: 12 }}>
                        <TypoComp label={'Site details'} variant='bodyLargeSecondary' color='#030204' />
                        <View style={{ gap: 12 }}>
                            {renderLabel(SITE_DETAILS_LABELS)}
                            <Button title='Start site survey' type='secondary' />
                        </View>
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[2].title} isOpen={currentSectionKey === sections[2].key}>
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Total value'} variant='bodyLargeSecondary' color='#030204' />
                            {renderLabel(PAYMENT_LABELS)}
                        </View>
                        <Button title='Select payment type' type='secondary' />
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[3].title} isOpen={currentSectionKey === sections[3].key}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: '#EBE7EE',
                        padding: 12, borderRadius: 8
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <PdfIcon />
                            <View>
                                <TypoComp color='#030204' variant='bodyMediumTertiary' label={'DRL Report'} />
                                <TypoComp color='#67606E' variant='bodySmallTertiary' label={'200KB'} />
                            </View>
                        </View>
                        <TouchableOpacity >
                            <DownloadIcon />
                        </TouchableOpacity>
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[4].title} isOpen={currentSectionKey === sections[4].key}>
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Procurement in Progress'} variant='bodyLargeSecondary' color='#030204' />
                            {renderLabel(PROCUREMENT_LABELS)}
                        </View>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Dispatch progress'} variant='bodyLargeSecondary' color='#030204' />
                            {renderLabel(DISPATCH_PROGRESS_LABELS)}
                        </View>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Transporter details'} variant='bodyLargeSecondary' color='#030204' />
                            {renderLabel(TRANSPORTER_LABELS)}
                        </View>
                        <Button title='Call for support' type='secondary' />
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[5].title} isOpen={currentSectionKey === sections[5].key}>
                    <View style={{ gap: 20 }}>
                        <View style={{ gap: 12 }}>
                            {renderLabel(INSTALLATION_LABELS)}
                        </View>
                        <Button title='Upload installation pictures' type='secondary' />
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[6].title} isOpen={currentSectionKey === sections[6].key}>
                    <View style={{ gap: 12 }}>
                        {renderLabel(NET_METERING_LABELS)}
                    </View>
                </ExpandableCard>

                <ExpandableCard title={sections[7].title} isOpen={currentSectionKey === sections[7].key}>
                    <View style={{ backgroundColor: '#F5F5F5', padding: 12, borderRadius: 8 }}>
                        <View style={{ gap: 12 }}>
                            <TypoComp label={'Warranty card'} variant='bodyMediumSecondary' />
                            <Image
                                source={require('../../../../../../assets/images/png/completeProject.png')}
                                style={{ width: '100%', height: 148 }}
                                resizeMode='cover'
                                resizeMethod='resize'
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                <DownloadIcon />
                                <TypoComp label={'Download warranty card pdf'} color='#148057' />
                            </View>
                        </View>
                    </View>
                    <CustomCheckBox
                        label='RMA installed'
                        onValueChange={el => console.log(el)}
                        value={false}
                    />
                    <Button title='Project completed' type='secondary' />
                </ExpandableCard>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OverviewTab
