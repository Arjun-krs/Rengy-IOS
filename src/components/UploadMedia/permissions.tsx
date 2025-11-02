import { Alert, PermissionsAndroid, Platform } from "react-native";

export const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permission",
                    message: "This app needs access to your camera to take photos/videos",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};

export const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
        try {
            if (Platform.Version >= 33) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]);
                return (
                    granted["android.permission.READ_MEDIA_IMAGES"] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.READ_MEDIA_VIDEO"] ===
                    PermissionsAndroid.RESULTS.GRANTED
                );
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};

export const requestStoragePermissionDownload = async (
    fileType: 'pdf' | 'image' | 'video' = 'pdf'
): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    try {
        if (Platform.Version >= 33 && fileType === 'pdf') return true;

        if (Platform.Version >= 33) {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]);

            const allGranted =
                granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.READ_MEDIA_VIDEO'] === PermissionsAndroid.RESULTS.GRANTED;

            if (!allGranted) Alert.alert('Permission Denied', 'Cannot access media files');
            return allGranted;
        } else {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            const allGranted =
                granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

            if (!allGranted) Alert.alert('Permission Denied', 'Cannot access storage');
            return allGranted;
        }
    } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
    }
};