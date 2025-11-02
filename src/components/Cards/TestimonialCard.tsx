import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  avatarSource: any; // Use 'any' for local images, or specify ImageSourcePropType
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  testimonial,
  avatarSource,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.quoteMark}>“</Text>
      <Text style={styles.testimonialText}>{testimonial}</Text>
      <View style={styles.customerInfo}>
        <Image source={avatarSource} style={styles.avatar} />
        <View>
          <Text style={styles.customerName}>{name}</Text>
          <Text style={styles.customerLocation}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: 300, // Fixed width for the card, adjust as needed for your layout
    marginHorizontal: 8, // Spacing between cards if used in a FlatList/ScrollView
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  quoteMark: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#CAF7E6', // A light green color for the quote mark
    lineHeight:56
  },
  testimonialText: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    lineHeight: 24,
    color: '#333333',
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // Makes the image circular
    marginRight: 12,
  },
  customerName: {
    fontSize: 16,
    fontFamily:'GeneralSans-Medium',
    fontWeight: '600',
    color: '#333333',
  },
  customerLocation: {
    fontSize: 14,
    fontFamily:'GeneralSans-Regular',
    color: '#666666',
  },
});

export default TestimonialCard;
