import React from 'react';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native'; // Import Dimensions

type StepCardProps = {
  step: string;
  title: string;
  description: string;
  imageSource: any;
};
const screenWidth = Dimensions.get('window').width; // Get screen width
const cardWidth = screenWidth * 0.65; // Set card width to 70% of screen width

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  imageSource,
}) => (
  <View style={styles.card}>
    <View style={styles.contentContainer}>
      {step && (
        <View style={styles.stepContainer}>
          <Text style={styles.step}>{step}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
    <Image
      source={imageSource}
      style={styles.illustration}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  stepContainer: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 6,
  },
  step: {
    color: '#030204',
    fontFamily: 'GeneralSans-Regular',
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    marginBottom: 8,
    color: '#030204',
  },
  desc: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Regular',
    color: '#666',
    lineHeight: 24,
  },
  illustration: {
    width: '100%',
    height: 145,
  },
});

export default StepCard;
