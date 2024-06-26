import React, { useState } from "react";
import { TextInput, Text } from "react-native";
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

const AddBlog = ({ navigation, clearFields }) => {
  //initialize db
  const storage = FIREBASE_STORAGE;
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE;
  const postCollection = collection(db, "posts");

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [posting, setPosting] = useState(false);

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
    setPosting(true);
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
      setPosting(false);
      //reset navigation to home screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );

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
        <Box style={styles.containerHeader}>
          <ScrollView>
            <FormControl>
              <Box style={styles.heading}>
                <Heading size="lg">Add your wonderful stories!</Heading>
              </Box>
              <Box style={styles.blogContainer}>
                <VStack space="xs">
                  <Input>
                    <InputField
                      placeholder="Title"
                      value={title}
                      onChangeText={(text) => {
                        if (text.length <= 25) {
                          titleInput(text);
                        }
                      }}
                    />
                  </Input>
                  <Text style={{ textAlign: "right" }}>{title.length}/25</Text>
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
                      if (text.length <= 200) {
                        captionInput(text);
                      }
                    }}
                  />
                  <Text style={{ textAlign: "right" }}>
                    {caption.length}/200
                  </Text>
                  <ImageUpload onImageSelect={handleSelectedImage} />
                  <Button onPress={handlePostButtonPress}>
                    <ButtonText>{posting ? "Posting..." : "Post"}</ButtonText>
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
