import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icons} from '../../../../../assets/icons';
import FloatingSolar from '../../../../../assets/images/svg/floating-solar.svg';
import RooftopSolar from '../../../../../assets/images/svg/rooftop-solar.svg';
import HalfCircle from '../../../../../assets/images/png/downcircle.png';
import { Images } from '../../../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { Button, Typo } from '../../../../../components';
type InstallationType = {
  id: string;
  title: string;
  description: string;
  image: any;
};
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.6; // Set card width to 70% of screen width

const installationTypes: InstallationType[] = [
  {
    id: '1',
    title: 'Rooftop Solar',
    description: 'Perfect for homes to save on electricity bills.',
    image: { uri: Images.FloatingSolar },
    svgIcon: RooftopSolar,
  },
  {
    id: '2',
    title: 'Ground mounted solar',
    description: 'Panels fixed on ground, saving land.',
    image: { uri: Images.RooftopSolar }, // replace with your asset
    svgIcon: FloatingSolar,
  },
];

const SolarInstallationTypes: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Typo label="Solar installation types" />
      {/* <Typo variant="h2" color="#030204" style={styles.heading}>
        Solar installation types
      </Typo> */}
      {/* Horizontal cards */}
      <FlatList
        data={installationTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.iconWrapper}>
              {/* <Ionicons name="sunny-outline" size={22} color="#16a34a" /> */}
              <item.svgIcon width={40} height={40} />
            </View>
            <Image source={HalfCircle} style={styles.imagewrapper} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        )}
      />

      {/* CTA button */}
      <Button
          type="primary"
          title="Get Installation"
          leftIcon={<Image
              source={{ uri: Icons.downloadIcon }}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />}
          onPress={() => {
            navigation.navigate('BottomTab', { screen: 'Get Installation' });
          }}
          style={{marginTop:20}}
        />
    </View>
  );
};

export default SolarInstallationTypes;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 32,
    backgroundColor: '#F9FAF9',
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
  iconWrapper: {
    marginTop: -25,
    marginLeft: 20,
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#CAF7E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagewrapper: {
    marginTop: -18,
    width: cardWidth,
    height: 80,
    resizeMode: 'contain',
    opacity: 0.3,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 12,
    paddingHorizontal: 8,
  },
  cardDesc: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#6b7280',
    marginTop: 10,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0D1B2A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
