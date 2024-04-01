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
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE } from "../../../../FirebaseConfig";

const AvatarComponent = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState(null);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          // Query the users collection for a document with the matching UID field
          const userQuery = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const userQuerySnapshot = await getDocs(userQuery);

          if (!userQuerySnapshot.empty) {
            // There should be only one document matching the query
            const userData = userQuerySnapshot.docs[0].data();
            setUsername(userData.username);
          } else {
            setUsername(null);
            console.log("User document not found for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUsername(null); // Clear the username state if an error occurs
        }
      } else {
        setCurrentUser(null);
        setUsername(null); // Clear the username state when no user is logged in
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
          <HStack>
            <Heading size="sm">
              {currentUser ? `${username || currentUser.email}` : "Home"}
            </Heading>
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
          <Text size="sm">Traveller</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AvatarComponent;
