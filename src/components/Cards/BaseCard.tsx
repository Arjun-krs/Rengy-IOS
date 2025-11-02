import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";

type BaseCardProps = {
  title?: string;
  description?: string;
  icon?: any;
  image?: any;
  children?: React.ReactNode;
  onPress?: () => void;
};

const BaseCard: React.FC<BaseCardProps> = ({ title, description, icon, image, children, onPress }) => (
  <TouchableOpacity
    activeOpacity={onPress ? 0.8 : 1}
    style={styles.card}
    onPress={onPress}
  >
    {icon && <Image source={icon} style={styles.icon} />}
    {image && <Image source={image} style={styles.image} />}
    {title && <Text style={styles.title}>{title}</Text>}
    {description && <Text style={styles.description}>{description}</Text>}
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: { width: 40, height: 40, marginBottom: 10 },
  image: { width: "100%", height: 120, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  description: { fontSize: 14, color: "#555" },
});

export default BaseCard;
