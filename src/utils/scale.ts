// src/utils/scale.ts
import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Base sizes (iPhone 11 reference: 375x812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) =>
  (width / guidelineBaseWidth) * size;

export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

export const scaleFont = (size: number) => {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// ✅ Spacing helpers
export const ms = (size: number, factor: number = 0.5) => moderateScale(size, factor); // margin/padding
export const vs = (size: number) => verticalScale(size); // vertical spacing
export const hs = (size: number) => scale(size); // horizontal spacing
export const sf = (size: number) => scaleFont(size); // font size

// Example usage:
// const styles = StyleSheet.create({
//   container: {
//     padding: ms(16),
//   },
//   title: {
//     fontSize: sf(20),
//   },
//   button: {
//     marginVertical: vs(10),
//     marginHorizontal: hs(20),
//   },
// });  