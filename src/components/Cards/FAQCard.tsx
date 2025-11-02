import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import BaseCard from "./BaseCard";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you have or will install a vector icons library

type FAQCardProps = { question: string; answer: string };

const FAQCard: React.FC<FAQCardProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseCard style={styles.card}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <Text style={styles.question}>{question}</Text>
        <Icon 
          name={isOpen ? "remove" : "add"} 
          size={24} 
          color="#888" 
        />
      </TouchableOpacity>
      {isOpen && <Text style={styles.answer}>{answer}</Text>}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15, // Adjust padding as seen in the design
    marginBottom: 10, // Space between cards
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: { 
    fontSize: 16, 
    fontFamily: 'GeneralSans-Medium',
    fontWeight: "600", 
    flexShrink: 1, // Allows text to wrap
    marginRight: 10, // Space between text and icon
  },
  answer: { 
    fontSize: 14, 
    fontFamily:'GeneralSans-Regular',
    color: "#67606E", 
    marginTop: 10, // Space between question/icon and answer
    lineHeight: 20, // Improve readability
  },
});

export default FAQCard;