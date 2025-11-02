import { NativeModules, Platform } from 'react-native';

const { VRTARSceneNavigatorModule } = NativeModules;

export const checkARSupport = async (): Promise<{
  supported: boolean;
  reason?: string;
}> => {
  if (
    !VRTARSceneNavigatorModule ||
    !VRTARSceneNavigatorModule.isARSupportedOnDevice
  ) {
    return { supported: false, reason: 'AR module not available.' };
  }

  return new Promise(resolve => {
    try {
      VRTARSceneNavigatorModule.isARSupportedOnDevice((result: string) => {
        console.log('AR Support check result:', result);

        switch (result) {
          case 'SUPPORTED':
            resolve({ supported: true });
            break;
          case 'UNAVAILABLE':
            resolve({
              supported: false,
              reason:
                Platform.OS === 'android'
                  ? 'Google Play Services for AR not installed.'
                  : 'ARKit unavailable on this device.',
            });
            break;
          case 'TRANSIENT':
          default:
            resolve({
              supported: false,
              reason: 'This device does not support AR features.',
            });
            break;
        }
      });
    } catch (err) {
      console.log('Error checking AR support:', err);
      resolve({ supported: false, reason: 'Error invoking AR check.' });
    }
  });
};
