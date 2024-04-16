import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook
import homeStyles from "./homeStyles";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../../../../FirebaseConfig";

const BlogComponent = () => {
  const db = FIRESTORE;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const route = useRoute(); // useRoute hook to access route parameters
  const scrollViewRef = useRef(null); // Reference for ScrollView
  const [currentIndex, setCurrentIndex] = useState(0); // Current index of image

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

  // Function to scroll to specified image index
  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * Dimensions.get("window").width,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.containerHeader}>
      <ScrollView style={styles.blogContainer}>
        {selectedPost && (
          <View key={selectedPost.id}>
            {selectedPost.title && (
              <Text style={homeStyles.header}>{selectedPost.title}</Text>
            )}
            {selectedPost.image && selectedPost.image.length > 0 ? (
              <View style={homeStyles.imageContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={homeStyles.scrollView}
                  onScroll={(event) => {
                    const { x } = event.nativeEvent.contentOffset;
                    setCurrentIndex(
                      Math.round(x / Dimensions.get("window").width)
                    );
                  }}
                  scrollEventThrottle={16} // Adjust scroll event frequency
                >
                  {selectedPost.image.map((imageUrl, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={homeStyles.image}
                    />
                  ))}
                </ScrollView>
                <View style={homeStyles.paginationContainer}>
                  <Text style={homeStyles.paginationText}>
                    {currentIndex + 1}/{selectedPost.image.length}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={homeStyles.noImageContainer}>
                <Ionicons name="image-outline" size={80} color="black" />
                <Text style={homeStyles.noImage}>No image available</Text>
              </View>
            )}

            <View style={homeStyles.captionContainer}>
              {selectedPost.caption && (
                <Text style={homeStyles.caption}>{selectedPost.caption}</Text>
              )}
            </View>

            <View style={homeStyles.authorContainer}>
              {selectedPost.author && (
                <Text style={homeStyles.authorTitle}>
                  By: {selectedPost.author.name || "Unknown Author"}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogComponent;
