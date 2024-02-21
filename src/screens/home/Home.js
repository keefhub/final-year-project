import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import ContinentCard from "./homeComponents/continentCard";
import SeasonalCard from "./homeComponents/seasonalCard";
import BlogComponent from "./homeComponents/blogComponent";
import BlogCard from "./homeComponents/blogCard";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import styles from "./styles";

//firebase import
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Home = ({ navigation }) => {
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
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>
              {currentUser ? `Welcome, ${currentUser.email}` : "Home"}
            </Text>
            <ContinentCard />
            <SeasonalCard />

            <BlogCard navigation={navigation} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Home;
