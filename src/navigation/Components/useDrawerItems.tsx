import React from 'react';
import {
  AboutUsIcon,
  AMCIcon,
  ChangePassIcon,
  GetSupportIcon,
  HelpIcon,
  InfoIcon,
  LeaderboardIcon,
  PhoneIcon,
  PrivacyIcon,
  ReferFriend,
  SettingsIcon,
  WalletIcon,
} from '../../utils/svgSrc';
import useFetchUserData from '../../hooks/useFetchUser';

const drawerConfig = {
  customer: [
    {
      name: 'AMC',
      icon: <AMCIcon />,
      screenName: 'RengyAMC',
    },

    {
      name: 'Get Support',
      icon: <GetSupportIcon />,
      screenName: 'GetSupport',
    },
    {
      name: 'Change password',
      icon: <ChangePassIcon />,
      screenName: 'changepassword',
    },
    {
      name: 'Wallet',
      icon: <WalletIcon />,
      screenName: 'Wallet',
    },
    {
      name: 'Refer a friend',
      icon: <ReferFriend />,
      screenName: 'InviteFriend',
    },
    {
      name: 'Help',
      icon: <HelpIcon />,
      screenName: 'Help',
    },
    {
      name: 'Account Settings',
      icon: <SettingsIcon />,
      screenName: 'AccountSettings',
    },
    {
      name: 'Contact Us',
      icon: <PhoneIcon />,
      screenName: 'ContactUs',
    },
    {
      name: 'About Us',
      icon: <AboutUsIcon />,
      screenName: 'AboutUs',
    },
    {
      name: 'Terms of Use',
      icon: <InfoIcon />,
      screenName: 'terms',
    },
    {
      name: 'Privacy Policy',
      icon: <PrivacyIcon />,
      screenName: 'PrivacyPolicy',
    },
  ],
  vendor: [
    {
      name: 'Change Password',
      icon: <ChangePassIcon />,
      screenName: 'changepassword',
    },
    {
      name: 'Help',
      icon: <HelpIcon />,
      screenName: 'Help',
    },
    {
      name: 'Account Settings',
      icon: <SettingsIcon />,
      screenName: 'AccountSettings',
    },
    {
      name: 'Wallet',
      icon: <WalletIcon />,
      screenName: 'Wallet',
    },
    {
      name: 'Leaderboard',
      icon: <LeaderboardIcon />,
      screenName: 'Leaderboard',
    },
    {
      name: 'Contact Us',
      icon: <PhoneIcon />,
      screenName: 'ContactUs',
    },
    {
      name: 'About Us',
      icon: <AboutUsIcon />,
      screenName: 'AboutUs',
    },
    {
      name: 'Terms of Use',
      icon: <InfoIcon />,
      screenName: 'terms',
    },
    {
      name: 'Privacy Policy',
      icon: <PrivacyIcon />,
      screenName: 'PrivacyPolicy',
    },
  ],
};

export function useDrawerItems() {
  const { user } = useFetchUserData()
  const drawerItems = user?.user?.userType === 3 ? drawerConfig.customer : drawerConfig.vendor;

  return drawerItems;
}
