import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform, FlatList } from 'react-native';
import { Typo, TypoComp } from '../common';
import { ArrowIcon } from '../../utils/svgSrc';
import { DownloadIcon, PdfIcon } from '../../utils/imagesrc';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface RequestData {
    reqStatus: string;
    reqId: string;
    reqType: string;
    raisedBy: string;
    contactPerson: string;
    contactPersonContact: string;
    dateRaised: string;
    status: string;
    reqDes: string;
    reqReason: string;
    projectName: string;
    projectId: string;
    customerName: string;
    location: string;
    expectedDate: string;
}

interface RequestFile {
    fileName: string,
    fileSize: string,
    downloadUrl: string
}

interface ExpandableCardProps {
    data?: RequestData;
    isOpen?: boolean;
    file?: RequestFile[];
    handleDownloadURL?: (url: string) => void;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ data, isOpen = true, file, handleDownloadURL }) => {
    const [expanded, setExpanded] = useState<boolean>(isOpen);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(prev => !prev);
    };

    const DocWrapper: React.FC<{ items: RequestFile }> = ({ items }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#EBE7EE', padding: 12, borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <PdfIcon />
                <View style={{ flexDirection: 'column' }}>
                    <TypoComp color='#030204' variant='bodyMediumTertiary' label={items?.fileName} />
                    <TypoComp color='#67606E' variant='bodySmallTertiary' label={items?.fileSize} />
                </View>
            </View>
            <TouchableOpacity onPress={() => handleDownloadURL && handleDownloadURL(items.downloadUrl)}>
                <DownloadIcon />
            </TouchableOpacity>
        </View >
    );

    return (
        <View style={[styles.container, { backgroundColor: '#FFFFFF', elevation: 5 }]} >
            <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
                <TypoComp color='#030204' variant='titleLargeSecondary' label={data ? 'Request Summary' : 'Supporting documents'} />
                <ArrowIcon color={'#148057'} style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>

            {expanded && (
                <>
                    {data && (
                        <View style={{ marginTop: 20, gap: 16 }}>
                            <View style={{ flexDirection: 'column', gap: 12 }}>
                                <TypoComp color='#030204' label={'Contact details'} variant='bodyLargeSecondary' />

                                {['Request ID', 'Request type', 'Raised by', 'Contact person', 'Contact person contact', 'Date raised', 'Status'].map((label, index) => {
                                    const value = [data?.reqId, data?.reqType, data?.raisedBy, data?.contactPerson, data?.contactPersonContact, data?.dateRaised, data?.status][index];
                                    return (
                                        <View
                                            key={index}
                                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TypoComp color="#67606E" label={label} variant='bodyMediumTertiary' />

                                            {label === 'Request ID' ? (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                                    <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                                                    <View
                                                        style={{ backgroundColor: '#FFF5D4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 40 }}>
                                                        <TypoComp color="#030204" label={data?.reqStatus} variant='bodySmallSecondary' />
                                                    </View>
                                                </View>
                                            ) : (
                                                <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                                            )}
                                        </View>
                                    );
                                })}
                            </View>

                            <View style={{ flexDirection: 'column', gap: 12 }}>
                                <TypoComp color='#030204' label={'Request Description'} variant='bodyLargeSecondary' />
                                <TypoComp color='#67606E' label={data?.reqDes} variant='bodyMediumTertiary' />
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <Typo color='#67606E' style={{ fontSize: 14 }}>
                                        <Typo color='#030204' style={{ fontSize: 14 }} >
                                            Reasons:
                                        </Typo>
                                        {data?.reqReason}
                                    </Typo>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'column', gap: 12 }}>
                                <TypoComp color='#030204' label={'Project Details'} variant='bodyLargeSecondary' />

                                {['Project name', 'Project ID', 'Customer name', 'Location', 'Expected installation date'].map((label, index) => {
                                    const value = [data?.projectName, data?.projectId, data?.customerName, data?.location, data?.expectedDate][index];
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TypoComp color="#67606E" label={label} variant='bodyMediumTertiary' />
                                            <TypoComp color="#030204" label={value} variant='bodyMediumSecondary' />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {file && (
                        <FlatList
                            data={file}
                            renderItem={({ item }) => <DocWrapper items={item} />}
                            contentContainerStyle={{ gap: 20 }}
                        />
                    )}
                </>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        gap: 10,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    }
});

export default ExpandableCard;
