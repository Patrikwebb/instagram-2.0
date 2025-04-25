import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { theme } from '@/constants/theme';
import { ArrowLeft, Image as ImageIcon, Video, Camera, Upload, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType } from 'expo-camera';
import { router } from 'expo-router';

export default function CreateScreen() {
  const [selectedType, setSelectedType] = useState<'photo' | 'video'>('photo');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const cameraRef = useRef(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowCamera(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setShowCamera(false);
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const deletePhoto = () => {
    setImage(null);
    setCaption('');
  };

  if (showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowCamera(false)}>
            <ArrowLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Take Photo</Text>
          <View style={{ width: 24 }} />
        </View>

        <CameraView
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.cameraButton} 
              onPress={toggleCameraType}
            >
              <Camera size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            />

            <TouchableOpacity 
              style={styles.cameraButton} 
              onPress={pickImage}
            >
              <Upload size={24} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {image ? (
          <View style={styles.mediaContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={deletePhoto}
            >
              <Trash2 size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadContainer}>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => setShowCamera(true)}
            >
              <Camera size={32} color={theme.colors.text.primary} />
              <Text style={styles.uploadText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={pickImage}
            >
              <Upload size={32} color={theme.colors.text.primary} />
              <Text style={styles.uploadText}>Upload from Device</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.formContainer}>
          <View style={styles.captionContainer}>
            <TextInput
              style={styles.captionInput}
              placeholder="Write a caption..."
              placeholderTextColor={theme.colors.text.secondary}
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Tag People</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Add Location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Add Music</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.mediaTypeSelector}>
            <Text style={styles.mediaTypeTitle}>Post to</Text>
            
            <View style={styles.mediaTypeButtons}>
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  selectedType === 'photo' && styles.selectedTypeButton
                ]}
                onPress={() => setSelectedType('photo')}
              >
                <ImageIcon 
                  size={20} 
                  color={selectedType === 'photo' ? theme.colors.brand.primary : theme.colors.text.primary} 
                />
                <Text 
                  style={[
                    styles.typeButtonText,
                    selectedType === 'photo' && styles.selectedTypeText
                  ]}
                >
                  Feed
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeButton,
                  selectedType === 'video' && styles.selectedTypeButton
                ]}
                onPress={() => setSelectedType('video')}
              >
                <Video 
                  size={20} 
                  color={selectedType === 'video' ? theme.colors.brand.primary : theme.colors.text.primary} 
                />
                <Text 
                  style={[
                    styles.typeButtonText,
                    selectedType === 'video' && styles.selectedTypeText
                  ]}
                >
                  Reels
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.text.primary,
  },
  shareButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  shareText: {
    color: theme.colors.brand.primary,
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadContainer: {
    width: '100%',
    aspectRatio: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  uploadButton: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  uploadText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    fontFamily: theme.fontFamily.semiBold,
  },
  formContainer: {
    padding: theme.spacing.md,
  },
  captionContainer: {
    marginBottom: theme.spacing.md,
  },
  captionInput: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  optionButton: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  mediaTypeSelector: {
    marginBottom: theme.spacing.md,
  },
  mediaTypeTitle: {
    fontSize: theme.fontSize.md,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  mediaTypeButtons: {
    flexDirection: 'row',
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.xl,
    paddingVertical: theme.spacing.xs,
  },
  selectedTypeButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.brand.primary,
  },
  typeButtonText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.xs,
  },
  selectedTypeText: {
    color: theme.colors.brand.primary,
    fontFamily: theme.fontFamily.semiBold,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 25 : 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.3)',
  },
});