import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, Text } from "react-native";
import BlogCard from "./homeComponents/blogCard";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import styles from "./styles";

// Firebase imports
import { FIREBASE_AUTH, FIRESTORE } from "../../../FirebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Home = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState(null); // State to hold the username
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

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>
              {currentUser
                ? `Welcome, ${username || currentUser.email}!`
                : "Home"}
            </Text>
            <BlogCard navigation={navigation} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

export default Home;
