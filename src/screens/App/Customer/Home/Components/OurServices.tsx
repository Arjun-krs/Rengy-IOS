import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Images } from '../../../../../assets/images';
import { Icons } from '../../../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { Typo } from '../../../../../components';

type InstallationType = {
  id: string;
  title: string;
  description: string;
  image: any;
  btnicon: any;
  buttonTxt: string;
  handleClick: () => void;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.6;

const OurServices: React.FC = () => {
  const navigation = useNavigation();

  // ✅ Define data *after* navigation is available
  const installationTypes: InstallationType[] = [
    {
      id: '1',
      title: 'New Solar Installations',
      description: 'Streamlined solar setup, From design to commissioning',
      image: { uri: Images.SolarMaintenance },
      btnicon: { uri: Icons.downloadIcon },
      buttonTxt: 'Get Installation',
      handleClick: () =>
        navigation.navigate('BottomTab', { screen: 'Get Installation' }),
    },
    {
      id: '2',
      title: 'Existing Solar Maintenance',
      description: 'Reliable maintenance for uninterrupted performance',
      image: { uri: Images.NewSolarInstallation },
      btnicon: { uri: Icons.amcIcon },
      buttonTxt: 'Get Maintenance',
      handleClick: () =>
        navigation.navigate('RengyAMC'),
    },
    {
      id: '3',
      title: 'Solar Upgradation',
      description:
        'Upgrade your solar system with latest technology for maximum performance and efficiency',
      image: { uri: Images.SolarUpgrade },
      btnicon: { uri: Icons.SolarIcon },
      buttonTxt: 'Upgrade your Solar',
      handleClick: () =>
        navigation.navigate('RengyAMC'),
    },
  ];

  return (
    <View style={styles.container}>
      <Typo label="Our Services" />
      {/* <Typo variant="h2" color="#030204" style={styles.heading}>
        Our Services
      </Typo> */}

      <FlatList
        data={installationTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>

              <TouchableOpacity onPress={item.handleClick}>
                <View style={styles.btnContainer}>
                  <Image source={item.btnicon} style={styles.cardIcon} />
                  <Text style={styles.btntxt}>{item.buttonTxt}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OurServices;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 32,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    marginBottom: 20,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    marginTop: 18,
    marginHorizontal: 12,
    paddingHorizontal: 8,
  },
  cardDesc: {
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'GeneralSans-Medium',
    color: '#67606E',
    marginTop: 10,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    backgroundColor: '#131337',
    padding: 8,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    borderRadius: 8,
    marginBottom: 10,
  },
  btntxt: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'GeneralSans-Medium',
    color: '#71F4C3',
  },
  cardIcon: {
    height: 20,
    width: 20,
  },
});
