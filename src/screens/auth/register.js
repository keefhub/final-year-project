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

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  //const [passwordError, setPasswordError] = useState("");

  const resetOnClick = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  const emailValidator = ({ email }) => {
    regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      setEmailError("error email");
      alert("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  /*const passwordValidator = ({ password }) => {
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError("error password");
      alert("Please enter a valid password!");
    } else {
      setPasswordError("");
    }
  };*/

  //frontend rendering condition, not yet gone to server side
  const onClickRegister = () => {
    if (email === "" || username === "" || password === "") {
      alert("Please do not leave required fields empty");
    } else {
      alert("Registration successful!");
      navigation.navigate("Home");
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.resetContainer}>
            <VStack space="md">
              <Box style={styles.input}>
                <Input
                  size={"lg"}
                  variant={"outline"}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    required
                  />
                </Input>
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
                >
                  <ButtonText>Register</ButtonText>
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