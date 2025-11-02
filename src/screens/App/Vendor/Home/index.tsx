import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardCard, GraphCard, GraphDropdown, LeaderBoardCard, ProjectCard } from './Components';
import { LeadAssign, PlusIcon, ProjectNoData, TrophyIcon } from '../../../../utils/imagesrc';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../../../../navigation/Components/HeaderComp.tsx';
import { LineGraph, Typo } from '../../../../components/index.tsx';

const cardData = {
  userName: 'Ramesh',
  projects: 0,
  profit_earned: 0,
  rank: '#100',
};

const projectDetail = [
  {
    projectCode: '#RNGY20250708',
    vendor: {
      name: 'Solar Installation',
    },
    totalAmount: 450000,
    progress: 25,
    isLead: true,
  },
  {
    customer: {
      name: 'Mahesh Sharma'
    },
    vendor: {
      name: 'Solar Installation',
    },
    totalAmount: 321000,
    progress: 38,
    isLead: false,
  },
];

const cardDataGraph = [
  { value: 0, subValue: 0, label: 'Leads added' },
  { value: 0, subValue: 0, label: 'Site survey' },
  { value: 0, subValue: 0, label: 'Loan Processing' },
  { value: 0, subValue: 0, label: 'Designs' },
  { value: 0, subValue: 0, label: 'Dispatched' },
  { value: 0, subValue: 0, label: 'Installation' },
];

const VendorHome: React.FC = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation();
  const [dropdownVal, setDropdownVal] = useState({
    earningsVal: '',
    projectVal: '',
  });

  const handleDropdownChange = (key: 'earningsVal' | 'projectVal', value: string) => {
    setDropdownVal(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#E5F8E6' }}>
      <HeaderComp statubarColor='#E5F8E6' />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient colors={['#E5F8E6', '#FFFFFF']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} >
            <View style={[styles.containerPadding]}>
              <DashboardCard cardData={cardData} />
              <View
                style={{ backgroundColor: '#030204', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <LeadAssign />
                  <Typo color='#FFFFFF' label='New lead assigned' variant='bodyMediumTertiary' />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SiteSurvey')}>
                  <Typo color='#70F4C3' label='View Details' variant='bodyMediumSecondary' />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#E5F8E6', '#FFFFFF']} end={{ x: 0.5, y: 0 }} start={{ x: 0.5, y: 1 }} style={{ flex: 1 }}>
            <LineGraph
              totalEarnings="₹30,000"
              comparisonText="than last month"
              comparisonPercentage="+3.89%"
              data={[
                { value: 3000, label: 'Jan' },
                { value: 3500, label: 'Feb' },
                { value: 4000, label: 'Mar' },
                { value: 4370, label: 'Apr', tooltip: '+2 Leads' },
                { value: 4500, label: 'May' },
                { value: 5000, label: 'Jun' },
                { value: 6000, label: 'Jul' },
                { value: 7000, label: 'Aug' },
              ]}
            />
            <View style={[styles.containerPadding, { paddingBottom: 16 }]}>
              <GraphCard cardData={cardDataGraph} numColumns={3} />
            </View>
          </LinearGradient>

          <LinearGradient
            // colors={['#E5F8E6', '#FFFFFF']}
            colors={['#FFFFFF', '#FFFFFF']}
            end={{ x: 0, y: 0.5 }}
            start={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          >
            <View
              style={[styles.containerPadding, { paddingTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <Typo color='#030204' label='Projects' variant='headingSmallSecondary' />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <GraphDropdown
                  options={[{ label: 'Latest', value: 'Latest' }]}
                  value={dropdownVal?.projectVal}
                  onValueChange={(val: string) =>
                    handleDropdownChange('projectVal', val)
                  }
                />
                <TouchableOpacity style={{ backgroundColor: '#131337', padding: 10, borderRadius: 4 }}>
                  <PlusIcon />
                </TouchableOpacity>
              </View>
            </View>
            {projectDetail?.length > 0 ? (
              <ProjectCard projects={projectDetail} />
            ) : (
              <View
                style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <ProjectNoData />
                  <Typo color='#67606E' label='No Projects Available' variant='bodySmallTertiary' />
                </View>
              </View>
            )}

            <View style={[styles.containerPadding, { paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
              <Typo color='#030204' label='Leaderboard' variant='headingSmallSecondary' />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 40, backgroundColor: '#FFF5D4' }}>
                <TrophyIcon />
                <Typo label='Top 18%' variant='bodyMediumTertiary' color='#030204' />
              </View>
            </View>
            <LeaderBoardCard />
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VendorHome;

const styles = StyleSheet.create({
  containerPadding: {
    paddingHorizontal: 16,
  },
});
