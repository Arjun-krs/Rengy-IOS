// src/screens/Customer/Report.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchInstallationRequests,
  resetInstallationState,
} from '../../../../../api/slice/installationSlice';
import { RootState } from '../../../../../api/store';
import RequestOverviewCard from '../../../../../components/Cards/RequestOverviewCard.tsx';
import { getStoredUser, User } from '../../../../../utils/auth.ts'; // adjust path
import useFetchUserData from '../../../../../hooks/useFetchUser.tsx';

const InstallationReq: React.FC = () => {
  const dispatch = useDispatch<any>();

  const [user, setUser] = useState<User | null>(null);
  const { user: userData } = useFetchUserData();

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await getStoredUser();
      setUser(storedUser);
    };
    checkUser();
  }, []);
  const userId = user?.user.id;

  const { loading, error, installations, success } = useSelector(
    (state: RootState) => state.installation,
  );

  // ✅ Fetch data on mount
  useEffect(() => {
    if (userId) dispatch(fetchInstallationRequests(userId));
  }, [dispatch, userId]);

  // ✅ Auto refresh when a new request is successfully created
  useEffect(() => {
    if (success && userId) {
      dispatch(fetchInstallationRequests(userId));
      dispatch(resetInstallationState());
    }
  }, [success, userId, dispatch]);

  // ✅ Extract list safely
  const installationList = Array.isArray(installations) ? installations : [];
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#148057" />
        <Text style={{ marginTop: 10 }}>Loading requests...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Installation Requests</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {installationList?.[0]?.list.length > 0 ? (
          installationList?.[0]?.list.map((item: any) => (
            <RequestOverviewCard
              key={item.id}
              id={item.installRefNo}
              tag={item.installationType?.name || 'N/A'}
              dateSubmitted={new Date(item.createdAt).toLocaleDateString(
                'en-GB',
              )}
              projectType={item.installationType?.name || 'N/A'}
              location={item.address || 'N/A'}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No installation requests found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default InstallationReq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#030204',
    marginBottom: 20,
  },
  noDataText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
