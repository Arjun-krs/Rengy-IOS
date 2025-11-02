import { StyleSheet } from 'react-native';
import { FontSize } from '../../theme/size';

export const FontFamily = {
  fontRegular: 'GeneralSans-Regular',
  fontMedium: 'GeneralSans-Medium',
  fontBold: 'GeneralSans-Semibold',
};

export const styles = StyleSheet.create({
  mainHeading: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_40,
    lineHeight: 48,
  },

  headingLargePrimary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_32,
    lineHeight: 40,
  },

  headingSecondaryPrimary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_32,
    lineHeight: 40,
  },

  headingMediumPrimary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_28,
    lineHeight: 36,
  },

  headingMediumSecondary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_28,
    lineHeight: 36,
  },

  headingSmallPrimary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_24,
    lineHeight: 32,
  },

  headingSmallSecondary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_24,
    lineHeight: 32,
  },

  titleLargePrimary: {
    fontFamily: FontFamily.fontBold,
    fontSize: FontSize.font_size_20,
    lineHeight: 28,
  },

  titleLargeSecondary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_20,
    lineHeight: 28,
  },

  titleLargeTertiary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_20,
    lineHeight: 28,
  },

  titleMediumPrimary: {
    fontFamily: FontFamily.fontBold,
    fontSize: FontSize.font_size_18,
    lineHeight: 26,
  },

  titleMediumSecondary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_18,
    lineHeight: 26,
  },

  titleMediumTertiary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_18,
    lineHeight: 26,
  },

  bodyLargePrimary: {
    fontFamily: FontFamily.fontBold,
    fontSize: FontSize.font_size_16,
    lineHeight: 24,
  },

  bodyLargeSecondary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_16,
    lineHeight: 24,
  },

  bodyLargeTertiary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_16,
    lineHeight: 24,
  },

  bodyMediumPrimary: {
    fontFamily: FontFamily.fontBold,
    fontSize: FontSize.font_size_14,
    lineHeight: 20,
  },

  bodyMediumSecondary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_14,
    lineHeight: 20,
  },

  bodyMediumTertiary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_14,
    lineHeight: 20,
  },

  bodySmallPrimary: {
    fontFamily: FontFamily.fontBold,
    fontSize: FontSize.font_size_12,
    lineHeight: 16,
  },

  bodySmallSecondary: {
    fontFamily: FontFamily.fontMedium,
    fontSize: FontSize.font_size_12,
    lineHeight: 16,
  },

  bodySmallTertiary: {
    fontFamily: FontFamily.fontRegular,
    fontSize: FontSize.font_size_12,
    lineHeight: 16,
  },
});
