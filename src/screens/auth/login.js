import React, { useState } from "react";
import { View, SafeAreaView, Image } from "react-native";
import images from "../../constants/images";
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

import styles from "./styles";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  onRegister = () => {
    navigation.navigate("Register");
  };

  onForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  //actual server-side login
  const onClickLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      // Successfully signed in
      const user = userCredential.user;
      //console.log(user);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      // Handle authentication error
      setLoading(false);
      alert(
        "Authentication failed. Please check your credentials and try again."
      );
    }
  };

  /*const onClickLogin = () => {
    if (username === "" && password === "") {
      navigation.navigate("Home");
    }
  };*/

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image source={images.Logo} style={styles.logo} />
          <View style={styles.textInputContainer}>
            <VStack space="xs">
              <Box style={styles.input}>
                <Input variant={"outline"} isInvalid={false} isDisabled={false}>
                  <InputField
                    placeholder="Email"
                    value={username}
                    onChangeText={setUsername}
                    required
                    autoCapitalize="none"
                  />
                </Input>
              </Box>
              <Box style={styles.input}>
                <Input variant={"outline"} isInvalid={false} isDisabled={false}>
                  <InputField
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    required
                    autoCapitalize="none"
                  />
                </Input>
              </Box>
            </VStack>
          </View>

          <View style={styles.pressableContainer}>
            <ButtonGroup>
              <VStack space="xs">
                <Button
                  onPress={onClickLogin}
                  size={"lg"}
                  variant={"solid"}
                  isInvalid={false}
                  isDisabled={loading} // Disable the button when loading is true
                  style={styles.button}
                >
                  <ButtonText>{loading ? "Logging in..." : "Login"}</ButtonText>
                </Button>

                <Box style={(marginTop = 100)}>
                  <Button
                    onPress={onRegister}
                    size={"lg"}
                    variant={"outline"}
                    isInvalid={false}
                    isDisabled={false}
                    style={styles.button}
                  >
                    <ButtonText>Register</ButtonText>
                  </Button>
                </Box>

                <Button
                  onPress={onForgotPassword}
                  size={"lg"}
                  variant={"link"}
                  isInvalid={false}
                  isDisabled={false}
                  style={styles.button}
                >
                  <ButtonText>Forgot your Password?</ButtonText>
                </Button>
              </VStack>
            </ButtonGroup>
          </View>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Login;
