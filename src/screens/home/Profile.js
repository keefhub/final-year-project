import React, { useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GluestackUIProvider,
  Box,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import styles from "./styles";
import Tabs from "./profileComponent/tab";
import AvatarComponent from "./profileComponent/avatar";

import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box style={{ flex: 1, ...styles.container }}>
          <AvatarComponent />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ paddingTop: 20 }}
          >
            <Tabs />
          </ScrollView>

          <Button
            size="md"
            action="negative"
            onPress={handleSignOut}
            disabled={loading}
          >
            <ButtonText>{loading ? "Signing Out..." : "Sign Out"}</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Profile;
