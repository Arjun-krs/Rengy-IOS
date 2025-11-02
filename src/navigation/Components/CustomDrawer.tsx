  import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, ScrollView, BackHandler, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useDrawerStore } from '../../hooks/Drawer/useDrawer';
import { useDrawerItems } from './useDrawerItems';
import useFetchUserData from '../../hooks/useFetchUser';
import { Images } from '../../assets/images';
import { useGetProfile } from '../../hooks/useProfile';
import { HeaderPhoneIcon, MailIcon, RightArrow } from '../../utils/svgSrc';
import { MenuBottomBg } from '../../utils/imagesrc';
import { CroppedImage, Typo } from '../../components';
const { width, height } = Dimensions.get('screen');
const DRAWER_WIDTH = width * 0.8;
export interface DrawerItemProps {
  icon: any;
  label: string;
  onPress: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 19, gap: 12, alignItems: 'center' }}>
    {icon}
    <Typo label={label} variant='bodyLargeTertiary' color='#030204' />
  </TouchableOpacity>
);

const CustomDrawer: React.FC = () => {
  const { user } = useFetchUserData()
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isDrawerVisible, openDrawer, closeDrawer } = useDrawerStore();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const drawerItems = useDrawerItems();
  const { data: profileData } = useGetProfile(user?.user?.id, user?.user?.userType)

  const animateDrawer = (open: boolean) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: open ? 0 : -DRAWER_WIDTH,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: open ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateDrawer(isDrawerVisible);
  }, [isDrawerVisible]);

  useEffect(() => {
    const backAction = () => {
      if (isDrawerVisible) {
        closeDrawer();
        return true;
      }
      return false;
    };
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => handler.remove();
  }, [isDrawerVisible, closeDrawer]);

  const handleNavigation = (screenName: string) => {
    closeDrawer();
    navigation.navigate(screenName as never);
  };

  const getProfileImage = () => {
    try {
      const baseUrl = user?.user?.vendorProfile?.baseUrl || user?.user?.customerProfile?.baseUrl;
      const imgStr = user?.user?.vendorProfile?.profileImage || user?.user?.customerProfile?.profileImage;

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
  const profileImageUri = getProfileImage() || placeholderImage;

  return (
    <>
      {isDrawerVisible && (
        <>
          <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, { opacity: overlayAnim }]}>
            <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={closeDrawer} />
          </Animated.View>

          <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }], bottom: insets.bottom }]}>
            <View style={{ paddingVertical: 26, backgroundColor: '#70F4C3', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }} onPress={() => handleNavigation('Profile')}>
                <CroppedImage
                  // source={{ uri: profileImageUri }}
                  source={{ uri: `${profileData?.vendorProfile?.baseUrl || profileData?.customerProfile?.baseUrl}${profileData?.vendorProfile?.profileImage || profileData?.customerProfile?.profileImage}` || placeholderImage }}
                  cutSize={20}
                  height={75}
                  width={75}
                />

                <View style={{ flexDirection: 'column', gap: 10 }}>
                  <Typo label={profileData?.name} variant='headingSmallPrimary' color='#030204' />
                  <View style={{ flexDirection: 'column', gap: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <MailIcon />
                      <Typo label={profileData?.email} ellipsizeMode='tail' numberOfLines={1} style={{ width: width * 0.3 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <HeaderPhoneIcon color='#030204' />
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {/* <Typo label={`+${user?.user?.countryId}`} /> */}
                        <Typo label={profileData?.mobileNumber} />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ paddingTop: 6 }}>
                  <RightArrow />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#47D7A1', flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 }}>
              <Typo label={user?.user.userType === 2 ? 'Vendor ID:' : 'Customer ID:'} variant='bodyMediumTertiary' color='#030204' style={{ opacity: 0.7 }} />
              <Typo label={profileData?.userCode || '-'} />
            </View>

            <ScrollView style={{ flex: 1, paddingVertical: 20 }} contentContainerStyle={{ paddingBottom: height * 0.05 }} showsVerticalScrollIndicator={false}>
              {drawerItems?.map((item: any, index: number) => (
                <DrawerItem
                  key={index}
                  icon={item?.icon}
                  label={item?.name}
                  onPress={() => handleNavigation(item?.screenName)}
                />
              ))}
            </ScrollView>
            <View style={{ position: 'absolute', zIndex: 999, bottom: 0, right: 0 }}>
              <MenuBottomBg />
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 100,
    elevation: 5,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
});

export default CustomDrawer;
