import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Image,
} from "react-native";

// --- Assumed Theme Colors & Typography (based on images) ---
const COLORS = {
  primaryBg: "#131337", // Dark Navy
  primaryText: "#71F4C3", // Mint Green
  secondaryBorder: "#131337", // Muted Blue
  secondaryText: "#131337", // Lighter Blue for text
  secondaryLightBg: "#FFFFFF",
  secondaryLightBorder: "#E5E7EB", // Light Gray
  textDark: "#0F172A",
  disabledBg: "#CFCFCF",
  disabledText: "#FFFFFF",
  white: "#FFFFFF",
  socialGoogleBg: "#000000",
  socialGoogleBorder: "#E5E7EB",
  socialGoogleText: "#131337",
};

const TYPOGRAPHY = {
  fontMedium: "GeneralSans-Medium", // Replace with your actual font
};
// -----------------------------------------------------------

type ButtonType =
  | "primary" // Solid dark background
  | "secondary" // Outlined on dark background
  | "secondary-light" // Outlined on light background
  | "social-google" // Custom Google button
  | "disabled";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  type?: ButtonType;
  leftIcon?: React.ReactElement; // Accept a custom component for icons/logos
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  leftIcon,
  loading = false,
  style,
  textStyle,
}) => {
  const isDisabled = type === "disabled" || loading;

  const getStyles = () => {
    switch (type) {
      case "primary":
        return { container: styles.primary, text: styles.primaryText };
      case "secondary":
        return { container: styles.secondary, text: styles.secondaryText };
      case "secondary-light":
        return { container: styles.secondaryLight, text: styles.secondaryLightText };
      case "social-google":
        return { container: styles.socialGoogle, text: styles.socialGoogleText };
      case "disabled":
        return { container: styles.disabled, text: styles.disabledText };
      default:
        return { container: styles.primary, text: styles.primaryText };
    }
  };

  const { container, text } = getStyles();

  return (
    <TouchableOpacity
      style={[styles.base, container, style]}
      onPress={!isDisabled ? onPress : undefined}
      activeOpacity={isDisabled ? 1 : 0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <>
          {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
          <Text style={[styles.textBase, text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    // width: "100%",
  },
  textBase: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fontMedium,
    textAlign: "center",
  },
  iconWrapper: {
    marginRight: 10,
  },

  // Primary Styles
  primary: {
    backgroundColor: COLORS.primaryBg,
  },
  primaryText: {
    color: COLORS.primaryText,
  },

  // Secondary (Dark) Styles
  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: COLORS.secondaryBorder,
  },
  secondaryText: {
    color: COLORS.secondaryText,
  },

  // Secondary (Light) Styles
  secondaryLight: {
    backgroundColor: COLORS.secondaryLightBg,
    borderWidth: 2,
    borderColor: COLORS.secondaryLightBorder,
  },
  secondaryLightText: {
    color: COLORS.textDark,
  },

  // Social Google Styles
  socialGoogle: {
    backgroundColor: COLORS.secondaryLightBg,
    borderWidth: 2,
    borderColor: COLORS.socialGoogleBorder,
  },
  socialGoogleText: {
    color: COLORS.socialGoogleText,
  },

  // Disabled Styles
  disabled: {
    backgroundColor: COLORS.disabledBg,
  },
  disabledText: {
    color: COLORS.disabledText,
  },
});