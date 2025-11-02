import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Typo } from '../../../../../components/common';
import { Images } from '../../../../../assets/images';

type Benefit = {
  id: string;
  title: string;
  image: any;
  icon: string;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.36; // ~55% of screen width

const benefits: Benefit[] = [
  {
    id: '1',
    title: 'Higher solar efficiency',
    image: { uri: Images.amcbenefit1 },
    icon: 'zap',
  },
  {
    id: '2',
    title: 'Longer system lifespan',
    image: { uri: Images.amcbenefit2 },
    icon: 'clock',
  },
  {
    id: '3',
    title: 'Less downtime',
    image: { uri: Images.amcbenefit3 },
    icon: 'refresh-ccw',
  },
  {
    id: '4',
    title: 'Cost savings on repairs',
  image: { uri: Images.amcbenefit4 },
    icon: 'refresh-ccw',
  },
  {
    id: '5',
    title: 'Peace of mind with pro support',
   image: { uri: Images.amcbenefit5 },
    icon: 'refresh-ccw',
  },
];

const BenefitSections: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typo variant="h2" color="#030204" style={styles.heading}>
        Benefits of AMC
      </Typo>

      {/* Horizontal card list */}
      <FlatList
        data={benefits}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />

            <View style={styles.iconWrapper}>
              <Icon name={item.icon} size={22} color="#16a34a" />
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default BenefitSections;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 22,
    backgroundColor: '#ffff',
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  iconWrapper: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Regular',
    fontWeight: '600',
    color: '#fff',
    paddingBottom: 10,
  },
});
