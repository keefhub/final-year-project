import React, { useState } from "react";
import { TextInput } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import {
  GluestackUIProvider,
  FormControl,
  VStack,
  Heading,
  Input,
  InputField,
  Button,
  ButtonText,
  Box,
  set,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import "react-native-get-random-values";

// Importing components
import ImageUpload from "./blogComponent/ImageUpload";
import { v4 as uuidv4 } from "uuid";

//firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  FIRESTORE,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
} from "../../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddBlog = ({ navigation }) => {
  //initialize db
  const storage = FIREBASE_STORAGE;
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE;
  const postCollection = collection(db, "posts");

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const titleInput = (text) => {
    setTitle(text);
  };

  const captionInput = (text) => {
    setCaption(text);
  };

  const handleSelectedImage = (images) => {
    setSelectedImages(images);
  };

  const uploadImage = async (imageUri, imageName) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${imageName}`); // Use ref with storage instance
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.log("Error uploading image:", error);
      throw error;
    }
  };

  const handlePostButtonPress = async () => {
    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async (imageUri) => {
          const imageName = `image_${uuidv4()}`;
          return await uploadImage(imageUri, imageName);
        })
      );

      await uploadContent(imageUrls);
      setTitle("");
      setCaption("");
      setSelectedImages([]);
      navigation.dispatch(CommonActions.navigate("Login"));
      console.log("Blog post created successfully");
    } catch (error) {
      console.error("Error creating blog post:", error);
      // Add user-friendly error handling here (e.g., display an error message)
    }
  };

  const uploadContent = async (imageUrls) => {
    try {
      await addDoc(postCollection, {
        title,
        caption,
        image: imageUrls,
        author: { name: auth.currentUser.email },
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error uploading content:", error);
      throw error;
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <Box style={styles.container}>
          <ScrollView>
            <FormControl>
              <Box style={styles.heading}>
                <Heading size="lg">Add Blog</Heading>
              </Box>
              <Box style={styles.blogContainer}>
                <VStack space="xs">
                  <Input>
                    <InputField
                      placeholder="Title"
                      value={title}
                      onChangeText={(text) => {
                        titleInput(text);
                      }}
                    />
                  </Input>
                  <TextInput
                    style={{
                      height: 150,
                      borderColor: "#D3D3D3",
                      borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      textAlignVertical: "top",
                    }}
                    multiline
                    placeholder="Input Caption Here.."
                    value={caption}
                    onChangeText={(text) => {
                      captionInput(text);
                    }}
                  />
                  <ImageUpload onImageSelect={handleSelectedImage} />
                  <Button onPress={handlePostButtonPress}>
                    <ButtonText>Post</ButtonText>
                    <AntDesign
                      name="upload"
                      size={20}
                      color="white"
                      style={{ marginLeft: 15 }}
                    />
                  </Button>
                </VStack>
              </Box>
            </FormControl>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default AddBlog;
