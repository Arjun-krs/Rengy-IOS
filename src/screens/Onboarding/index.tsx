import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  customerWalkthrough,
  vendorWalkthrough,
} from '../../constants/walkthroughData';
import { BackIcon } from '../../utils/svgSrc';
import { Button, Typo } from '../../components';

type AuthStackParamList = {
  UserType: undefined;
  Onboarding: { role: 'customer' | 'vendor' };
  Login: { role: 'customer' | 'vendor' }; // Pass role to Login/Register
  Register: { role: 'customer' | 'vendor' }; // Pass role to Login/Register
  BottomTab: undefined; // Assuming BottomTab doesn't need params
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const { width, height } = Dimensions.get('window'); // Use 'window' for more reliable viewport dimensions

const Onboarding: React.FC<Props> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { role } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const data = role === 'customer' ? customerWalkthrough : vendorWalkthrough;

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.container}>
        {/* TOP HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
            <Typo
              label={'Skip'}
              color="#26805E"
              variant="bodyLargeSecondary"
            />
          </TouchableOpacity>
        </View>
        {/* FLEXIBLE CONTENT AREA */}
        <View style={styles.content}>
          <FlatList
            data={data}
            ref={flatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            onScroll={handleScroll}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.slide,
                  { alignItems: role === 'customer' ? 'center' : 'flex-start' },
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.textContainer,
                    {
                      alignItems: role === 'customer' ? 'center' : 'flex-start',
                    },
                  ]}
                >
                  <Typo
                    label={item?.title}
                    variant="headingLargePrimary"
                    color="#030204"
                    style={{
                      textAlign: role === 'customer' ? 'center' : 'left',
                      fontSize: 24,
                    }}
                  />
                  <Typo
                    label={item?.description}
                    variant="bodyMediumTertiary"
                    color="#67606E"
                    style={{
                      textAlign: role === 'customer' ? 'center' : 'left',
                      fontSize: 14,
                    }}
                  />
                </View>
              </View>
            )}
          />
        </View>
        {/* PAGINATION DOTS */}
        <View
          style={[
            styles.dotsContainer,
            { justifyContent: role === 'customer' ? 'center' : 'flex-start' },
          ]}
        >
          {data?.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        {/* BUTTONS (IN FLOW) */}
        <View style={[styles.buttonWrapper, { paddingBottom: insets.bottom }]}>
          <Button
            type="secondary"
            title="Login"
            onPress={() => navigation.navigate('Login', { role })}
          />
          {role === 'customer' ? (
            <Button
              type="primary"
              title="Register"
              onPress={() => navigation.navigate('Register', { role })}
            />
          ) : (
            <Button
              type="primary"
              title="Register"
              onPress={() => navigation.navigate('VendorRegister', { role })}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1, // Make the main container fill the safe area
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    flex: 1, // This makes the FlatList container take all available vertical space
  },
  slide: {
    width: width,
    gap: 28,
  },
  image: {
    width: width,
    height: height * 0.57, // Reduced height to be safer on small devices
    borderRadius: 18,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 25,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 16, // Add some vertical spacing
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#67606E',
    opacity: 0.1,
  },
  activeDot: {
    backgroundColor: '#26805E',
    width: 24,
    opacity: 1,
  },
  buttonWrapper: {
    // No more position: 'absolute' or flex: 1
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingTop: 12,
    gap: 16,
    borderTopWidth: 1, // Optional: add a separator line
    borderTopColor: '#EEEEEE',
  },
});
