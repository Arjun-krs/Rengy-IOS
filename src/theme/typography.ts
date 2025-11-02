import { scaleFont } from "../utils/scale";
import { COLORS, COLORS_DARK } from "./colors";

export const TYPOGRAPHY = {
  fontRegular: "GeneralSans-Regular",
  fontMedium: "GeneralSans-Medium",
  fontBold: "GeneralSans-Semibold",

  h1: {
    fontSize: scaleFont(40),
    fontFamily: "GeneralSans-Medium",
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: scaleFont(24),
    fontFamily: "GeneralSans-Medium",
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: scaleFont(16),
    fontFamily: "GeneralSans-Regular",
    color: COLORS.textSecondary,
  },
  small: {
    fontSize: scaleFont(14),
    fontFamily: "GeneralSans-Regular",
    color: COLORS.textSecondary,
  },
};

export const TYPOGRAPHY_DARK = {
  ...TYPOGRAPHY,
  h1: { ...TYPOGRAPHY.h1, color: COLORS_DARK.textPrimary },
  h2: { ...TYPOGRAPHY.h2, color: COLORS_DARK.textPrimary },
  body: { ...TYPOGRAPHY.body, color: COLORS_DARK.textSecondary },
  small: { ...TYPOGRAPHY.small, color: COLORS_DARK.textSecondary },
};