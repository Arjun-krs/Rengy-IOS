import React, { useEffect, useState } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GraphCard, ProjectCard } from '../../../Home/Components'
import { ProjectNoData } from '../../../../../../utils/imagesrc'
import { useProjectList } from '../../../../../../hooks/useProject'
import ProjectLoader from '../../Components/projectLoader'
import { Typo } from '../../../../../../components'
import Dropdown from '../../../Home/Components/GraphDropdown'

const ProjectTab = () => {
  const { width, height } = Dimensions.get('screen');
  const insets = useSafeAreaInsets()
  const [infoState, setInfoState] = useState({
    search: '',
    projectVal: ''
  })
  const { data: projectList, refetch, isPending } = useProjectList(infoState?.search)

  useEffect(() => {
    refetch()
  }, [])

  const handleDropdownChange = (key: 'projectVal', value: string) => {
    setInfoState(prev => ({ ...prev, [key]: value }));
  };

  const cardData = [
    { value: 15, label: 'Leads added', color: '#70F3C3' },
    { value: 3, subValue: 6, label: 'Site survey', color: '#E3FACE' },
    { value: 4, subValue: 6, label: 'Loan Processing', color: '#F9FFBF' },
    { value: 3, subValue: 6, label: 'Designs', color: '#CEF2FA' },
    { value: 2, subValue: 6, label: 'Dispatched', color: '#EAEBFF' },
    { value: 2, subValue: 6, label: 'Installation', color: '#FCF0FF' },
  ];

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ gap: 24, marginBottom: 40 }}>
          <Typo label={'Projects overview'} color='#030204' variant='headingSmallPrimary' />
          <GraphCard numColumns={3} cardData={cardData} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typo label={'Projects'} color='#030204' variant='headingSmallSecondary' />

          <Dropdown
            options={[{ label: 'Site Survey', value: 'Site Survey' }]}
            value={infoState?.projectVal}
            onValueChange={(val: string) =>
              handleDropdownChange('projectVal', val)
            }
          />
        </View>
      </View>
      {isPending ? (
        <ProjectLoader />
      ) : (
        projectList?.length > 0 ? (
          <ProjectCard projects={projectList} />
        ) : (
          <View style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <ProjectNoData />
              <Typo color='#67606E' label='No Projects Available' variant='bodySmallTertiary' />
            </View>
          </View>
        )
      )}
    </ScrollView>
  )
}

export default ProjectTab
