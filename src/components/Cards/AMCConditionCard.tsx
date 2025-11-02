import React from "react";
import { Text, StyleSheet } from "react-native";
import BaseCard from "./BaseCard";

type AMCConditionCardProps = { icon?: any; text: string };

const AMCConditionCard: React.FC<AMCConditionCardProps> = ({ icon, text }) => (
  <BaseCard icon={icon}>
    <Text style={styles.text}>{text}</Text>
  </BaseCard>
);

const styles = StyleSheet.create({
  text: { fontSize: 14, fontWeight: "500" },
});

export default AMCConditionCard;
