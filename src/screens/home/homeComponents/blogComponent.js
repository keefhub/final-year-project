import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import styles from "../styles";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

//styling
import {
  Input,
  InputSlot,
  InputIcon,
  InputField,
  SearchIcon,
} from "@gluestack-ui/themed";

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
    <SafeAreaView>
      <View style={styles.blogContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Blog</Text>
        </View>
        <View style={styles.searchContainer}>
          {selectedPost && (
            <View key={selectedPost.id}>
              {selectedPost.author && (
                <Text>@{selectedPost.author.name || "Unknown Author"}</Text>
              )}
              {selectedPost.title && <Text>{selectedPost.title}</Text>}
              {selectedPost.caption && <Text>{selectedPost.caption}</Text>}
              {selectedPost.image && selectedPost.image.length > 0 && (
                <View>
                  {selectedPost.image.map((imageUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={styles.image}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlogComponent;
