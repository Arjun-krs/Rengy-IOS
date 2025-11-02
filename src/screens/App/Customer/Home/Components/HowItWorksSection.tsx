import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,Linking,
  Alert
} from 'react-native'; // Change ScrollView to FlatList
import { Images } from '../../../../../assets/images';
import { Icons } from '../../../../../assets/icons';
import StepCard from '../../../../../components/Cards/StepCard'; // Adjust path as necessary
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../../../components';

// Re-import or re-define the constants used in StepCard for consistency
const CONTAINER_HORIZONTAL_PADDING = 10;
const CARD_SPACING = 15;
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7; // Set card width to 70% of screen width
const { width: screenBtnWidth } = Dimensions.get('window');
const BUTTON_MARGIN = 10; // space between buttons
const buttonWidth = (screenBtnWidth - 2 * 20 - BUTTON_MARGIN) / 2;
interface HowItWorksSectionProps {
  onRaiseRequest: () => void; // 👈 new prop
  userdata: any;
}
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onRaiseRequest,
  userdata,
}) => {
  const navigation = useNavigation();
  const stepsData = [
    {
      id: '1', // Add unique IDs for FlatList keyExtractor
      step: 'Step 1',
      title: 'Share your details',
      description:
        'Tell us about your home and energy needs — it only takes a minute.',
      image: { uri: Images.homestep1 },
    },
    {
      id: '2',
      step: 'Step 2',
      title: 'Site survey',
      description:
        'Our expert vendor visits your site to assess the best solar setup for you.',
      image: { uri: Images.homestep2 },
    },
    {
      id: '3',
      step: 'Step 3',
      title: 'Loan assistance  ',
      description:
        'We help you secure hassle-free financing to make going solar affordable.',
      image: { uri: Images.homestep3 },
    },
    {
      id: '4', // Add unique IDs for FlatList keyExtractor
      step: 'Step 4',
      title: 'Smooth installation',
      description:
        'Sit back while we install your system — and start saving from Day 1!',
      image: { uri: Images.homestep4 },
    },
  ];

  const phoneNumber = '+919876543210';

  const handleCall = () => {
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Calling is not supported on this device.');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
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
        <View>
          <Text
            style={{
              fontFamily: 'GeneralSans-Regular',
              fontSize: 28,
              lineHeight: 36,
              fontWeight: 400,
              color: '#030204',
            }}
          >
            Let the sun pay your power bills
            <Text style={{ fontWeight: 600, fontFamily: 'GeneralSans-Medium' }}>
              {' '}
              just 4 simple steps!
            </Text>
          </Text>
        </View>
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
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 10,
          marginTop: 20,
        }}
      >
        {userdata?.id && (
          <Button
            type="secondary"
            title="Upgrade Your Solar"
            leftIcon={
              <Image
                source={{ uri: Icons.resicon }}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            }
            onPress={onRaiseRequest}
          />
        )}

        {!userdata?.id && (
          <Button
            type="secondary"
            title="Call us now"
            leftIcon={
              <Image
                source={{ uri: Icons.callCtaIcon }}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            }
            onPress={handleCall}
          />
        )}

        <Button
          type="primary"
          title="Get Installation"
          leftIcon={
            <Image
              source={{ uri: Icons.downloadIcon }}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          }
          onPress={() => {
            navigation.navigate('BottomTab', { screen: 'Get Installation' });
          }}
        />
      </View>
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
