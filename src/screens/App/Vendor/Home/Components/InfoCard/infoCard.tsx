// src/components/InfoCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Benefit {
  id: number;
  icon: string;
  text: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: 'flash-outline',
    text: 'Lower electricity Bills',
    image: require('../../../../../../assets/images/png/b1.png'),
  },
  {
    id: 2,
    icon: 'business-outline',
    text: 'Government subsidies Assistance',
    image: require('../../../../../../assets/images/png/b1.png'),
  },
  {
    id: 3,
    icon: 'trending-up-outline',
    text: 'Increase property Value',
    image: require('../../../../../../assets/images/png/b1.png'),
  },
  {
    id: 4,
    icon: 'construct-outline',
    text: 'Hassle-Free installation',
    image: require('../../../../../../assets/images/png/b1.png'),
  },
];

const InfoCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Benefits Grid */}
      <View style={styles.grid}>
        {benefits.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={{ width: 45, height: 45 }} />
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  callNow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callText: {
    fontSize: 15,
    fontFamily: 'GeneralSans-Medium',
    color: '#26805E',
    marginLeft: 4,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    paddingVertical: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#111',
    fontFamily: 'GeneralSans-Regular',
    fontWeight: '500',
    marginTop: 8,
  },
});
