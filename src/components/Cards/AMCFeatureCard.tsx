import React from "react";
import { Text, StyleSheet } from "react-native";
import BaseCard from "./BaseCard";

type AMCFeatureCardProps = { icon?: any; title: string; description: string };

const AMCFeatureCard: React.FC<AMCFeatureCardProps> = ({ icon, title, description }) => (
  <BaseCard icon={icon}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.desc}>{description}</Text>
  </BaseCard>
);

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14, color: "#444", marginTop: 4 },
});

export default AMCFeatureCard;
