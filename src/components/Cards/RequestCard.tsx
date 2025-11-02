import React from 'react';
import { View, FlatList, TouchableOpacity, Image, ListRenderItem } from 'react-native';
import { DeleteIcon, SecondaryLogo } from '../../utils/imagesrc';
import { formatDate } from '../../utils/commonFunc';
import Typo from '../Typo';

interface Vendor {
    name: string;
}

interface User {
    vendor?: Vendor;
}
interface RequestDetails {
    id: number;
    baseUrl?: string | string[];
    image?: string;
    user?: User;
    createdAt?: string;
    requestRefNo?: string;
    requestType?: string;
    status?: string;
    isLead?: boolean;
}

interface RequestWrapperProps {
    requestDetails: RequestDetails;
    handlePressCard: () => void;
}

const RequestWrapper: React.FC<RequestWrapperProps> = ({ requestDetails, handlePressCard }) => {
    return (
        <TouchableOpacity
            onPress={handlePressCard}
            style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 3, gap: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                <Image
                    // source={{ uri: `${requestDetails.baseUrl}${requestDetails?.image?.[0]}` }}
                    source={{ uri: 'https://i.pravatar.cc/150' }}
                    style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 1, borderColor: '#EBEBEB' }}
                />
                <Typo color="#030204" variant='bodyLargeSecondary' label={requestDetails?.user?.vendor?.name || '-'} />
            </View>

            <View style={{ flexDirection: 'column', gap: 12 }}>
                {['Date raised', 'Request ID', 'Request type', 'Status'].map((label, index) => {
                    const value = [(formatDate(requestDetails?.createdAt) || '-'), (`#${requestDetails?.requestRefNo}` || '-'), (requestDetails?.requestTypeDetail?.name || '-'), (requestDetails?.status || '-')][index];
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Typo variant='bodyMediumTertiary' label={label} color="#67606E" />
                            <Typo variant='bodyMediumSecondary' label={value} color="#030204" />
                        </View>
                    );
                })}
            </View>

            <View style={{ gap: 10 }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity>
                        <Typo variant='bodyMediumPrimary' label={'Cancel request'} color="#148057" />
                    </TouchableOpacity>

                    {requestDetails.isLead && (
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#D5FCED', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 40 }}>
                            <SecondaryLogo />
                            <Typo label={'Lead by Rengy'} color='#030204' variant='bodySmallTertiary' />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface RequestCardProps {
    requests: RequestDetails[];
    handlePressCard: (request: RequestDetails) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ requests, handlePressCard }) => {
    const renderItem: ListRenderItem<RequestDetails> = ({ item }) => (
        <RequestWrapper requestDetails={item} handlePressCard={() => handlePressCard(item)} />
    );

    return (
        <FlatList
            data={requests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, gap: 20 }}
        />
    );
};

export default RequestCard;
