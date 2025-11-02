import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Hamburger, HeaderLogo, InfoIcon, NotificationIcon, ProfileIcon, SearchIcon } from '../../utils/imagesrc';
import { useDrawerStore } from '../../hooks/Drawer/useDrawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackIcon, CancelIcon, DownloadIcon, SettingsIcon, ShareIcon, WalletIcon } from '../../utils/svgSrc';
import useFetchUserData from '../../hooks/useFetchUser';
import { Images } from '../../assets/images';
import { useGetProfile } from '../../hooks/useProfile';
import { CroppedImage, Typo } from '../../components';

interface headerComp {
  statubarColor?: string;
  isSearch?: boolean;
  isNotification?: boolean;
  isProfile?: boolean;
  isPrimary?: boolean;
  isStatusbar?: boolean;
  isPrimaryHeader?: boolean;
  isSecondaryHeader?: boolean;
  onBackPress?: () => void;
  isBack?: boolean;
  screenName?: string;
  isDownload?: boolean;
  onDownloadPress?: () => void;
  isDownloadDisable?: boolean;
  isShare?: boolean;
  onSharePress?: () => void;
  isShareDisable?: boolean;
  bgColor?: string;
  isInfo?: boolean;
  onInfoPress?: () => void;
  isTime?: string;
  isCancel?: boolean;
  onCancelPress?: () => void;
  isSettings?: boolean;
  onSettingsPress?: () => void;
  isWallet?: string
}

const HeaderComp = ({
  statubarColor = '#E5F8E6',
  isSearch = true,
  isNotification = true,
  isProfile = true,
  isPrimary = true,
  isPrimaryHeader = true,
  isSecondaryHeader,
  onBackPress,
  isBack,
  screenName,
  isDownload,
  onDownloadPress,
  isDownloadDisable,
  isShare,
  onSharePress,
  isShareDisable,
  bgColor = '#E5F8E6',
  isInfo,
  onInfoPress,
  isTime,
  isCancel = false,
  onCancelPress,
  isSettings,
  onSettingsPress,
  isWallet
}: headerComp) => {
  const { openDrawer } = useDrawerStore();
  const navigation = useNavigation();
  const { user } = useFetchUserData();
  const { data: profileData, isLoading, error } = useGetProfile(user?.user?.id, user?.user?.userType);
  const userLogged: boolean = !!(user?.accessToken && user?.refreshToken);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(statubarColor);
      return () => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#FFFFFF');
      };
    }, [statubarColor])
  );

  const getProfileImage = () => {
    if (!profileData) return null;

    try {
      const baseUrl =
        profileData?.customerProfile?.baseUrl || profileData?.vendorProfile?.baseUrl;
      const imgStr =
        profileData?.customerProfile?.profileImage || profileData?.vendorProfile?.profileImage;

      if (!baseUrl || !imgStr) return null;

      const parsed = JSON.parse(imgStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return `${baseUrl}${parsed[0]}`;
      }

      return null;
    } catch (err) {
      console.warn('Invalid profile image JSON:', err);
      return null;
    }
  };
  const placeholderImage = Images.placeholderimage;
  const profileImageUrl = getProfileImage();

  return (
    <>
      {isPrimaryHeader && (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 20, backgroundColor: bgColor }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            {isPrimary ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (userLogged) {
                      openDrawer();
                    } else {
                      navigation.navigate('Login' as never);
                    }
                  }}
                >
                  <Hamburger />
                </TouchableOpacity>
                <HeaderLogo />
              </>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {isBack && onBackPress && (
                  <TouchableOpacity onPress={onBackPress}>
                    <BackIcon />
                  </TouchableOpacity>
                )}
                <Typo label={screenName} variant="titleLargeSecondary" color="#030204" />
              </View>
            )}
          </View>


          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            {isSearch && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate((userLogged ? 'Search' : 'Login') as never);
                }}
              >
                <SearchIcon />
              </TouchableOpacity>
            )}

            {isNotification && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate((userLogged ? 'Notification' : 'Login') as never);
                }}
              >
                <NotificationIcon />
              </TouchableOpacity>
            )}

            {isProfile && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate((userLogged ? 'Profile' : 'Login') as never);
                }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#148057" />
                ) : (profileData?.vendorProfile?.profileImage || profileData?.customerProfile?.profileImage) ? (
                  <CroppedImage
                    // source={{ uri: profileImageUrl }}
                    source={{ uri: `${profileData?.vendorProfile?.baseUrl || profileData?.customerProfile?.baseUrl}${profileData?.vendorProfile?.profileImage || profileData?.customerProfile?.profileImage}` }}
                    width={24}
                    height={24}
                    cutSize={1}
                  />
                ) : (
                  <CroppedImage source={{ uri: placeholderImage }} width={24} height={24} cutSize={1} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {isSecondaryHeader && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {isBack && onBackPress && (
              <TouchableOpacity onPress={onBackPress}>
                <BackIcon />
              </TouchableOpacity>
            )}
            {isPrimary && (
              <TouchableOpacity onPress={openDrawer}>
                <Hamburger />
              </TouchableOpacity>
            )}
            {isCancel && onCancelPress && (
              <TouchableOpacity onPress={onCancelPress}>
                <CancelIcon />
              </TouchableOpacity>
            )}
            <Typo label={screenName} variant="titleLargeSecondary" color="#030204" />
            {isInfo && (
              <TouchableOpacity onPress={onInfoPress}>
                <InfoIcon />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            {isDownload && (
              <TouchableOpacity
                onPress={!isDownloadDisable ? onDownloadPress : undefined}
                disabled={isDownloadDisable}
              >
                <DownloadIcon color={isDownloadDisable ? '#67606E' : '#148057'} />
              </TouchableOpacity>
            )}
            {isShare && (
              <TouchableOpacity
                onPress={!isShareDisable ? onSharePress : undefined}
                disabled={isShareDisable}
              >
                <ShareIcon color={isShareDisable ? '#67606E' : '#148057'} />
              </TouchableOpacity>
            )}
            {isTime && (
              <Typo label={isTime} variant="bodyMediumTertiary" color="#67606E" />
            )}
            {isSettings && (
              <TouchableOpacity onPress={onSettingsPress}>
                <SettingsIcon />
              </TouchableOpacity>
            )}
            {isWallet && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#CAF9E3', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 40 }}>
                <WalletIcon />
                <Typo label={isWallet} color='#030204' variant='bodyMediumSecondary' />
              </View>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default HeaderComp;
