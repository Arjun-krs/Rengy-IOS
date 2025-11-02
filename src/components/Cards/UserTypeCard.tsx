import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Typo from "../Typo";

type Props = {
  title: string;
  description: string;
  image: React.ReactNode;
  selected: boolean;
  onPress: () => void;
};

const UserTypeCard: React.FC<Props> = ({
  title,
  description,
  image,
  selected,
  onPress,
}) => {
  const CardContent = () => (
    <>
      <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 20 }}>
        <Typo label={title} color="#030204" variant="titleMediumSecondary" />
        <Typo label={description} color="#67606E" variant="bodyMediumTertiary" />
      </View>
      {typeof image === "number" ? (
        <Image
          source={image as ImageSourcePropType}
          style={{ width: 141, height: 133 }}
          resizeMode="contain"
        />
      ) : (
        image
      )}
    </>
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.card, selected && styles.cardElevated]}>
      {selected ? (
        <LinearGradient
          colors={["#FFFFFF", "#70F4C34D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <CardContent />
        </LinearGradient>
      ) : (
        <View style={styles.contentBackground}>
          <CardContent />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UserTypeCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-end",
    elevation: 3
  },
  cardElevated: {
    elevation: 6,
    shadowColor: "#70F4C3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: '#70F4C3'
  },
  gradientBackground: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 12,
    padding: 0,
    alignItems: "flex-end",
    overflow: "hidden",
  },
  contentBackground: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "flex-end",
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});
