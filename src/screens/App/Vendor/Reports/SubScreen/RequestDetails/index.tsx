import React from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ExpandableCard from '../../../../../../components/Cards/ExpandableCard'
import HeaderComp from '../../../../../../navigation/DynamicRoutes/Components/HeaderComp'
import { useRequestDetail } from '../../../../../../hooks/useRequest'
import { formatDate } from '../../../../../../utils/commonFunc'
import ReqDetailLoader from '../../Components/reqDetailLoader'

const RequestDetails = ({ route }) => {
    const { id, screenName } = route?.params
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { data: requestDetail, isPending } = useRequestDetail(id)
    console.log(requestDetail, 'requestDetail');

    const data = {
        reqId: `#${requestDetail?.requestRefNo}`,
        reqStatus: 'Pending',
        reqType: requestDetail?.requestTypeDetail?.name || '-',
        raisedBy: requestDetail?.createdBy || '-',
        contactPerson: requestDetail?.user?.vendor?.name || '-',
        contactPersonContact: '+91 9876543210',
        dateRaised: formatDate(requestDetail?.createdAt) || '-',
        status: requestDetail?.status || '-',
        reqDes: requestDetail?.description || '-',
        reqReason: requestDetail?.reason || '-',
        projectName: 'ABC Solar Installation',
        projectId: 'PRJ-5024',
        customerName: requestDetail?.user?.vendor?.name || '-',
        location: 'Bangalore, Karnataka',
        expectedDate: '20 Aug 2025'
    }

    const file = [
        {
            fileName: 'PAN.pdf',
            fileSize: '200KB',
            downloadUrl: 'pdf'
        },
        {
            fileName: 'AADHAR.pdf',
            fileSize: '200KB',
            downloadUrl: 'aadhar'
        }
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <HeaderComp isBack onBackPress={() => navigation.goBack()} screenName={`#${screenName}`} isPrimary={false} bgColor='#FFFFFF' isSearch={false} isNotification={false} isProfile={false} />
            {isPending ? (
                <ReqDetailLoader />
            ) : (
                <>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 20 }}>
                        <ExpandableCard data={data} />
                        <ExpandableCard file={file} handleDownloadURL={(item) => console.log(item)} />
                    </ScrollView>
                </>
            )}
        </SafeAreaView>
    )
}

export default RequestDetails
