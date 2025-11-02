import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export interface BottomSheetMethods {
  open: () => void;
  close: () => void;
}

export interface BottomSheetProps {
  children?: React.ReactNode;
}

const CustomBottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(
  ({ children }, ref) => {
    const insets = useSafeAreaInsets()
    const [modalVisible, setModalVisible] = useState(false);
    const animatedY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const openSheet = () => {
      setModalVisible(true);
      Animated.timing(animatedY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true, 
      }).start();
    };

    const closeSheet = () => {
      Animated.timing(animatedY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false); 
      });
    };

    useImperativeHandle(ref, () => ({
      open: openSheet,
      close: closeSheet,
    }));

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          if (gestureState.dy > 0) {
            animatedY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (e, gestureState) => {
          if (gestureState.dy > SCREEN_HEIGHT / 3 || gestureState.vy > 0.5) {
            closeSheet();
          } else {
            Animated.spring(animatedY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    ).current;

    if (!modalVisible) {
      return null;
    }

    return (
      <Modal transparent visible={modalVisible} onRequestClose={closeSheet}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={closeSheet} />

          <Animated.View
            style={[
              styles.bottomSheetContainer,
              {
                transform: [{ translateY: animatedY }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}
            >
              <View style={styles.dragHandle} />
              {children}
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  keyboardView: {
    flex: 1,
    width: '100%',
  },
});

export default CustomBottomSheet;
