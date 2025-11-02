import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import TestimonialCard from '../../../../../../components/Cards/TestimonialCard'; // Assuming your TestimonialCard is in the same directory

// Get the screen width to calculate card positions
const { width: screenWidth } = Dimensions.get('window');

const cardWidth = 300; // Must match the card width in TestimonialCard component
const cardSpacing = 8; // Must match the marginHorizontal in TestimonialCard

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const testimonials = [
    {
      id: '1',
      name: 'Rajesh',
      location: 'Mumbai, Maharashtra',
      testimonial: 'I am Rajesh from Bangalore and rengy helped me in install the Rooftop Solar',
     avatar: require('../../../../../../assets/images/png/userTest.png'),
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Delhi, Delhi',
      testimonial: 'Rengy made the solar installation process so easy and hassle-free. Highly recommended!',
       avatar: require('../../../../../../assets/images/png/userTest.png'),
    },
    {
      id: '3',
      name: 'Amit Singh',
      location: 'Chennai, Tamil Nadu',
      testimonial: 'Great service and significant savings on electricity bills. Very happy with the results.',
      avatar: require('../../../../../../assets/images/png/userTest.png'),
    },
  ];

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (cardWidth + cardSpacing * 2));
    setActiveIndex(index);
  };

  const scrollToCard = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * (cardWidth + cardSpacing * 2),
        animated: true,
      });
      setActiveIndex(index);
    }
  };

  const handleArrowPress = (direction: 'left' | 'right') => {
    let newIndex = activeIndex;
    if (direction === 'left' && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === 'right' && activeIndex < testimonials.length - 1) {
      newIndex = activeIndex + 1;
    }
    scrollToCard(newIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Our happy customers</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={cardWidth + cardSpacing * 2} // Snap to a card's position
        decelerationRate="fast"
      >
        {testimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            name={item.name}
            location={item.location}
            testimonial={item.testimonial}
            avatarSource={item.avatar}
          />
        ))}
      </ScrollView>

      {/* Pagination and Arrows */}
      <View style={styles.paginationContainer}>
        <Pressable
          onPress={() => handleArrowPress('left')}
          style={({ pressed }) => [styles.arrow, { opacity: pressed || activeIndex === 0 ? 0.5 : 1 }]}
          disabled={activeIndex === 0}
        >
          {/* <Text style={styles.arrowText}>{'<'}</Text> */}
        </Pressable>

        {testimonials.map((_, index) => (
          <Pressable key={index} onPress={() => scrollToCard(index)}>
            <View style={[styles.dot, index === activeIndex && styles.dotActive]} />
          </Pressable>
        ))}

        <Pressable
          onPress={() => handleArrowPress('right')}
          style={({ pressed }) => [styles.arrow, { opacity: pressed || activeIndex === testimonials.length - 1 ? 0.5 : 1 }]}
          disabled={activeIndex === testimonials.length - 1}
        >
          {/* <Text style={styles.arrowText}>{'>'}</Text> */}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal:10,
    backgroundColor:'#F3FFFB'
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    marginLeft: 16,
    marginBottom: 16,
  },
  scrollViewContent: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    // Gives a bit of padding at the start and end of the scroll view
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB', // Light gray for inactive dots
    marginHorizontal: 4,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34D399', // Green for active dot
    marginHorizontal: 4,
  },
});

export default CustomerReviews;