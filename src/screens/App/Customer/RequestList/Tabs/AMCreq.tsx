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
  fetchAMCRequests,
  resetAMCState,
} from '../../../../../api/slice/amcSlice';
import { RootState } from '../../../../../api/store';
import RequestOverviewCard from '../../../../../components/Cards/RequestOverviewCard.tsx';
import { getStoredUser, User } from '../../../../../utils/auth.ts'; // adjust path
import useFetchUserData from '../../../../../hooks/useFetchUser.tsx';

const AMCreq: React.FC = () => {
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

  const { loading, error, amcRequests, success } = useSelector(
    (state: RootState) => state.amc,
  );

  useEffect(() => {
    if (userId) dispatch(fetchAMCRequests(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success && userId) {
      dispatch(fetchAMCRequests(userId));
      dispatch(resetAMCState());
    }
  }, [success, userId, dispatch]);

  const amcList = Array.isArray(amcRequests) ? amcRequests : [];

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#148057" />
        <Text style={{ marginTop: 10 }}>Loading AMC requests...</Text>
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
      <Text style={styles.title}>AMC Requests</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {amcList?.[0]?.list.length > 0 ? (
          amcList?.[0]?.list.map((item: any) => (
            <RequestOverviewCard
              key={item.id}
              id={item.amcRefNo || item.id}
              // tag="AMC Request"
              dateSubmitted={new Date(item.createdAt).toLocaleDateString(
                'en-GB',
              )}
              service={item?.service?.name}
              next={new Date(item.siteVisitDate).toLocaleDateString('en-GB')}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No AMC requests found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default AMCreq;

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
