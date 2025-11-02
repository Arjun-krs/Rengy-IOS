import React, { useEffect } from 'react';
import { ImageBackground, View, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '../../../../../../assets/icons';
import { TypoComp } from "../../../../../../components/common"
import { useNavigation } from '@react-navigation/native';

const DynamicLoader = () => {
    const { height, width } = Dimensions.get('window')
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('SelectProjDetail', { isOpen: true });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ImageBackground
                source={require('../../../../../../assets/images/png/bg2.png')}
                style={{ flex: 1, height: height * 0.3 }}
            >
                <LinearGradient
                    colors={["#FFFFFF", "#F9FAF9", "#70F4C3"]}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1, position: 'relative', zIndex: -1, justifyContent: 'center' }}
                >
                    <Image source={{ uri: Icons.dynamicLoader }} style={{ height: 270, position: 'relative', zIndex: 2, width: width }} resizeMode='contain' />
                    <View style={{ position: 'absolute', bottom: insets.bottom + height * 0.1 }}>
                        <TypoComp label='Just a moment while we generate your dynamic pricing' color='#030204' variant='titleMediumSecondary' style={{ textAlign: 'center' }} />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default DynamicLoader;
