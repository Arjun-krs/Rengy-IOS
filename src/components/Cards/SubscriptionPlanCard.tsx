import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

type SubscriptionPlanCardProps = {
  title: string;
  price: string;
  duration: string;
  features: string[];
  buttonText: string;
  onPress: () => void;
  highlighted?: boolean;
};

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  title,
  price,
  duration,
  features,
  buttonText,
  onPress,
  highlighted = false,
}) => (
  <View style={[styles.card, highlighted && styles.highlighted]}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.price}>
      {price}
      <Text style={styles.duration}>/{duration}</Text>
    </Text>

    {features.map((f, i) => (
      <Text key={i} style={styles.feature}>• {f}</Text>
    ))}

    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  highlighted: { borderColor: "#4CAF50", borderWidth: 2 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  price: { fontSize: 22, fontWeight: "700", color: "#111" },
  duration: { fontSize: 14, color: "#666" },
  feature: { fontSize: 14, marginVertical: 2, color: "#444" },
  button: {
    marginTop: 12,
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});

export default SubscriptionPlanCard;
