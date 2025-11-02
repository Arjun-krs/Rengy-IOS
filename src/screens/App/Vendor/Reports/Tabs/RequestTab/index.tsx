import React, { useState } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { GraphCard } from '../../../Home/Components'
import RequestCard from '../../../../../../components/Cards/RequestCard'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRequestList } from '../../../../../../hooks/useRequest'
import Dropdown from '../../../Home/Components/GraphDropdown'
import { Typo } from '../../../../../../components'

type RootStackParamList = {
  RequestDetails: undefined;

};

const RequestTab = () => {
  const { height } = Dimensions.get('screen')
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [infoState, setInfoState] = useState({
    search: '',
    projectVal: ''
  })
  const { data: requestList } = useRequestList(infoState?.search)

  const handleDropdownChange = (
    key: 'projectVal',
    value: string,
  ) => {
    setInfoState(prev => ({ ...prev, [key]: value }));
  };

  const cardData = [
    { value: 15, label: 'Discount Approval' },
    { value: 3, subValue: 6, label: 'Material Shortage/Damage' },
    { value: 4, subValue: 6, label: 'Extra Material' },
    { value: 3, subValue: 6, label: 'Maintenance' },
  ];

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ gap: 24, marginBottom: 26 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typo color='#030204' label={'Projects overview'} variant='headingSmallPrimary' />
            <TouchableOpacity onPress={() => navigation.navigate('RaiseRequest')} >
              <Typo color='#148057' label={'Raise a request'} variant='bodyMediumPrimary' />
            </TouchableOpacity>
          </View>
          <GraphCard numColumns={2} cardData={cardData} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typo color='#030204' label={'Requests'} variant='headingSmallSecondary' />
          <Dropdown
            options={[{ label: 'Discount Approval', value: 'Discount Approval' }]}
            value={infoState?.projectVal}
            onValueChange={(val: string) =>
              handleDropdownChange('projectVal', val)
            }
          />
        </View>
      </View>
      <RequestCard
        handlePressCard={(item) => {
          navigation.navigate('RequestDetails', { id: item?.id, screenName: item?.requestRefNo })
        }}
        requests={requestList?.data?.[0]?.list}
      />
    </ScrollView>
  )
}

export default RequestTab
