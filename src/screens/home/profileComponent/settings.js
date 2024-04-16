import React, { useState } from "react";
import { View, Alert, Text, TextInput } from "react-native";

// stylesheet
import styles from "../styles";
import profileStyles from "./profileStyles";
import {
  GluestackUIProvider,
  Button,
  ButtonText,
  HStack,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// firebase
import { FIREBASE_AUTH, FIRESTORE } from "../../../../FirebaseConfig";
import {
  signOut,
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Settings = ({ navigation }) => {
  const AUTH = FIREBASE_AUTH;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const userCollectionRef = collection(FIRESTORE, "users");
  const userPostCollection = collection(FIRESTORE, "posts");

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userUID = user ? user.email : null;

    try {
      //auth user with their password
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      // Delete the user's posts from the "posts" collection
      const userPostsQuery = query(
        userPostCollection,
        where("author.name", "==", userUID)
      );
      const userPostsSnapshot = await getDocs(userPostsQuery);
      userPostsSnapshot.forEach(async (postDoc) => {
        await deleteDoc(doc(userPostCollection, postDoc.id));
      });

      // Delete the user's document from the "users" collection
      const userQuery = query(userCollectionRef, where("uid", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);
      userSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      //deleting user account
      await deleteUser(user);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };

  const handleSignOut = async () => {
    // Show confirmation dialog
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setLoading(true);
            try {
              await signOut(AUTH);
              navigation.navigate("Login");
            } catch (error) {
              console.error(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <GluestackUIProvider config={config}>
      <View style={styles.containerHeader}>
        <View style={profileStyles.card}>
          <HStack space="sm" style={profileStyles.cardContent}>
            <MaterialIcons name="account-circle" size={24} color="black" />
            <Text style={profileStyles.header}>Your Account</Text>
          </HStack>
        </View>
        <View style={profileStyles.card}>
          <Text style={profileStyles.header}>Login</Text>
          <View>
            <Button
              size="md"
              variant="link"
              action="primary"
              onPress={handleSignOut}
              disabled={loading}
            >
              <ButtonText>{loading ? "Signing Out..." : "Sign Out"}</ButtonText>
            </Button>
          </View>
          <View>
            <Button
              size="md"
              variant="link"
              action="negative"
              onPress={() => setShowModal(true)}
            >
              <ButtonText>Delete Account</ButtonText>
            </Button>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false);
              }}
            >
              <ModalBackdrop />
              <ModalContent>
                <ModalHeader>
                  <Heading size="lg">Delete Account</Heading>
                  <ModalCloseButton>
                    <AntDesign name="close" size={24} color="black" />
                  </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                  <Text>
                    Please enter your password to confirm account deletion. Do
                    note that once you delete your account, all your data will
                    be lost.
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 10,
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button
                    size="sm"
                    action="negative"
                    onPress={() => {
                      handleDeleteAccount();
                    }}
                  >
                    <ButtonText>Delete</ButtonText>
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </View>
        </View>
      </View>
    </GluestackUIProvider>
  );
};

export default Settings;
