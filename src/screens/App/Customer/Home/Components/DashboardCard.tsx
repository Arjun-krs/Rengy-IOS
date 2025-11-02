import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAMCRequests,
  resetAMCState,
} from '../../../../../api/slice/amcSlice';
import {
  fetchInstallationRequests,
  requestInstallation,
  resetInstallationState,
} from '../../../../../api/slice/installationSlice';
import { RootState } from '../../../../../api/store';
import { Button, Typo } from '../../../../../components';
type RequestProps = {
  onTrack?: () => void;
  userdata: any;
};

const DashboardCard: React.FC<RequestProps> = ({ userdata }) => {
  console.log(userdata, 'userdata');
  const dispatch = useDispatch<any>();
  const userId = userdata?.id;
  console.log(userId, 'userId');
  const navigation = useNavigation();

  const {
    loading: amcLoading,
    error: amcError,
    amcRequests,
    success: amcSuccess,
  } = useSelector((state: RootState) => state.amc);

  const {
    loading: installationLoading,
    error: installationError,
    installations,
    success: installationSuccess,
  } = useSelector((state: RootState) => state.installation);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAMCRequests(userId));
      dispatch(fetchInstallationRequests(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (amcSuccess && userId) {
      dispatch(fetchAMCRequests(userId));
      dispatch(resetAMCState());
    }

    if (installationSuccess && userId) {
      dispatch(fetchInstallationRequests(userId));
      dispatch(resetInstallationState());
    }
  }, [amcSuccess, installationSuccess, userId, dispatch]);
  const installationRequest = installations[0]?.list[0];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E5F8E6', '#E5F8E6', '#ffffffff']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
        }}
      >
        <View>
          <Typo
            label={`Hi,${userdata?.name}`}
            color="#030204"
            variant="headingSecondaryPrimary"
          />
          {installationRequest && (
            <Text style={styles.subtext}>
              Your request{' '}
              <Text style={styles.highlight}>
                #{installationRequest?.installRefNo}
              </Text>{' '}
              is submitted!{'\n'}
              We’re assigning your vendor shortly
            </Text>
          )}
        </View>
        <View>
          <Image
            source={require('../../../../../assets/images/png/activeuser.png')}
            style={{ height: 80, width: 80 }}
            resizeMode="contain"
          />
        </View>
      </View>
      {installationRequest && (
        <View style={styles.card}>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text style={styles.labeltitle}>My Request</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labellink}>View details</Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text style={styles.label}>Request ID</Text>
              <Text style={styles.value}>
                #{installationRequest?.installRefNo}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date submitted</Text>
              <Text style={styles.value}>
                {new Date(installationRequest?.createdAt).toLocaleDateString(
                  'en-GB',
                )}
              </Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text style={styles.label}>Type of Installations</Text>
              <Text style={styles.value}>
                {installationRequest?.installationType?.name}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{installationRequest?.address}</Text>
            </View>
          </View>
        </View>
      )}
      {installations?.[0]?.list?.length > 1 && (
        <Button
          type="primary"
          title="Track request"
          onPress={() =>
            navigation.navigate('BottomTab', {
              screen: 'My Request',
            })
          }
          style={{ marginBottom: 10 }}
        />
      )}
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  greeting: {
    fontSize: 28,
    paddingBottom: 10,
    fontFamily: 'GeneralSans-Regular',
    color: '#030204',
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Regular',
    color: '#555',
    marginBottom: 16,
    paddingTop: 4,
  },
  highlight: {
    color: '#111',
    fontFamily: 'GeneralSans-SemiBold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  col: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  row: {
    marginBottom: 8,
    width: '50%',
  },
  labeltitle: {
    fontSize: 20,
    color: '#030204',
    fontFamily: 'GeneralSans-Semibold',
  },
  label: {
    fontSize: 14,
    paddingBottom: 8,
    color: '#666',
    fontFamily: 'GeneralSans-Medium',
  },
  labellink: {
    fontSize: 16,
    color: '#148057',
    fontFamily: 'GeneralSans-Medium',
  },
  value: {
    fontSize: 14,
    color: '#111',
    fontFamily: 'GeneralSans-Semibold',
  },
  trackBtn: {
    backgroundColor: '#131337',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  trackText: {
    color: '#fff',
    fontFamily: 'GeneralSans-Medium',
    fontSize: 16,
  },
});
