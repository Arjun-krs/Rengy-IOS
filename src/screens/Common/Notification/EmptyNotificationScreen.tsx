import React from 'react';
import { View } from 'react-native';
import { NoNotification } from './icons';
import { TypoComp } from "../../../components/common"

const EmptyNotificationScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <NoNotification />
      <TypoComp label='No notifications available' color='#030204' variant='bodyLargeSecondary' />
    </View>
  );
};

export default EmptyNotificationScreen;