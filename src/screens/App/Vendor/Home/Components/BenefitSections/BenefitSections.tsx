// BenefitSections.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BenefitCard from '../../../../../../components/Cards/BenefitCard';
import IconImg from '../../../../../../assets/images/png/benefitinside1.png';
const BenefitSections = () => {
  const data = [
    {
      id: '1',
      image: require('../../../../../../assets/images/png/VendorB2.png'),
      tag: 'AR and 3D Visualization',
      title: 'For easy site survey',
      description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries',
      icon: IconImg,
    },
    {
      id: '2',
      image: require('../../../../../../assets/images/png/VendorB2.png'),
      tag: 'Quality-Driven',
      title: 'Solar equipment sourcing',
      description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries',
      icon: IconImg,
    },
    {
      id: '3',
      image: require('../../../../../../assets/images/png/VendorB2.png'),
      tag: 'Quick',
      title: 'Faster loan Processing',
      description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries',
      icon: IconImg,
    },
    {
      id: '4',
      image: require('../../../../../../assets/images/png/VendorB2.png'),
      tag: 'Hassle Free',
      title: 'Net metering',
      description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries',
      icon: IconImg,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Benefits at Rengy</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <BenefitCard
            key={item.id}
            icon={item.icon}
            image={item.image}
            tag={item.tag}
            title={item.title}
            description={item.description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    marginLeft: 16 /*  */,
    marginBottom: 16,
  },
});

export default BenefitSections;
