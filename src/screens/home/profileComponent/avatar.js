import React from "react";
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

const AvatarComponent = () => {
  return (
    <Box style={profileStyles.avatar}>
      <HStack space="md">
        <Avatar bgColor="$amber600">
          <AntDesign name="user" size={24} color="white" />
        </Avatar>
        <VStack>
          <Heading size="sm">Keith</Heading>
          <Text size="sm">Traveller</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AvatarComponent;
