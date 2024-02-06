import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import styles from "./styles";
import Tabs from "./profileComponent/tab";
import AvatarComponent from "./profileComponent/avatar";

const Profile = () => {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box style={{ flex: 1, ...styles.container, paddingTop: 10 }}>
          <AvatarComponent />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ paddingTop: 20 }}
          >
            <Tabs />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Profile;
