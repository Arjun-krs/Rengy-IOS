import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Typo, Button } from '../../../../../components/common';
import { useSubscriptions } from '../../../../../api/getQuery/amc/getList';
import { useNavigation } from '@react-navigation/native';

type PlanType = {
  id: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  highlight?: boolean;
  borderColor?: string;
  backgroundColor?: string;
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.65;

const SubscriptionPlan: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const { data, loading, error, refetch } = useSubscriptions();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Retrieve the JSON string from the key 'user'
        const userJson = await AsyncStorage.getItem('user');
        const userData = JSON.parse(userJson);

        if (userData) {
          setUserId(userData?.user?.id); // Convert to string as an API parameter often expects string
        }
      } catch (error) {
        console.error('Failed to load user ID from storage', error);
      } finally {
        setIsStorageLoaded(true); // Mark storage loading as complete
      }
    };

    fetchUserId();
  }, []); // Run only once on mount

  const handlePlanPress = (plan: PlanType) => {
    console.log('Selected Plan:', plan);
    navigation.navigate('SubscriptionFlow' as never, { plan, userId } as never);
  };
  

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#22c55e"
        style={{ marginTop: 50 }}
      />
    );
  }

  if (error) {
    return (
      <Text style={{ marginTop: 50, textAlign: 'center', color: 'red' }}>
        Error loading subscriptions
      </Text>
    );
  }

  const subscriptions = data?.list || [];
  console.log('Subscriptions to display:', subscriptions);

  const CARD_STYLES = [
    { borderColor: '#71F4C3', backgroundColor: '#F0FFF9' },
    { borderColor: '#69BFFF', backgroundColor: '#E5F4FF' },
    { borderColor: '#7C3AED', backgroundColor: '#F5F3FF' },
  ];

  const sortedSubscriptions = (subscriptions || []).sort(
    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
  );

  return (
    <View style={styles.container}>
      <Typo variant="h2" color="#030204" style={styles.heading}>
        Subscription plans
      </Typo>

      <FlatList
        data={sortedSubscriptions || []}
        horizontal
        contentContainerStyle={{ paddingVertical: 10, paddingLeft: 3 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const style = CARD_STYLES[index % CARD_STYLES.length]; // Cycle colors

          return (
            <View
              style={[
                styles.card,
                style,
                item.isMostPopular && styles.highlightCard,
              ]}
            >
              {item.isMostPopular && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Most Subscribed</Text>
                </View>
              )}
              <View style={styles.plancard}>
                <View>
                  <Text style={styles.planTitle}>{item.name}</Text>
                  <Text style={styles.planPrice}>
                    {item.title}
                    {/* <Text style={styles.planDuration}>{item.planDays}</Text> */}
                  </Text>
                </View>

                <View>
                  {(item.keyPoints || []).map(
                    (feature: string, idx: number) => (
                      <View style={styles.featureRow} key={idx}>
                        <Icon name="check-circle" size={18} color="#22c55e" />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ),
                  )}
                </View>

                {
                  <View>
                    <Typo variant="body" color="#030204" style={styles.para}>
                      {item.shortDescription}
                    </Typo>

                    <Button
                      title={
                        item?.isSubscribed
                          ? 'Subscribed'
                          : item?.ctaLabel || 'Get Now'
                      }
                      type={item?.isSubscribed ? 'disabled' : 'primary'}
                      onPress={() => {
                        if (!item?.isSubscribed) {
                          handlePlanPress(item);
                        }
                      }}
                    />
                  </View>
                }
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 50,
  },
  heading: {
    marginBottom: 20,
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    marginRight: 16,
    padding: 20,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 6 },
    elevation: 4,
  },
  highlightCard: {
    borderWidth: 2,
  },
  plancard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#71F4C3',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#131337',
  },
  planTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    marginBottom: 12,
    paddingBottom: 20,
  },
  planDuration: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6b7280',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
  para: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 14,
    color: '#030204',
  },
});
