import React from 'react';
import { View, StyleSheet, ImageSourcePropType } from 'react-native';
import Svg, {
  Defs,
  ClipPath,
  Polygon,
  Image as SvgImage,
} from 'react-native-svg';

type CroppedImageProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  cutSize?: number;
};

const CroppedImage: React.FC<CroppedImageProps> = ({
  source,
  width,
  height,
  cutSize = 30,
}) => {
  const href =
    typeof source === 'number' ? source : { uri: (source as any).uri };

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Defs>
          <ClipPath id="clip">
            <Polygon
              points={`
                0,0 
                ${width - cutSize},0 
                ${width},${cutSize} 
                ${width},${height} 
                ${cutSize},${height} 
                0,${height - cutSize}
              `}
            />
          </ClipPath>
        </Defs>

        <SvgImage
          width={width}
          height={height}
          href={href}
          clipPath="url(#clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CroppedImage;
