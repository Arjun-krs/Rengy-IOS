import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme, ColorSchemeName } from "react-native";
import { COLORS, COLORS_DARK } from "./colors";
import { SPACING } from "./spacing";
import { TYPOGRAPHY, TYPOGRAPHY_DARK } from "./typography";
import { SHADOWS } from "./shadows";

const lightTheme = {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  SHADOWS,
};

const darkTheme = {
  COLORS: COLORS_DARK,
  SPACING,
  TYPOGRAPHY: TYPOGRAPHY_DARK,
  SHADOWS,
};

type ThemeType = typeof lightTheme;

type ThemeContextType = {
  theme: ThemeType;
  scheme: ColorSchemeName;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  scheme: "light",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scheme = useColorScheme();

  const theme = useMemo(() => {
    return scheme === "dark" ? darkTheme : lightTheme;
  }, [scheme]);

  return (
    <ThemeContext.Provider value={{ theme, scheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);