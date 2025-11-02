import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SubHeader from '../../../navigation/SubHeader';
const InviteFriendScreen = () => {
  const referralLink = 'rengy.com/spQx/ae7587';

  // --- Share Functionality ---
  const onShare = async () => {
    try {
      await Share.share({
        message: `Hey! If you're looking for a great solution, check out Rengy. Use my link to get a special reward! 🎁 \n\n${referralLink}`,
        title: 'Join me on Rengy!',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SubHeader title="Invite friend" type="drawer" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* --- Top Gradient Section --- */}
        <LinearGradient
          colors={['#E5F8E6', '#ffffff']}
          style={styles.gradientSection}>
          <Text style={styles.mainTitle}>Got a friend?</Text>
          <Text style={styles.subTitle}>
            If you like using Rengy and know someone who also wants to be a part
            of the solution - start inviting!
          </Text>
          {/* Replace with your local or remote image */}
          <Image
            source={require('../../../assets/images/png/invitefriend.png')}
            style={styles.heroImage}
            // resizeMode="contain"
          />
        </LinearGradient>
        
        {/* --- Info Text --- */}
        <Text style={styles.infoText}>
          Send referral link to your friends via SMS / Email / Whatsapp
        </Text>

        {/* --- "How it works" Card --- */}
        <View style={styles.howItWorksCard}>
          <Text style={styles.cardTitle}>How it works</Text>
          <View style={styles.stepsContainer}>
            {/* Step 1 */}
            <View style={styles.step}>
              <View style={styles.stepCircle}>
                <View style={styles.stepCircleInner} />
              </View>
              <Text style={styles.stepText}>Send an invite to friends</Text>
            </View>

            <View style={styles.dashedLine} />

            {/* Step 2 */}
            <View style={styles.step}>
              <View style={styles.stepCircle}>
                <View style={styles.stepCircleInner} />
              </View>
              <Text style={styles.stepText}>They will Receive Reward</Text>
            </View>

            <View style={styles.dashedLine} />

            {/* Step 3 */}
            <View style={styles.step}>
              <View style={styles.stepCircle}>
                <View style={styles.stepCircleInner} />
              </View>
              <Text style={styles.stepText}>You will Get ₹300 bonus</Text>
            </View>
          </View>
        </View>

        {/* --- Share Link Section --- */}
        <View style={styles.shareSection}>
          <Text style={styles.shareTitle}>Share your unique link</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>{referralLink}</Text>
            <TouchableOpacity onPress={onShare}>
              <Icon name="share-variant-outline" size={24} color="#148057" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },

  gradientSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  mainTitle: {
    fontSize: 24,
     fontFamily: 'GeneralSans-Medium',
    color: '#212121',
    marginBottom: 10,
    paddingTop:15
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'GeneralSans-Medium',
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  heroImage: {
    width: 250,
    height: 280,
  },
  infoText: {
    fontSize: 14,
     fontFamily: 'GeneralSans-Medium',
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal:80
  },
  howItWorksCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
     fontFamily: 'GeneralSans-Medium',
    
    color: '#333',
    marginBottom: 25,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  step: {
    alignItems: 'center',
    flex: 0.33,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#70F4C3',
  },
  stepText: {
    fontSize: 12,
     fontFamily: 'GeneralSans-Medium',
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
  dashedLine: {
    flex: 0.3,
    height: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderStyle: 'dashed',
    marginHorizontal: 5,
    marginTop: 11, // Align with the center of the circle
  },
  shareSection: {
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 15,
     fontFamily: 'GeneralSans-Medium',
    color: '#777',
    marginBottom: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    justifyContent: 'space-between',
  },
  linkText: {
    fontSize: 16,
     fontFamily: 'GeneralSans-Medium',
    color: '#333',
    fontWeight: '500',
  },
});

export default InviteFriendScreen;