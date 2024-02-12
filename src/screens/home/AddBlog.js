import React, { useState } from "react";
import { TextInput } from "react-native";
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
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

// Importing components
import ImageUpload from "./blogComponent/ImageUpload";

const AddBlog = () => {
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

  const uploadContent = () => {
    console.log("Title:", title);
    console.log("Caption:", caption);
    console.log("Selected Images:", selectedImages);
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
                  <Button
                    onPress={() => {
                      uploadContent();
                    }}
                  >
                    <ButtonText>upload</ButtonText>
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
