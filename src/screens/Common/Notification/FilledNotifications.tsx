import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserIcon, SiteVisit, InstallationIcon } from './icons';
import { TypoComp } from "../../../components/common"
import { useNavigation } from '@react-navigation/native';

interface Notification {
  id: string;
  type: 'newUser' | 'visit' | 'delivery' | 'installation';
  message: string;
  time: string;
}

interface FilledNotificationsProps {
  notifications: Notification[];
}

const FilledNotifications: React.FC<FilledNotificationsProps> = ({ notifications }) => {
  const navigation = useNavigation();
  const renderIcon = (type: Notification['type']) => {
    switch (type) {
      case 'newUser':
        return <UserIcon />;
      case 'visit':
        return <SiteVisit />;
      case 'installation':
        return <InstallationIcon />;
      default:
        return null;
    }
  };

  const todayNotifications = notifications.slice(0, 2);
  const yesterdayNotifications = notifications.slice(2);

  const renderCard = (notif: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('NewLeadNotify')} key={notif.id} style={styles.notificationCard}>
      <View style={{ height: 8, width: 8, backgroundColor: '#70F4C3', borderRadius: 40, right: 8, position: 'absolute', top: 8 }}></View>
      <View style={{ backgroundColor: '#CAF7E6', padding: 12, borderRadius: 40 }}>
        {renderIcon(notif.type)}
      </View>
      <View style={{ flex: 1 }}>
        <TypoComp label={notif.message} color='#030204' variant='bodyLargeSecondary' />
        <TypoComp label={notif.time} color='#67606E' variant='bodyMediumTertiary' />
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <TypoComp label='Today' color='#67606E' variant='bodyMediumSecondary' />

        {renderCard(todayNotifications?.[0])}
        {/* {todayNotifications.map((notif) => (
          <View key={notif.id} style={styles.notificationCard}>
            <View style={{ backgroundColor: '#CAF7E6', padding: 12, borderRadius: 40 }}>
              {renderIcon(notif.type)}
            </View>
            <View style={{ flex: 1 }}>
              <TypoComp label={notif.message} color='#030204' variant='bodyLargeSecondary' />
              <TypoComp label={notif.time} color='#67606E' variant='bodyMediumTertiary' />
            </View>
          </View>
        ))} */}
        <TypoComp label='Yesterday' color='#67606E' variant='bodyMediumSecondary' />
        {yesterdayNotifications.map((notif) => (
          <View key={notif.id} style={styles.notificationCard}>
            {renderIcon(notif.type)}
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText}>{notif.message}</Text>
              <Text style={styles.notificationTime}>{notif.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 12,
    elevation: 2,
    marginVertical: 16,
  },

  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
  },
});

export default FilledNotifications;