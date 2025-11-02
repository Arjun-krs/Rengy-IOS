import React, { useState } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary, Asset, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { pick } from '@react-native-documents/picker';
// import RNFS from 'react-native-fs';

import Video from 'react-native-video';
import { AttachmentIcon, PlusIcon } from '../../utils/svgSrc';
import { InfoIcon, PrimaryDelIcon } from '../../utils/imagesrc';
import { requestCameraPermission, requestStoragePermission } from './permissions';
import Typo from '../Typo';

interface UploadDocProps {
    label?: string;
    error?: string;
    type: 'video' | 'image' | 'doc';
    infoIcon?: boolean;
    onMediaSelect?: (formData: FormData, files: Asset[]) => void;
    docHeader?: string,
    isMandatory?: boolean
}

const UploadMedia: React.FC<UploadDocProps> = ({
    label,
    error,
    type,
    infoIcon = false,
    onMediaSelect,
    docHeader,
    isMandatory
}) => {
    const [media, setMedia] = useState<Asset[]>([]);

    // const buildFormData = (files: Asset[]) => {
    //     const formData = new FormData();
    //     files.forEach((file, idx) => {
    //         if (file?.uri) {
    //             formData.append(type, {
    //                 uri: file?.uri,
    //                 type: file?.type || (type === 'image' ? 'image/jpeg' : 'video/mp4'),
    //                 name: file?.fileName || `${type}_${idx}.${type === 'image' ? 'jpg' : 'mp4'}`,
    //             } as unknown as string | Blob);
    //         }
    //     });
    //     return formData;
    // };
    const buildFormData = async (files: Asset[]) => {
        // const formData = new FormData();

        // for (let idx = 0; idx < files.length; idx++) {
        //     let file = files[idx];
        //     let fileUri: any = file.uri;

        //     if (fileUri.startsWith('content://')) {
        //         const destPath = `${RNFS.TemporaryDirectoryPath}/${file.fileName || `document_${idx}.pdf`}`;
        //         await RNFS.copyFile(fileUri, destPath);
        //         fileUri = 'file://' + destPath;
        //     }

        //     formData.append(type, {
        //         uri: fileUri,
        //         name: file.fileName || `${type}_${idx}.pdf`,
        //         type: file.type || 'application/pdf',
        //     } as any);
        // }

        // return formData;
    };

    const handleUpload = async () => {
        if (type === 'video') {
            const hasCamera = await requestCameraPermission();
            const hasStorage = await requestStoragePermission();
            if (!hasCamera || !hasStorage) {
                Alert.alert("Permission Denied", "Camera/Storage permission is required.");
                return;
            }
            const options: CameraOptions = {
                mediaType: 'video',
                videoQuality: 'high',
                durationLimit: 5,
            };
            launchCamera(options, (response) => {
                if (response?.didCancel || response?.errorCode) return;
                if (response?.assets) {
                    const updated = [...media, ...response?.assets];
                    setMedia(updated);
                    const formData = buildFormData(updated);
                    onMediaSelect?.(formData, updated);
                }
            });
        } else if (type === 'image') {
            const hasStorage = await requestStoragePermission();
            if (!hasStorage) {
                Alert.alert("Permission Denied", "Storage permission is required.");
                return;
            }
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                selectionLimit: 0,
            };
            launchImageLibrary(options, (response) => {
                if (response?.didCancel || response?.errorCode) return;
                if (response?.assets) {
                    const updated = [...media, ...response?.assets];
                    setMedia(updated);
                    const formData = buildFormData(updated);
                    onMediaSelect?.(formData, updated);
                }
            });
        } else {
            try {
                const res = await pick({ allowMultiSelection: false, type: ['application/pdf'] });
                const mappedRes: Asset[] = res.map((doc: any, idx: number) => ({
                    uri: doc?.uri,
                    type: doc?.type ?? undefined,
                    fileName: doc?.name ?? `doc_${media?.length + idx}.pdf`,
                }));
                const updated = mappedRes;
                setMedia(updated);
                const formData = buildFormData(updated);
                onMediaSelect?.(formData, updated);
            } catch (err) {
                console.log('Document pick error:', err);
            }
        }
    };

    const handleDelete = (index: number) => {
        const updated = [...media];
        updated.splice(index, 1);
        setMedia(updated);
        const formData = buildFormData(updated);
        onMediaSelect?.(formData, updated);
    };

    const renderItem = ({ item, index }: { item: Asset; index: number }) => (
        <View style={{ marginRight: 8, position: 'relative' }}>
            {type === 'image' && (
                <Image
                    source={{ uri: item.uri }}
                    style={{ width: 167, height: 102, borderRadius: 8 }}
                />
            )}
            {type === 'video' && (
                <Video
                    source={{ uri: item?.uri! }}
                    style={{ width: 167, height: 102, borderRadius: 8 }}
                    muted
                    repeat
                    resizeMode="cover"
                />
            )}

            {type === 'doc' && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <AttachmentIcon />
                    <Typo label={'Attachment'} color='#67606E' variant='bodySmallTertiary' />
                </View>
            )}

            {(type === 'video' || type === 'image') && (
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: '#FFFFFF', borderRadius: 4, padding: 4 }}
                    onPress={() => handleDelete(index)}
                >
                    <PrimaryDelIcon />
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={{ gap: 12 }}>
            {label && (
                <View style={{ flexDirection: 'row', gap: 2 }}>
                    <Typo
                        color={error ? '#FF0004' : '#030204'}
                        label={label}
                        variant="bodyMediumTertiary"
                    />
                    {isMandatory && (
                        <Text style={{ color: '#FF0004', transform: [{ translateY: -2 }] }}>
                            *
                        </Text>
                    )}
                </View>
            )}

            <View style={{ borderWidth: 1, borderColor: error ? 'red' : '#EBEBEB', borderRadius: 8, padding: 16, backgroundColor: '#FFFFFF', elevation: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', gap: 4 }}>
                        <Typo label={type === 'video' ? 'Capture video' : type === 'doc' ? docHeader : 'Upload image'} variant="bodySmallSecondary" color="#030204" />
                        <Typo label={type === 'video' ? 'mp4, MOV, AVI. Max 20 mb' : type === 'doc' ? 'PDF. Max 10 mb' : 'PNG, JPG. Max 10 mb'} variant="bodySmallTertiary" color="#67606E" />
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleUpload}>
                        <PlusIcon />
                        <Typo label={type === 'video' ? 'Capture' : 'Upload'} variant="bodyMediumPrimary" color="#148057" />
                    </TouchableOpacity>
                </View>

                {media?.length > 0 && (
                    <FlatList
                        data={media}
                        horizontal
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingTop: 16 }}
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            {error && <Typo color={'#FF0004'} label={error} variant="bodyMediumTertiary" />}
        </View >
    );
};

export default UploadMedia;
