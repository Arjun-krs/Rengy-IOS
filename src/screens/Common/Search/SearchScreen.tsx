import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // For back navigation
// --- Type Definition for a single search result ---
type SearchResult = {
  id: string;
  name: string;
  projectType: string;
  value: number;
  progress: number; // Progress as a percentage (e.g., 35 for 35%)
};

// --- Mock Data (simulating an API or database) ---
const MOCK_RECENT_SEARCHES: string[] = [
  '#RNGY20250708',
  '#RNGY20250710',
  'Mahesh Sharma',
  'Shreyas Lal',
];

const MOCK_PROJECT_DATA: SearchResult[] = [
  {
    id: '1',
    name: 'Mahesh Sharma',
    projectType: 'Solar Installation',
    value: 321000,
    progress: 35,
  },
  {
    id: '2',
    name: 'Maria Shah',
    projectType: 'Solar Installation',
    value: 450000,
    progress: 35,
  },
  {
    id: '3',
    name: 'Mayur Sakhiya',
    projectType: 'Solar Installation',
    value: 450000,
    progress: 35,
  },
  {
    id: '4',
    name: 'Mahi Sharma',
    projectType: 'Solar Installation',
    value: 450000,
    progress: 35,
  },
  {
    id: '5',
    name: 'Mahendra Singh',
    projectType: 'Inverter Setup',
    value: 120000,
    progress: 80,
  },
  {
    id: '6',
    name: 'Manish Paul',
    projectType: 'Panel Maintenance',
    value: 55000,
    progress: 100,
  },
];

// --- Helper to format currency ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// --- The Main Component ---
const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // Start with empty to show initial empty state
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack(); // Navigate back
  };
  // Simulate loading initial recent searches
  useEffect(() => {
    // In a real app, you'd load this from AsyncStorage
    setTimeout(() => {
      setRecentSearches(MOCK_RECENT_SEARCHES);
    }, 1000); // Small delay to show empty state first
  }, []);

  // Effect to perform search when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const filteredResults = MOCK_PROJECT_DATA.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.projectType.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleRecentSearchPress = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  // --- Render Functions for different states ---

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('../../../assets/images/png/no_search_illustration.png')} // NOTE: You need to have this image in your assets folder
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>No recent searches available</Text>
    </View>
  );

  const renderRecentSearches = () => (
    <View>
      <Text style={styles.sectionHeader}>Recent searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recentItem}
            onPress={() => handleRecentSearchPress(item)}
          >
            <Icon name="history" size={22} color="#888" />
            <Text style={styles.recentItemText}>{item}</Text>
            <Icon
              name="arrow-top-left"
              size={20}
              color="#555"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      {/* <Text style={styles.resultsCount}>{searchResults.length} results</Text> */}
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <TouchableOpacity style={styles.archiveButton}>
                <Icon name="delete-outline" size={24} color="#00A99D" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardSubtitle}>{item.projectType}</Text>
            <View style={styles.cardValueContainer}>
              <Text style={styles.cardValue}>{formatCurrency(item.value)}</Text>
              <Text style={styles.cardValueLabel}>Value</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${item.progress}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}% completed</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPressOut={handleBackPress}>
          <Icon name="arrow-left" size={24} color="#148057" />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by project name or customer name"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoFocus={true}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearIcon}
            >
              <Icon name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.length > 0
        ? renderSearchResults()
        : recentSearches.length > 0
        ? renderRecentSearches()
        : renderEmptyState()}
    </SafeAreaView>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light grey background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
    padding: 0, // Remove default padding
  },
  clearIcon: {
    paddingLeft: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  // --- Recent Searches Styles ---
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  recentItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#444',
  },
  arrowIcon: {
    transform: [{ rotate: '-45deg' }],
  },
  // --- Empty State Styles ---
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    color: '#888',
  },
  // --- Search Results Styles ---
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#666',
    paddingTop: 16,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'GeneralSans-Medium',
    color: '#212529',
  },
  archiveButton: {
    backgroundColor: '#E6F6F5',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#6c757d',
    marginTop: 4,
  },
  cardValueContainer: {
    marginTop: 16,
  },
  cardValue: {
    fontSize: 22,
    fontFamily: 'GeneralSans-Medium',
    color: '#212529',
  },
  cardValueLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    marginTop: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00A99D',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'GeneralSans-Medium',
    color: '#6c757d',
    marginTop: 6,
  },
});

export default SearchScreen;
