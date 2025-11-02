import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { HeaderPhoneIcon, MailIcon, VerifyIcon } from '../../../../../../../utils/svgSrc';
import { EditIcon } from '../../../../../../../utils/imagesrc';
import { Images } from '../../../../../../../assets/images';
import { CroppedImage, Typo } from '../../../../../../../components';

const VendorProfileCard = ({ userDetails, onEditPress, onVerifyEmail }: any) => {
  const { width, height } = Dimensions.get('screen');

  return (
    <>
      <LinearGradient
        colors={['#E5F8E6', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',paddingVertical: 32, paddingHorizontal: 16 }}>
          <CroppedImage
            source={{ uri: (userDetails?.vendorProfile?.baseUrl && userDetails?.vendorProfile?.profileImage) ? `${userDetails?.vendorProfile?.baseUrl}${userDetails?.vendorProfile?.profileImage}` : Images?.placeholderimage }}
            width={width * 0.2}
            height={height * 0.1}
            cutSize={20}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ gap: 12, flexDirection: 'column' }}>
              <Typo label={userDetails?.vendorProfile?.name} color="#030204" variant="headingSmallPrimary" />
              <View style={{ flexDirection: 'column', gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <MailIcon />
                  <Typo
                    label={userDetails?.email}
                    ellipsizeMode="tail"
                    style={{ width: width * 0.4 }}
                    numberOfLines={1}
                    variant="bodyMediumTertiary"
                    color="#67606E"
                  />
                  {userDetails?.isEmailVerified ? (
                    <VerifyIcon />
                  ) : (
                    <TouchableOpacity onPress={onVerifyEmail}>
                      <Typo label={'Verify'} color="#148057" variant="bodyMediumPrimary" />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <HeaderPhoneIcon />
                  <Typo label={userDetails?.mobileNumber} variant="bodyMediumTertiary" color="#67606E" />
                  {userDetails?.isMobileVerified && <VerifyIcon />}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={onEditPress}
              style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#70F3C3', alignItems: 'center', justifyContent: 'center' }}>
              <EditIcon color={'#148057'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#CEF0D0' }}>
        <Typo label={'Vendor ID:'} color="#67606E" variant="bodyMediumTertiary" />
        <Typo label={userDetails?.userCode || '-'} color="#030204" variant="bodyMediumTertiary" />
      </View>
    </>
  );
};

export default VendorProfileCard;
