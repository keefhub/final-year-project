import React, { useState } from "react";
import { SafeAreaView } from "react-native";

//styling
import styles from "./styles";
import {
  Input,
  InputField,
  Box,
  Button,
  ButtonText,
  VStack,
  ButtonGroup,
} from "@gluestack-ui/themed";

//firebase import
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const auth = FIREBASE_AUTH;

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  const handleForgotPassword = async () => {
    if (email !== confirmEmail) {
      alert("Emails do not match!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.resetContainer}>
        <Box style={styles.input}>
          <Input>
            <InputField
              type="text"
              placeholder="Enter your Email.."
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </Input>
        </Box>
        <Box style={styles.input}>
          <Input>
            <InputField
              type="text"
              placeholder="Confirm Email.."
              autoCapitalize="none"
              onChangeText={setConfirmEmail}
            />
          </Input>
        </Box>
        <Box style={styles.pressableContainer}>
          <ButtonGroup>
            <VStack space="xs">
              <Button size={"lg"} onPress={handleForgotPassword}>
                <ButtonText>Reset Password</ButtonText>
              </Button>
              <Button onPress={navigateLogin} variant={"link"} size={"lg"}>
                <ButtonText>Return to Login</ButtonText>
              </Button>
            </VStack>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
