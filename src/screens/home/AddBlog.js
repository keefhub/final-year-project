import React from "react";
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

//styling
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

//importing components
import ImageUpload from "./blogComponent/ImageUpload";

const AddBlog = () => {
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
                    <InputField placeholder="Title" />
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
                  />
                  <ImageUpload />
                  <Button>
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
