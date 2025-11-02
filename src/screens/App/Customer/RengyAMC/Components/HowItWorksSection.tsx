import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'; // Change ScrollView to FlatList
import StepCard from '../../../../../components/Cards/StepCard'; // Adjust path as necessary
import { Typo } from '../../../../../components/common';
import Button from '../../../../../components/common/Button';
import { Images } from '../../../../../assets/images';
const CONTAINER_HORIZONTAL_PADDING = 10;
const CARD_SPACING = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7; // Set card width to 70% of screen width
interface HowItWorksSectionProps {
  onRaiseRequest: () => void; // 👈 new prop
}
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRaiseRequest,
}) => {
  const stepsData = [
    {
      id: '1',
      title: 'Inspection & Maintenance',
      description:
        'Thorough inspection and maintenance of all system components.',
      image: { uri: Images.amcstep1 },
    },
    {
      id: '2',
      title: 'Performance Monitoring',
      description:
        'Continuous monitoring of system performance to ensure optimal output.',
      image: { uri: Images.amcstep2 },
    },
    {
      id: '3',
      title: 'Repair & Replacement',
      description:
        'Repair or replacement of faulty components, including inverters and batteries.',
      image: { uri: Images.amcstep3 },
    },
    {
      id: '4',
      title: 'Emergency Support',
      description: '24/7 emergency support to address urgent issues.',
      image: { uri: Images.amcstep4 },
    },
  ];

  // FlatList needs a renderItem function
  const renderStepCard = ({ item }: { item: (typeof stepsData)[0] }) => (
    <StepCard
      step={item.step}
      title={item.title}
      description={item.description}
      imageSource={item.image}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30, paddingHorizontal: 10, paddingEnd: 50 }}>
        <Typo variant="h2" color="#030204">
          What's included in AMC
        </Typo>
      </View>

      <FlatList
        data={stepsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderStepCard}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={cardWidth + CARD_SPACING} // Adjust snap interval
        decelerationRate="fast"
        pagingEnabled
      />
      <Button
        type="primary"
        title="Raise a Request"
        onPress={onRaiseRequest} // 👈 open bottom sheet from parent
        style={{ marginVertical: 20, marginHorizontal: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    // Changed to vertical padding only for better alignment
    // marginVertical: 30,
  },
  flatListContent: {
    // Renamed from scrollViewContent for clarity
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    paddingVertical: 10,
  },
});

export default HowItWorksSection;
