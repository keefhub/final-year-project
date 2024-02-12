import React, { useState } from "react";
import { ScrollView, Image, Alert } from "react-native";
import {
  Text,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  HStack,
  VStack,
  Heading,
  Pressable,
  Center,
} from "@gluestack-ui/themed";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import blogStyles from "./blogStyles";
import images from "../../../constants/images";

const ImageUpload = ({ onImageSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);

  const saveImage = async (image) => {
    try {
      setImagesArray([...imagesArray, image]);
      onImageSelect([...imagesArray, image]);
      setShowModal(false);
    } catch (error) {
      throw error;
    }
  };

  const openCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image:" + error.message);
      setShowModal(false);
    }
  };

  const openGallery = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error uploading image:" + error.message);
      setShowModal(false);
    }
  };

  const removeImage = async (index) => {
    try {
      const updatedImages = [...imagesArray];
      updatedImages.splice(index, 1);
      setImagesArray(updatedImages);
      setShowModal(false);
    } catch (error) {
      Alert.alert("Error removing image:" + error.message);
      setShowModal(false);
    }
  };

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imagesArray.map((img, index) => (
          <Pressable
            key={index}
            onPress={() => {
              // Display a confirmation alert
              Alert.alert(
                "Confirm Delete",
                "Are you sure you want to delete this image?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      // User confirmed, remove the image
                      removeImage(index);
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Image
              source={img ? { uri: img } : images.Placeholder}
              style={{ width: 200, height: 200, marginRight: 10 }}
              alt={`image_${index}`}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Button onPress={() => setShowModal(true)} variant="link">
        <ButtonText>Upload Image</ButtonText>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent style={{ paddingBottom: 20 }}>
          <VStack space="xs">
            <Center>
              <Heading style={blogStyles.modalTitle}>
                Choose an Image...
              </Heading>
              <HStack space="4xl">
                <VStack space="xs">
                  <Pressable onPress={() => openCamera()}>
                    <FontAwesome5 name="camera" size={70} color="grey" />
                  </Pressable>
                  <Center>
                    <Text>Camera</Text>
                  </Center>
                </VStack>
                <VStack space="xs">
                  <Pressable onPress={() => openGallery()}>
                    <FontAwesome5 name="image" size={70} color="grey" />
                  </Pressable>
                  <Center>
                    <Text>Gallery</Text>
                  </Center>
                </VStack>
                <VStack space="xs">
                  <Pressable
                    onPress={() => removeImage(imagesArray.length - 1)}
                  >
                    <MaterialIcons name="cancel" size={70} color="red" />
                  </Pressable>
                  <Center>
                    <Text>Remove</Text>
                  </Center>
                </VStack>
              </HStack>
            </Center>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageUpload;
