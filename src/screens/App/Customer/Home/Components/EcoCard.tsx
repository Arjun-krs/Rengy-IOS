import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Icons } from '../../../../../assets/icons';
import { Images } from '../../../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../../../components';

const EcoCard = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.textContainer}>
            <Text style={styles.subHeading}>One switch, Big impact</Text>
            <Text style={styles.smallText}>Good for you &</Text>
            <Text style={styles.mainHeading}>Great for the Planet</Text>
            <Text style={styles.description}>
              One home can save up to 5 tons of CO₂ every year — equal to
              planting 120 trees!
            </Text>

            <Button
              type="primary"
              title="Get Installation"
              leftIcon={
                <Image
                  source={{ uri: Icons.downloadIcon }}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              }
              onPress={() => {
                navigation.navigate('BottomTab', {
                  screen: 'Get Installation',
                });
              }}
              style={{ marginVertical: 10 }}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: Images.HomeOneBigImg }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <View>
        <Image
          source={{ uri: Images.cardBottom }}
          style={styles.bgimage}
          resizeMode="cover"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F3FFFB', // A light green/blue color to match the design
    paddingBottom: 10,
    paddingLeft: 24,
    paddingRight: 0,
    paddingTop: 40,
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  subHeading: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    fontWeight: '500',
    marginBottom: 30,
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Regular',
    color: '#030204',
    fontWeight: '300',
    marginBottom: 4,
  },
  mainHeading: {
    fontSize: 32,
    fontFamily: 'GeneralSans-Medium',
    color: '#030204',
    lineHeight: 36,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B', // A deep navy blue for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    width: '40%', // Adjust width as needed for layout
    height:'60%',
    aspectRatio: 1, // To make the image container squar2
    overflow: 'visible',
    marginLeft: 16,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  image: {
    width: '70%',
    height: '100%',
    
  },
  bgimage: {
    width: '100%',
    height: 50,
  },
});

export default EcoCard;
