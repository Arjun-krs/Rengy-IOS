import { Alert, Platform, NativeModules } from 'react-native';
// import RNFS from 'react-native-fs';
import { requestStoragePermissionDownload } from '../components/UploadMedia/permissions';

const { ARViewerModule } = NativeModules;

export const formatSubDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export const downloadFile = async (fileUrl: string, fileType: 'pdf' | 'image' | 'video' = 'pdf') => {
    // try {
    //     const hasPermission = await requestStoragePermissionDownload(fileType);
    //     if (!hasPermission) return;

    //     const fileName = fileUrl.split('/').pop() || `file.${fileType}`;
    //     const downloadPath = Platform.OS === 'android' ? `${RNFS.DownloadDirectoryPath}/${fileName}` : `${RNFS.DocumentDirectoryPath}/${fileName}`;
    //     const result = await RNFS.downloadFile({
    //         fromUrl: fileUrl,
    //         toFile: downloadPath,
    //         background: true,
    //         discretionary: true,
    //     }).promise;

    //     if (result.statusCode === 200) {
    //         if (Platform.OS === 'android') {
    //             const { NativeModules } = require('react-native');
    //             const { MediaScannerConnectionModule } = NativeModules;

    //             if (MediaScannerConnectionModule && MediaScannerConnectionModule.scanFile) {
    //                 MediaScannerConnectionModule.scanFile(downloadPath, () => {
    //                     console.log('Media scan completed for:', downloadPath);
    //                 });
    //             }
    //         }

    //         Alert.alert('Download Complete', `Saved to ${downloadPath}`);
    //         // await Share.open({ url: `file://${downloadPath}` });
    //     } else {
    //         console.log('Download Failed', `Status code: ${result.statusCode}`);
    //     }
    // } catch (err: any) {
    //     console.error('Download error:', err);
    // }
};

export const formatDate = (isoDate: string): string => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};