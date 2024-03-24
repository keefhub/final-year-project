import React, { useState, useEffect } from "react";
import profileStyles from "./profileStyles";
import {
  Box,
  HStack,
  VStack,
  Avatar,
  Heading,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

//firebase import
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const AvatarComponent = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleSignOut = async () => {
    setLoading(true);
    const auth = FIREBASE_AUTH;
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={profileStyles.avatar}>
      <HStack space="md">
        <Avatar bgColor="$amber600">
          <AntDesign name="user" size={24} color="white" />
        </Avatar>
        <VStack>
          <Heading size="sm">
            {currentUser ? currentUser.email : "Guest"}
          </Heading>
          <Text size="sm">Traveller</Text>
        </VStack>
        <Button
          size="xs"
          variant="link"
          action="primary"
          onPress={handleSignOut}
          disabled={loading}
        >
          <ButtonText>{loading ? "Signing Out..." : "Sign Out"}</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default AvatarComponent;
