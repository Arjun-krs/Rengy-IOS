import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SubHeader from '../../../navigation/SubHeader';
/**
 * A reusable component for a single setting row with a label and a toggle switch.
 * This helps keep the main component cleaner.
 * @param {string} label - The main text label for the setting.
 * @param {string} [subLabel] - Optional smaller text displayed below the main label.
 * @param {boolean} isEnabled - The current state (on/off) of the switch.
 * @param {(value: boolean) => void} onToggle - Function to call when the switch is toggled.
 */
const SettingToggleRow = ({
  label,
  subLabel,
  isEnabled,
  onToggle,
}: {
  label: string;
  subLabel?: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}) => (
  <View style={styles.settingRow}>
    <View>
      <Text style={styles.settingLabel}>{label}</Text>
      {subLabel && <Text style={styles.settingSubLabel}>{subLabel}</Text>}
    </View>
    <Switch
      trackColor={{ false: '#E9E9EB', true: '#34C759' }}
      thumbColor={'#ffffff'}
      onValueChange={onToggle}
      value={isEnabled}
    />
  </View>
);

/**
 * The main Account Settings screen component.
 */
const AccountSettingsScreen = () => {
  // State for all the settings on the screen
  const [language, setLanguage] = useState('English');
  const [notificationTone, setNotificationTone] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [vibration, setVibration] = useState(false);
  const [popUpNotification, setPopUpNotification] = useState(false);
  const [enableGps, setEnableGps] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
        <SubHeader title="Account settings" type="drawer" />
      <View style={styles.container}>
        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Language</Text>
          <TouchableOpacity style={styles.pickerContainer}>
            <Text style={styles.pickerText}>{language}</Text>
            {/* This is a simple downward-facing triangle to mimic a dropdown arrow */}
            <Text style={styles.pickerArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications settings</Text>
          <SettingToggleRow
            label="Notification tone"
            subLabel="Light"
            isEnabled={notificationTone}
            onToggle={setNotificationTone}
          />
          <SettingToggleRow
            label="Enable notifications"
            isEnabled={enableNotifications}
            onToggle={setEnableNotifications}
          />
          <SettingToggleRow
            label="Vibration"
            isEnabled={vibration}
            onToggle={setVibration}
          />
          <SettingToggleRow
            label="Pop up notification"
            isEnabled={popUpNotification}
            onToggle={setPopUpNotification}
          />
        </View>

        {/* GPS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GPS settings</Text>
          <SettingToggleRow
            label="Enable GPS"
            isEnabled={enableGps}
            onToggle={setEnableGps}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// StyleSheet for all the components
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    color: '#000000',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#3C3C4399', // A muted gray color
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  pickerText: {
    fontSize: 17,
    fontFamily: 'GeneralSans-Medium',
    color: '#000000',
  },
  pickerArrow: {
    fontSize: 10,
    fontFamily: 'GeneralSans-Medium',
    color: '#3C3C43',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#000000',
  },
  settingSubLabel: {
    fontSize: 15,
    fontFamily: 'GeneralSans-Medium',
    color: '#8A8A8E',
    marginTop: 2,
  },
});

export default AccountSettingsScreen;
