import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import ChatIcon from '../../../assets/images/png/FaqSupport.png';
import { useNavigation } from '@react-navigation/native';
import SubHeader from '../../../navigation/SubHeader';
const GetSupportScreen = () => {
  const navigation = useNavigation();

  const supportOptions = [
    {
      id: '1',
      label: 'Chat with us',
      icon: require("../../../assets/images/png/chatSupport.png"),
      action: () => navigation.navigate('ChatSupport'),
    },
    {
      id: '2',
      label: 'Contact us',
      icon: require("../../../assets/images/png/callSupport.png"),
      action: () => navigation.navigate('ContactUs'),
    },
    {
      id: '3',
      label: 'Maintenance tips',
      icon: require("../../../assets/images/png/TipsSupport.png"),
       action: () => navigation.navigate('MaintenanceTips'),
    },
    {
      id: '4',
      label: "FAQ's",
      icon: ChatIcon,
      action: () => navigation.navigate('FaqSupport'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubHeader title="Get support" type="default" />
      <View style={styles.container}>
        {/* Support Options Grid */}
        <View style={styles.grid}>
          {supportOptions.map(item => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={item.action}
              >
                <Image source={Icon} style={{ width: 45, height: 45 }} />
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const { width } = Dimensions.get('window');
const cardGutter = 20;
const cardWidth = (width - cardGutter * 3) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    paddingHorizontal: cardGutter,
    paddingTop: 30,
  },
  placeholder: {
    width: 24, // to balance the header
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: cardGutter,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // iOS Shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Android Shadow
    elevation: 3,
  },

  cardLabel: {
    fontSize: 18,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '500',
    color: '#4A4A4A',
  },
});

export default GetSupportScreen;
