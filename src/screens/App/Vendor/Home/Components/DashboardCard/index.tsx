import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../../theme/colors';
import { RankBadgeIcon } from '../../../../../../utils/imagesrc';
import useFetchUserData from '../../../../../../hooks/useFetchUser';
import { useGetProfile } from '../../../../../../hooks/useProfile';
import { CroppedImage, Typo } from '../../../../../../components';
interface DashboardCardProps {
  cardData: any;
}

const DashboardCard = ({ cardData }: DashboardCardProps) => {
  const { width } = Dimensions.get('screen');
  const { user } = useFetchUserData()
  const { data: profileData } = useGetProfile(user?.user?.id, user?.user?.userType)
  console.log('profileData', profileData);

  const profileImage = profileData?.vendorProfile?.profileImage;

  let imageUri = 'https://i.pravatar.cc/150';

  if (profileImage) {
    try {
      const parsed = JSON.parse(profileImage);
      imageUri = `${profileData?.vendorProfile?.baseUrl}${parsed[0]}`;
    } catch (err) {
      console.warn('Invalid profileImage JSON:', err);
    }
  }

  return (
    <View style={{ backgroundColor: COLORS.white, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 16, gap: 20, marginTop: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <CroppedImage
          // source={{ uri: `${profileData?.vendorProfile?.baseUrl}${JSON.parse(profileData?.vendorProfile?.profileImage)?.[0]}` || 'https://i.pravatar.cc/150' }}
          // source={{ uri: imageUri }}
          source={{ uri: `${profileData?.vendorProfile?.baseUrl}${profileData?.vendorProfile?.profileImage}` || 'https://i.pravatar.cc/150' }}
          width={60}
          height={60}
          cutSize={20}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 30 }}>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Typo color='#030204' label={cardData?.projects} variant='titleLargeSecondary' />
            <Typo color='#67606E' label={'Projects'} variant='bodySmallTertiary' />
          </View>

          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Typo color='#030204' label={cardData?.profit_earned} variant='titleLargeSecondary' />
            <Typo color='#67606E' label={'Profit Earned'} variant='bodySmallTertiary' />
          </View>

          <View style={{ flexDirection: 'column', gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typo color='#030204' label={cardData?.rank} variant='titleLargeSecondary' />
              <RankBadgeIcon />
            </View>
            <Typo color='#67606E' label={'Rank'} variant='bodySmallTertiary' />
          </View>
        </View>
      </View>

      <View>
        <Typo color='#030204' label={`Hi ${profileData?.vendorProfile?.name || ''}`} variant='headingLargePrimary' />
        <Typo color='#67606E' label={'Keep going , your Solar Business mastery awaits!'} variant='bodyMediumTertiary' />
      </View>
    </View>
  );
};

export default DashboardCard;
