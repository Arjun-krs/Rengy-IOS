import React from "react";
import { Text, StyleSheet } from "react-native";
import BaseCard from "./BaseCard";

type InstallationTypeCardProps = { image: any; title: string; description: string };

const InstallationTypeCard: React.FC<InstallationTypeCardProps> = ({ image, title, description }) => (
  <BaseCard image={image}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.desc}>{description}</Text>
  </BaseCard>
);

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14, color: "#666", marginTop: 4 },
});

export default InstallationTypeCard;
