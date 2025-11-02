import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SubHeader from '../../../navigation/SubHeader';
import Button from '../'
// Define the structure for each maintenance tip
type Tip = {
  id: string;
  iconName: string;
  title: string;
  description: string;
};

// Data for the maintenance tips
const maintenanceTips: Tip[] = [
  {
    id: '1',
    iconName: 'mop',
    title: 'Keep panels clean',
    description:
      'Dust, dirt, and leaves can block sunlight. Gently clean panels every few months for maximum performance.',
  },
  {
    id: '2',
    iconName: 'alert-outline',
    title: 'Check system alerts',
    description:
      'Open your Rengy app regularly to check for system warnings, errors, or low-performance alerts.',
  },
  {
    id: '3',
    iconName: 'chart-line',
    title: 'Monitor performance',
    description:
      'Keep an eye on daily solar generation. A sudden drop might mean it’s time for cleaning or service.',
  },
  {
    id: '4',
    iconName: 'mop', // The image shows this item duplicated
    title: 'Keep panels clean',
    description:
      'Dust, dirt, and leaves can block sunlight. Gently clean panels every few months for maximum performance.',
  },
];

// Reusable TipCard component
const TipCard = ({ iconName, title, description }: Omit<Tip, 'id'>) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon name={iconName} size={28} color="#5D6975" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
);

const MaintenanceTipsScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <SubHeader title="Maintenance tips" type="default" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {maintenanceTips.map(tip => (
          <TipCard
            key={tip.id}
            iconName={tip.iconName}
            title={tip.title}
            description={tip.description}
          />
        ))}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Get AMC now pressed')}
        >
          <Text style={styles.buttonText}>Get AMC now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 100, // Padding to ensure content isn't hidden by the footer button
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // Adding a subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#F8F9FA', // Match screen background
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  button: {
    backgroundColor: '#4A2579', // A deep purple color
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MaintenanceTipsScreen;
