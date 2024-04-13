import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import styles from "./styles";
import {
  GluestackUIProvider,
  Box,
  Input,
  InputField,
  VStack,
  Button,
  ButtonText,
  ButtonGroup,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import { FIREBASE_AUTH, FIRESTORE } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [emailError, setEmailError] = useState("");
  //const [passwordError, setPasswordError] = useState("");

  const resetOnClick = () => {
    setEmail("");
    setConfirmEmail("");
    setUsername("");
    setPassword("");
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  /*const emailValidator = ({ email }) => {
    regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      setEmailError("error email");
      alert("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

    const passwordValidator = ({ password }) => {
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError("error password");
      alert("Please enter a valid password!");
    } else {
      setPasswordError("");
    }
  };*/

  const checkEmailMatch = () => {
    if (email !== confirmEmail) {
      alert("Email and Confirm Email must match!");
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE;
  const postCollection = collection(db, "users");

  //auth done locally, not yet done on server side
  const onClickRegister = async () => {
    if (!checkEmailMatch()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Successfully signed up
      const user = userCredential.user;

      // Save the username to Firestore
      await addDoc(postCollection, {
        uid: user.uid,
        email: email,
        username: username,
      });

      setLoading(false);
      navigation.navigate("Home");
      setEmail("");
      setConfirmEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      // Handle authentication error
      console.log(error);
      setLoading(false);
      alert(
        "Registration failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.resetContainer}>
            <VStack space="xs">
              <Box style={styles.input}>
                <Input size={"lg"} variant={"outline"} isInvalid={false}>
                  <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    required
                    autoCapitalize="none"
                  />
                </Input>
              </Box>
              <Box style={styles.input}>
                <Input size={"lg"} variant={"outline"} isInvalid={false}>
                  <InputField
                    placeholder="Confirm Email"
                    value={confirmEmail}
                    onChangeText={setConfirmEmail}
                    required
                    autoCapitalize="none"
                  />
                </Input>
              </Box>
              <Box style={styles.input}>
                <Input size={"lg"} variant={"outline"} isInvalid={false}>
                  <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    required
                    autoCapitalize="none"
                  />
                </Input>
              </Box>
              <Box style={styles.input}>
                <Input
                  size={"lg"}
                  variant={"outline"}
                  isInvalid={false}
                  isDisabled={loading}
                >
                  <InputField
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    required
                  />
                </Input>
              </Box>
            </VStack>
          </View>
          <View style={styles.pressableContainer}>
            <ButtonGroup>
              <VStack space="sm">
                <Button
                  onPress={onClickRegister}
                  size={"lg"}
                  variant={"solid"}
                  colorScheme={"primary"}
                  isDisabled={loading}
                >
                  <ButtonText>
                    {loading ? "Registering..." : "Register"}
                  </ButtonText>
                </Button>
                <Button onPress={resetOnClick} size={"lg"} variant={"outline"}>
                  <ButtonText>Reset</ButtonText>
                </Button>
                <Button onPress={navigateLogin} size={"lg"} variant={"link"}>
                  <ButtonText>Already have an account? Log in!</ButtonText>
                </Button>
              </VStack>
            </ButtonGroup>
          </View>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Register;
