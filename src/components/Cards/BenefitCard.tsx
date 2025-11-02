// BenefitCard.tsx
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

interface BenefitCardProps {
  image: any;
  tag: string;
  title: string;
  description: string;
  icon: any;
}
const screenWidth = Dimensions.get('window').width; // Get screen width
const cardWidth = screenWidth * 0.6; // Set card width to 70% of screen width

const BenefitCard: React.FC<BenefitCardProps> = ({
  image,
  tag,
  title,
  icon,
  description,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.tagWrapper}>
          <Text style={styles.tag}>{tag}</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={icon}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  illustration: {
    width: 38,
    height: 38,
    marginBottom:10
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000054',
  },
  tagWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'GeneralSans-Medium',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'GeneralSans-Medium',
    color: '#fff',
    marginBottom: 6,
    paddingEnd: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'GeneralSans-Medium',
    color: '#ddd',
  },
});

export default BenefitCard;
