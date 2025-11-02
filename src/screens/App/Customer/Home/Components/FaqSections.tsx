import React from 'react';
import { View, StyleSheet } from 'react-native';
import FAQCard from '../../../../../components/Cards/FAQCard';
import { Typo } from '../../../../../components';

const FaqSections: React.FC = () => {
  const faqs = [
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
  ];

  return (
    <View style={styles.container}>
      <View style={styles.faqHeader}>
        <Typo label="FAQ's" />
        {/* <Typo variant="h2" color="#030204">
          FAQ's
        </Typo> */}
        <Typo label="View all" />
        {/* <Typo variant="body" color="#148057" style={{ fontSize: 14, fontWeight: 'bold' }}>
          View all
        </Typo> */}
      </View>

      <View style={styles.faqList}>
        {faqs.map((faq, index) => (
          <FAQCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>
    </View>
  );
};

export default FaqSections;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor:'#FFFFFF'
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal:10
  },
  faqList: {
    marginBottom: 20,
  },
});
