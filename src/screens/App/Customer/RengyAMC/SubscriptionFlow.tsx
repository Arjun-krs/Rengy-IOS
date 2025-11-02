import React, { useState,useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../../../components/form/CustomTextInput';
import { Icons } from '../../../../assets/icons';
import { useCurrentLocation } from '../../../../hooks/useCurrentLocation';
import { useRazorpay } from '../../../../hooks/useRazorpay/useRazorpay';
import CustomBottomSheet, {
  BottomSheetMethods,
} from '../../../../components/common/BottomSheet/BottomSheet';
import { Button } from '../../../../components/common/index';
import { useNavigation } from '@react-navigation/native';
interface PopularCity {
  name: string;
  icon: { uri: string };
}

interface SubscriptionFlowProps {
  onLocationSelect?: (location: string) => void;
  onClose: () => void;
  route: any;
}

const POPULAR_CITIES: PopularCity[] = [
  { name: 'Bengaluru', icon: { uri: Icons.Banglore } },
  { name: 'Hyderabad', icon: { uri: Icons.Hydrabad } },
  { name: 'Mumbai', icon: { uri: Icons.Mumbai } },
  { name: 'New Delhi', icon: { uri: Icons.Delhi } },
  { name: 'Chennai', icon: { uri: Icons.Chennai } },
  { name: 'Kolkata', icon: { uri: Icons.Kolkata } },
  { name: 'Pune', icon: { uri: Icons.Pune } },
];

const OTHER_CITIES: string[] = [
  // Andhra Pradesh
  'Vijayawada',
  'Visakhapatnam',
  'Guntur',
  'Tirupati',
  'Nellore',
  'Kurnool',
  'Rajahmundry',
  'Kakinada',
  'Eluru',
  'Kadapa',
  'Anantapur',
  'Chittoor',
  'Ongole',
  'Tenali',
  'Vizianagaram',
  'Nandyal',
  'Machilipatnam',
  'Srikakulam',
  'Proddatur',
  'Adoni',
  'Gudivada',
  'Amalapuram',

  // Telangana
  'Hyderabad',
  'Warangal',
  'Nizamabad',
  'Karimnagar',
  'Khammam',
  'Mahbubnagar',
  'Suryapet',
  'Adilabad',
  'Ramagundam',
  'Nalgonda',
  'Kamareddy',
  'Mancherial',
  'Bhongir',
  'Medak',
  'Siddipet',
  'Jagtial',

  // Karnataka
  'Bengaluru',
  'Mysore',
  'Mangalore',
  'Hubli',
  'Dharwad',
  'Belgaum',
  'Kalaburagi',
  'Davangere',
  'Ballari',
  'Shimoga',
  'Tumkur',
  'Bijapur',
  'Raichur',
  'Bellary',
  'Udupi',
  'Hassan',
  'Chitradurga',
  'Bidar',
  'Karwar',
  'Mandya',
  'Chikkamagaluru',
  'Kolar',
  'Ramanagara',
  'Gulbarga',

  // Tamil Nadu
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Erode',
  'Tirunelveli',
  'Vellore',
  'Thoothukudi',
  'Nagercoil',
  'Tiruppur',
  'Dindigul',
  'Karur',
  'Krishnagiri',
  'Cuddalore',
  'Villupuram',
  'Nagapattinam',
  'Namakkal',
  'Kanchipuram',
  'Ramanathapuram',
  'Sivakasi',
  'Tiruvannamalai',
  'Kumbakonam',
  'Pudukkottai',
  'Chengalpattu',
  'Arakkonam',
  'Thanjavur',

  // Kerala
  'Thiruvananthapuram',
  'Kochi',
  'Kozhikode',
  'Thrissur',
  'Kollam',
  'Alappuzha',
  'Palakkad',
  'Kannur',
  'Kottayam',
  'Malappuram',
  'Kasaragod',
  'Pathanamthitta',
  'Wayanad',
  'Idukki',
  'Ernakulam',
  'Mattancherry',
  'Vatakara',
  'Chalakudy',
  'Punalur',
  'Perinthalmanna',
  'Neyyattinkara',
  'Angamaly',
  'Thripunithura',
  'Paravur',

  // Puducherry (Union Territory)
  'Puducherry',
  'Karaikal',
  'Mahe',
  'Yanam',

  // Additional important cities/towns in South India
  'Hosur',
  'Bidadi',
  'Hosapete',
  'Bellary',
  'Tadepalligudem',
  'Adoni',
  'Kavali',
  'Tenali',
  'Puttur',
  'Rajampet',
  'Srikalahasti',
  'Palani',
  'Shivamogga',
  'Chengannur',
  'Pattukkottai',
  'Perambalur',
  'Tirupattur',
  'Ambur',
  'Vaniyambadi',
  'Sivaganga',
  'Virudhunagar',
  'Tindivanam',
  'Ooty',
  'Kodaikanal',
  'Mettupalayam',
  'Neyveli',
  'Coonoor',
  'Palayamkottai',
  'Nilambur',
  'Wayanad',
  'Iritty',
  'Peringathur',
];

const SubscriptionFlow: React.FC<SubscriptionFlowProps> = ({
  onLocationSelect,
  onClose,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [errors, setErrors] = useState<{
    houseNumber?: string;
    streetAddress?: string;
  }>({});
  const [loadingLocation, setLoadingLocation] = useState(false);

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const { getLocation } = useCurrentLocation();
  const { plan, userId } = route.params;
  const { openRazorpay } = useRazorpay();
  const navigation = useNavigation();

  const filteredCities = useMemo(() => {
    const uniqueCities = Array.from(new Set(OTHER_CITIES));
    return uniqueCities.filter(city =>
      city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

    useEffect(() => {
      if (!userId || userId === null) {
        navigation.navigate('Login' as never);
      }
    }, [userId]);

  // Handle city click → open bottom sheet
  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    onLocationSelect?.(city);

    bottomSheetRef.current?.open();
    setStreetAddress(city);
    setHouseNumber('');
    setLandmark('');
    setErrors({});
  };

  // Open bottom sheet with optional prefill (use location)
  const handleAddressPress = (useCurrent: boolean = false) => {
    setErrors({});
    if (useCurrent) {
      setLoadingLocation(true);
      getLocation()
        .then(loc => {
          setHouseNumber(loc?.houseNumber || '');
          setStreetAddress(loc?.address || '');
          setLandmark(loc?.landmark || '');
        })
        .catch(err => console.log('Location error:', err))
        .finally(() => {
          setLoadingLocation(false);
          bottomSheetRef.current?.open();
        });
    } else {
      setHouseNumber('');
      setStreetAddress('');
      setLandmark('');
      bottomSheetRef.current?.open();
    }
  };

  const handlePayment = async () => {
    const newErrors: { houseNumber?: string; streetAddress?: string } = {};
    if (!houseNumber.trim())
      newErrors.houseNumber = 'Please enter House/Flat number';
    if (!streetAddress.trim())
      newErrors.streetAddress = 'Please enter Street/Building name';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const fullAddress = `${houseNumber}, ${streetAddress}${
      landmark ? `, ${landmark}` : ''
    }`;
    bottomSheetRef.current?.close();

    const parsedPrice = parseFloat(plan.price.toString());
    const amountInPaise = Math.round(parsedPrice * 100);

    try {
      const response = await openRazorpay({
        amount: amountInPaise,
        description: `Subscription for ${plan.name}`,
      });

      console.log('Payment Success Response:', response); // ✅ Here is the response
      const paymentId = response.razorpay_payment_id;
      const subscriptionData = {
        userId,
        subscriptionId: plan.id,
        address: fullAddress,
        transactionId: paymentId,
        paidAmount: parsedPrice,
      };
      console.log('Subscription Data to be sent to backend:', subscriptionData);
      navigation.navigate('RengyAMC', {
        subscriptionData, 
      });

      onClose(); // close flow
    } catch (err) {
      console.log('Payment failed', err); // err contains reason for failure
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.handleBar} />
        <Text style={styles.headerTitle}>Select location</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Image
            source={{ uri: Icons.SearchIcon }}
            style={styles.pointerIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for your city"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAddressPress(true)}
          >
            <Image
              source={{ uri: Icons.locationPointer }}
              style={styles.pointerIcon}
            />
            <Text style={styles.actionButtonText}>Use Current Location</Text>
            {loadingLocation && (
              <ActivityIndicator
                size="small"
                color="#008037"
                style={{ marginLeft: 8 }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAddressPress(false)}
          >
            <Image
              source={{ uri: Icons.AddPointer }}
              style={styles.pointerIcon}
            />
            <Text style={styles.actionButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Cities List */}
        <FlatList
          data={filteredCities}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Text style={styles.sectionHeader}>Popular Cities</Text>
              <FlatList
                data={POPULAR_CITIES}
                keyExtractor={item => item.name}
                numColumns={4}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.popularCityCard}
                    onPress={() => handleCityClick(item.name)}
                  >
                    <View style={styles.popularCityIconContainer}>
                      <Image
                        source={item.icon}
                        style={styles.popularCityIcon}
                      />
                    </View>
                    <Text style={styles.popularCityName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.sectionHeader}>Other Cities</Text>
            </>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.otherCityItem,
                selectedCity === item && styles.otherCityItemSelected,
              ]}
              onPress={() => handleCityClick(item)}
            >
              <Text style={styles.otherCityText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bottom Sheet */}
      <CustomBottomSheet ref={bottomSheetRef}>
        <View style={{ padding: 16, gap: 12, paddingBottom: 50 }}>
          <Text style={styles.headerTitle}>Enter your address</Text>

          <CustomTextInput
            label="House / Flat number"
            placeholder="Enter House / Flat no."
            value={houseNumber}
            onChangeText={setHouseNumber}
            error={errors.houseNumber}
          />
          <CustomTextInput
            label="Flat/House no/Building name"
            placeholder="Enter your Flat/House no/Building name"
            value={streetAddress}
            onChangeText={setStreetAddress}
            error={errors.streetAddress}
          />
          <CustomTextInput
            label="Nearby landmark (Optional)"
            placeholder="Nearby landmark"
            value={landmark}
            onChangeText={setLandmark}
          />

          <Button
            title="Save Address & Pay"
            type="primary"
            onPress={handlePayment}
          />
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'GeneralSans-Medium',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E2E3',
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#000',
  },
  pointerIcon: { width: 20, height: 20, resizeMode: 'contain', marginRight: 8 },
  actionRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 20,
  },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#008037',
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    color: '#030204',
    marginTop: 24,
    marginBottom: 12,
  },
  popularCityCard: { flex: 1 / 4, alignItems: 'center', marginBottom: 16 },
  popularCityIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularCityIcon: { width: 60, height: 60, resizeMode: 'contain' },
  popularCityName: {
    fontSize: 13,
    fontFamily: 'GeneralSans-Medium',
    color: '#555',
    textAlign: 'center',
  },
  otherCityItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  otherCityItemSelected: { backgroundColor: '#E8F5E9' },
  otherCityText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#1C1C1E',
  },
});

export default SubscriptionFlow;
