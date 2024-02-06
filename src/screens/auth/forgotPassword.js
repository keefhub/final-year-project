import React, { useState } from "react";
import { SafeAreaView } from "react-native";

//styling
import styles from "./styles";
import { Input, InputField, Box } from "@gluestack-ui/themed";

//firebase import
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = FIREBASE_AUTH;

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box style={styles.container}>
      <Input>
        <InputField type="text" />
      </Input>
    </Box>
  );
};

export default ForgotPassword;
