import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import ContinentCard from "./homeComponents/continentCard";
import SeasonalCard from "./homeComponents/seasonalCard";
import BlogComponent from "./homeComponents/blogComponent";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import styles from "./styles";

const Home = () => {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ContinentCard />
            <SeasonalCard />
            <BlogComponent />
          </ScrollView>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Home;
