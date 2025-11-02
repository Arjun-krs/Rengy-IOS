import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { EditIcon } from '../../../../../../../utils/imagesrc';
import { Images } from '../../../../../../../assets/images';
import { CroppedImage, Typo } from '../../../../../../../components';

const CustomerProfileCard = ({ userDetails, onEditPress }: any) => {
  const { width, height } = Dimensions.get('screen');

  return (
    <LinearGradient
      colors={['#E5F8E6', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 24, paddingVertical: 24 }}>
        <CroppedImage
          source={{ uri: (userDetails?.customerProfile?.baseUrl && userDetails?.customerProfile?.profileImage) ? `${userDetails?.customerProfile?.baseUrl}${userDetails?.customerProfile?.profileImage}` : Images?.placeholderimage }}
          width={120}
          height={120}
          cutSize={20}
        />
        <Typo label={userDetails?.customerProfile?.name} color="#030204" variant="headingSmallPrimary" />
      </View>
      <TouchableOpacity
        onPress={onEditPress}
        style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#70F3C3', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 24, right: 16 }}>
        <EditIcon color={'#148057'} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#CEF0D0' }}>
        <Typo label={'Customer ID:'} color="#67606E" variant="bodyMediumTertiary" />
        <Typo label={'CUS-000191991'} color={userDetails?.userCode || '-'} variant="bodyMediumTertiary" />
      </View>
    </LinearGradient>
  );
};

export default CustomerProfileCard;
