import React, { useState, useEffect } from "react";
import profileStyles from "./profileStyles";
import {
  Box,
  HStack,
  VStack,
  Avatar,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";

//firebase import
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../FirebaseConfig";

const AvatarComponent = () => {
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
      </HStack>
    </Box>
  );
};

export default AvatarComponent;
