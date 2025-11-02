// HelpScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import SubHeader from '../../../navigation/SubHeader';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpScreen = () => {
  const faqs: FAQItem[] = [
    {
      question: 'How much can I save by installing solar panels?',
      answer:
        'Savings vary greatly depending on your location, current electricity usage, and the size of your solar system. Many homeowners save hundreds to thousands of dollars annually.',
    },
    {
      question: 'Do I need to pay the full cost upfront?',
      answer:
        'Not at all! Rengy helps you with loan assistance and flexible financing options so you can switch to solar with ease.',
    },
    {
      question: 'How long does the installation process take?',
      answer:
        "Typically, a residential solar panel installation takes between 1 to 3 days, depending on the system's complexity and weather conditions. The entire process from initial consultation to activation can take several weeks.",
    },
    {
      question: 'What kind of maintenance do solar panels need?',
      answer:
        "Solar panels require minimal maintenance. Generally, an annual cleaning to remove dirt, dust, or debris is sufficient. It's also good to periodically check for any shading issues.",
    },
    {
      question: 'What kind of maintenance do solar panels need?',
      answer:
        "Solar panels require minimal maintenance. Generally, an annual cleaning to remove dirt, dust, or debris is sufficient. It's also good to periodically check for any shading issues.",
    },
    {
      question: 'What kind of maintenance do solar panels need?',
      answer:
        "Solar panels require minimal maintenance. Generally, an annual cleaning to remove dirt, dust, or debris is sufficient. It's also good to periodically check for any shading issues.",
    },
    {
      question: 'What kind of maintenance do solar panels need?',
      answer:
        "Solar panels require minimal maintenance. Generally, an annual cleaning to remove dirt, dust, or debris is sufficient. It's also good to periodically check for any shading issues.",
    },
    {
      question: 'What kind of maintenance do solar panels need?',
      answer:
        "Solar panels require minimal maintenance. Generally, an annual cleaning to remove dirt, dust, or debris is sufficient. It's also good to periodically check for any shading issues.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderItem = ({ item, index }: { item: FAQItem; index: number }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => toggleFAQ(index)}
        activeOpacity={0.7}
      >
        <Text style={styles.question}>{item.question}</Text>
        <Icon
          name={activeIndex === index ? 'minus' : 'plus'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {activeIndex === index && (
        <Text style={styles.answer}>{item.answer}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SubHeader title="Help" type="drawer" />
      <FlatList
        data={faqs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
    color: '#111',
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#555',
    lineHeight: 20,
  },
});

export default HelpScreen;
