import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import styles from "./styles";
import AvatarComponent from "./profileComponent/avatar";
import TravelLog from "./profileComponent/travelLog";

const Profile = ({ navigation }) => {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box style={{ flex: 1, ...styles.container }}>
          <AvatarComponent />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "black",
              marginTop: 25,
              marginBottom: 10,
            }}
          />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TravelLog navigation={navigation} />
          </ScrollView>
        </Box>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Profile;
