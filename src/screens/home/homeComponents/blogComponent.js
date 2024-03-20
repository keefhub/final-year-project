import React, { useState, useEffect } from "react";
import { ScrollView, View, SafeAreaView, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import styles from "../styles";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

const BlogComponent = () => {
  const db = FIRESTORE;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const route = useRoute(); // useRoute hook to access route parameters

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };

    getPost();
  }, []);

  // Retrieve the selected post from route parameters
  const selectedPost = route.params?.post || null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.blogContainer}>
        {selectedPost && (
          <View key={selectedPost.id}>
            {selectedPost.title && (
              <Text style={styles.header}>{selectedPost.title}</Text>
            )}
            {selectedPost.caption && <Text>{selectedPost.caption}</Text>}
            {selectedPost.image && selectedPost.image.length > 0 && (
              <View style={styles.imageContainer}>
                {selectedPost.image.map((imageUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={styles.image}
                  />
                ))}
              </View>
            )}
            {selectedPost.author && (
              <Text>
                Written By: {selectedPost.author.name || "Unknown Author"}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogComponent;
