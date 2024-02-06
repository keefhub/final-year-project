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

const Login = ({ navigation }) => {
  onRegister = () => {
    navigation.navigate("Register");
  };

  onForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //auth done locally, not yet done on server side
  onClickLogin = () => {
    if (username === "" || password === "") {
      navigation.navigate("Home");
    } else {
      if (username === null || password === null) {
        alert("Please do not leave required fields empty");
      } else {
        alert("Please enter the correct credentials");
      }
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <Image source={images.Logo} style={styles.logo} />
          <View style={styles.textInputContainer}>
            <VStack space="md">
              <Box style={styles.input}>
                <Input
                  size={"lg"}
                  variant={"outline"}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    required
                  />
                </Input>
              </Box>
              <Box style={styles.input}>
                <Input
                  size={"lg"}
                  variant={"outline"}
                  isInvalid={false}
                  isDisabled={false}
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
              <VStack space="md">
                <Button
                  onPress={onClickLogin}
                  size={"lg"}
                  variant={"solid"}
                  isInvalid={false}
                  isDisabled={false}
                  style={styles.button}
                >
                  <ButtonText>Login</ButtonText>
                </Button>
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
