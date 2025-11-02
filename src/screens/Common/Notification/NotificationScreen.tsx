import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyNotificationScreen from './EmptyNotificationScreen';
import FilledNotifications from './FilledNotifications';
import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp';

interface NotificationProps {
  notifications?: any[];
}

const dummyNotifications = [
  {
    id: '1',
    type: 'newUser',
    message: 'New lead from Rengy',
    time: '10:30 AM',
  },
  {
    id: '2',
    type: 'visit',
    message: 'Your technician will visit you at 2:00 PM today.',
    time: '9:00 AM',
  },
]

const NotificationScreen: React.FC<NotificationProps> = ({ notifications = dummyNotifications }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp isBack onBackPress={() => navigation.goBack()} isPrimary={false} isPrimaryHeader={false} isSecondaryHeader={true} screenName={`Notifications (${notifications.length})`} />
      {notifications?.length === 0 ? (
        <EmptyNotificationScreen />
      ) : (
        <FilledNotifications notifications={notifications} />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;